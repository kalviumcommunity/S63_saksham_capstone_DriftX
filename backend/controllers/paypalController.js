import fetch from 'node-fetch';
import Order from '../models/OrderSchema.js';
import winston from 'winston';

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getAccessToken() {
  try {
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    if (!data.access_token) {
      throw new Error('Failed to get PayPal access token');
    }
    return data.access_token;
  } catch (error) {
    logger.error('Error getting PayPal access token:', error);
    throw error;
  }
}

// Verify PayPal webhook signature
async function verifyWebhookSignature(req) {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        auth_algo: req.headers['paypal-auth-algo'],
        cert_url: req.headers['paypal-cert-url'],
        transmission_id: req.headers['paypal-transmission-id'],
        transmission_sig: req.headers['paypal-transmission-sig'],
        transmission_time: req.headers['paypal-transmission-time'],
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: req.body
      })
    });
    const data = await response.json();
    return data.verification_status === 'SUCCESS';
  } catch (error) {
    logger.error('Error verifying webhook signature:', error);
    return false;
  }
}

// Create PayPal order and return approval URL
export const createPaypalOrder = async (req, res) => {
  try {
    const { amount, orderItems, shippingAddress } = req.body;
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Not authenticated' });
    
    logger.info('Creating PayPal order', { userId: user._id, amount });
    
    const accessToken = await getAccessToken();
    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
        application_context: {
          return_url: 'http://localhost:3000/order-success',
          cancel_url: 'http://localhost:3000/checkout',
        },
      }),
    });
    const orderData = await orderRes.json();
    
    if (!orderData.id) {
      throw new Error('Failed to create PayPal order');
    }
    
    const approvalUrl = orderData.links.find(link => link.rel === 'approve')?.href;
    
    // Save order in DB as pending
    const order = await Order.create({
      user: user._id,
      orderItems,
      shippingAddress,
      paymentMethod: 'PayPal',
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      totalAmount: amount,
      paypalOrderId: orderData.id
    });
    
    logger.info('Order created successfully', { orderId: order._id, paypalOrderId: orderData.id });
    
    if (approvalUrl) {
      res.json({ approvalUrl });
    } else {
      throw new Error('Could not get PayPal approval URL');
    }
  } catch (err) {
    logger.error('Error creating PayPal order:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Handle PayPal webhook events
export const handleWebhook = async (req, res) => {
  try {
    // Verify webhook signature
    const isValid = await verifyWebhookSignature(req);
    if (!isValid) {
      logger.warn('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = req.body;
    logger.info('Received PayPal webhook event:', { eventType: event.event_type });

    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCaptureCompleted(event);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePaymentCaptureDenied(event);
        break;
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePaymentRefunded(event);
        break;
      default:
        logger.info('Unhandled webhook event type:', event.event_type);
    }

    res.json({ received: true });
  } catch (err) {
    logger.error('Error handling webhook:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// Handle successful payment capture
async function handlePaymentCaptureCompleted(event) {
  const { id: captureId, custom_id: orderId } = event.resource;
  try {
    const order = await Order.findOneAndUpdate(
      { paypalOrderId: orderId },
      { 
        paymentStatus: 'Paid',
        orderStatus: 'Shipped',
        paymentDetails: {
          captureId,
          captureTime: event.resource.create_time
        }
      },
      { new: true }
    );
    
    if (!order) {
      throw new Error(`Order not found for PayPal order ID: ${orderId}`);
    }
    
    logger.info('Order payment completed', { orderId: order._id, captureId });
  } catch (error) {
    logger.error('Error handling payment capture:', error);
    throw error;
  }
}

// Handle denied payment
async function handlePaymentCaptureDenied(event) {
  const { id: captureId, custom_id: orderId } = event.resource;
  try {
    const order = await Order.findOneAndUpdate(
      { paypalOrderId: orderId },
      { 
        paymentStatus: 'Failed',
        orderStatus: 'Cancelled',
        paymentDetails: {
          captureId,
          failureReason: event.resource.status_details?.reason
        }
      },
      { new: true }
    );
    
    if (!order) {
      throw new Error(`Order not found for PayPal order ID: ${orderId}`);
    }
    
    logger.info('Order payment denied', { orderId: order._id, captureId });
  } catch (error) {
    logger.error('Error handling payment denial:', error);
    throw error;
  }
}

// Handle refund
async function handlePaymentRefunded(event) {
  const { id: captureId, custom_id: orderId } = event.resource;
  try {
    const order = await Order.findOneAndUpdate(
      { paypalOrderId: orderId },
      { 
        paymentStatus: 'Refunded',
        orderStatus: 'Cancelled',
        paymentDetails: {
          captureId,
          refundTime: event.resource.create_time
        }
      },
      { new: true }
    );
    
    if (!order) {
      throw new Error(`Order not found for PayPal order ID: ${orderId}`);
    }
    
    logger.info('Order refunded', { orderId: order._id, captureId });
  } catch (error) {
    logger.error('Error handling refund:', error);
    throw error;
  }
}

// Capture PayPal order and update order status
export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Not authenticated' });
    
    logger.info('Capturing PayPal order', { orderId, userId: user._id });
    
    const accessToken = await getAccessToken();
    const captureRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const captureData = await captureRes.json();
    
    if (captureData.status === 'COMPLETED') {
      const order = await Order.findOneAndUpdate(
        { paypalOrderId: orderId },
        { 
          paymentStatus: 'Paid',
          orderStatus: 'Shipped',
          paymentDetails: {
            captureId: captureData.id,
            captureTime: captureData.create_time
          }
        },
        { new: true }
      );
      
      if (!order) {
        throw new Error(`Order not found for PayPal order ID: ${orderId}`);
      }
      
      logger.info('Order captured successfully', { orderId: order._id });
      res.json({ success: true, message: 'Order captured and updated' });
    } else {
      throw new Error('Order capture failed: ' + JSON.stringify(captureData));
    }
  } catch (err) {
    logger.error('Error capturing order:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}; 