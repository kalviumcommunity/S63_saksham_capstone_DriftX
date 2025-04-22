import express from 'express';
import Order from '../models/OrderSchema.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

import User from '../models/UserSchema.js';
import Product from '../models/Productschema.js';


const router = express.Router();

// ✅ GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// ✅ GET order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// ✅ POST create new order
router.post('/', async (req, res) => {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus = 'Pending',
      orderStatus = 'Processing',
      totalAmount,
    } = req.body;

    if (!user || !orderItems || !shippingAddress || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    const populatedOrder = await savedOrder
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// ✅ PUT update order by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus,
      totalAmount,
    } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update fields if provided
    if (user) order.user = user;
    if (orderItems) order.orderItems = orderItems;
    if (shippingAddress) order.shippingAddress = shippingAddress;
    if (paymentMethod) order.paymentMethod = paymentMethod;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (orderStatus) order.orderStatus = orderStatus;
    if (totalAmount !== undefined) order.totalAmount = totalAmount;

    const updatedOrder = await order.save();

    const populatedOrder = await updatedOrder
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    res.json(populatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order' });
  }
});

export default router; // ✅ IMPORTANT
