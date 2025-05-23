import Order from '../models/OrderSchema.js';
import winston from 'winston';
import { io } from '../server.js';

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

// Get user's order history
export const getUserOrders = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      logger.warn('Unauthorized attempt to access orders');
      return res.status(401).json({ error: 'Not authenticated' });
    }

    logger.info('Fetching orders for user', { userId: user._id });

    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('orderItems.product', 'name images');

    logger.info('Successfully fetched orders', { 
      userId: user._id, 
      orderCount: orders.length 
    });

    res.json(orders);
  } catch (error) {
    logger.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get single order details
export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const user = req.user;
    
    if (!user) {
      logger.warn('Unauthorized attempt to access order details');
      return res.status(401).json({ error: 'Not authenticated' });
    }

    logger.info('Fetching order details', { orderId, userId: user._id });

    const order = await Order.findOne({
      _id: orderId,
      user: user._id
    }).populate('orderItems.product', 'name images');

    if (!order) {
      logger.warn('Order not found', { orderId, userId: user._id });
      return res.status(404).json({ error: 'Order not found' });
    }

    logger.info('Successfully fetched order details', { orderId });

    res.json(order);
  } catch (error) {
    logger.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const user = req.user;

    if (!user || !user.isAdmin) {
      logger.warn('Unauthorized attempt to update order status');
      return res.status(401).json({ error: 'Not authorized' });
    }

    logger.info('Updating order status', { orderId, status });

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      logger.warn('Order not found for status update', { orderId });
      return res.status(404).json({ error: 'Order not found' });
    }

    // Emit real-time update to the order room
    io.to(`order_${orderId}`).emit('orderStatusUpdate', {
      orderId,
      status: order.orderStatus,
      paymentStatus: order.paymentStatus,
      updatedAt: order.updatedAt,
    });

    logger.info('Successfully updated order status', { orderId, status });

    res.json(order);
  } catch (error) {
    logger.error('Error updating order status:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}; 