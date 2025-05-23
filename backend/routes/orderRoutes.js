import express from 'express';
import { getUserOrders, getOrderDetails, updateOrderStatus } from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import User from '../models/UserSchema.js';
import Product from '../models/Productschema.js';


const router = express.Router();

// Dummy data for testing
const dummyOrders = [
  {
    _id: '1',
    user: {
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    orderItems: [
      {
        product: {
          _id: 'product1',
          name: 'Test Product 1',
          price: 99.99
        },
        quantity: 2,
        price: 99.99
      }
    ],
    shippingAddress: {
      address: '123 Test Street',
      city: 'Test City',
      postalCode: '12345',
      country: 'Test Country'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    totalAmount: 199.98
  }
];

// Protected routes
router.get('/my-orders', protect, getUserOrders);
router.get('/:orderId', protect, getOrderDetails);

// Admin routes
router.put('/:orderId/status', protect, isAdmin, updateOrderStatus);

// ✅ GET all orders
router.get('/', async (req, res) => {
  try {
    // For testing, return dummy data
    res.status(200).json(dummyOrders);
    // Uncomment below for actual database query
    // const orders = await Order.find()
    //   .populate('user', 'name email')
    //   .populate('orderItems.product', 'name price');
    // res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// ✅ GET order by ID
router.get('/:id', async (req, res) => {
  try {
    // For testing, return dummy data
    const order = dummyOrders.find(o => o._id === req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
    // Uncomment below for actual database query
    // const order = await Order.findById(req.params.id)
    //   .populate('user', 'name email')
    //   .populate('orderItems.product', 'name price');
    // if (!order) {
    //   return res.status(404).json({ message: 'Order not found' });
    // }
    // res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// ✅ POST create new order
router.post('/', async (req, res) => {
  try {
    // For testing, return dummy data
    const newOrder = {
      ...req.body,
      _id: (dummyOrders.length + 1).toString(),
      createdAt: new Date()
    };
    dummyOrders.push(newOrder);
    res.status(201).json(newOrder);
    // Uncomment below for actual database query
    // const newOrder = new Order({ ...req.body });
    // const savedOrder = await newOrder.save();
    // const populatedOrder = await savedOrder
    //   .populate('user', 'name email')
    //   .populate('orderItems.product', 'name price');
    // res.status(201).json(populatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// ✅ PUT update order by ID
router.put('/:id', async (req, res) => {
  try {
    // For testing, return dummy data
    const index = dummyOrders.findIndex(o => o._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }
    dummyOrders[index] = { ...dummyOrders[index], ...req.body };
    res.json(dummyOrders[index]);
    // Uncomment below for actual database query
    // const order = await Order.findById(req.params.id);
    // if (!order) {
    //   return res.status(404).json({ message: 'Order not found' });
    // }
    // Object.assign(order, req.body);
    // const updatedOrder = await order.save();
    // const populatedOrder = await updatedOrder
    //   .populate('user', 'name email')
    //   .populate('orderItems.product', 'name price');
    // res.json(populatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order' });
  }
});

export default router; // ✅ IMPORTANT
