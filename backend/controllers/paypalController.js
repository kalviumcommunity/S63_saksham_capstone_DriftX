import fetch from 'node-fetch';

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
async function getAccessToken() {
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
}

// Create PayPal order and return approval URL
export const createPaypalOrder = async (req, res) => {
  try {
    const { amount } = req.body;
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
    const approvalUrl = orderData.links.find(link => link.rel === 'approve')?.href;
    if (approvalUrl) {
      res.json({ approvalUrl });
    } else {
      res.status(500).json({ error: 'Could not create PayPal order', details: orderData });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}; 