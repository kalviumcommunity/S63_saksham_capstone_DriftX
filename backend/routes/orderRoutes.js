const express = require('express');
const router = express.Router();

// Dummy in-memory order data
const orders = [
  {
    _id: '1',
    user: { name: 'John Doe', email: 'john@example.com' },
    orderItems: [
      {
        product: { name: 'Product A', price: 100 },
        quantity: 2,
        price: 100,
      },
      {
        product: { name: 'Product B', price: 150 },
        quantity: 1,
        price: 150,
      },
    ],
    shippingAddress: {
      address: '123 Main Street',
      city: 'Jaipur',
      state: 'Rajasthan',
      postalCode: '302001',
      country: 'India',
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    totalAmount: 350,
    createdAt: new Date(),
  },
  {
    _id: '2',
    user: { name: 'Jane Smith', email: 'jane@example.com' },
    orderItems: [
      {
        product: { name: 'Product C', price: 200 },
        quantity: 1,
        price: 200,
      },
    ],
    shippingAddress: {
      address: '456 Street Lane',
      city: 'Delhi',
      state: 'Delhi',
      postalCode: '110001',
      country: 'India',
    },
    paymentMethod: 'Stripe',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    totalAmount: 200,
    createdAt: new Date(),
  },
];

//  GET all orders
router.get('/', (req, res) => {
  try {
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

//  GET order by ID
router.get('/:id', (req, res) => {
  try {
    const order = orders.find((order) => order._id === req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

module.exports = router;
