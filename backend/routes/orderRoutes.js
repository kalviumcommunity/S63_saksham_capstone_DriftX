const express = require('express');
const router = express.Router();

const Order = require('../models/OrderSchema');
const User = require('../models/UserSchema');
const Product = require('../models/Productschema'); // Double-check model name here

// ✅ GET all orders with populated user & product details
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    res.status(200).json(orders);

const { v4: uuidv4 } = require('uuid'); // For generating unique _id

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

// ✅ GET all orders
router.get('/', (req, res) => {
  try {
    res.json(orders);

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

// ✅ POST create new order

router.post('/', async (req, res) => {

router.post('/', (req, res) => {

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

    const newOrder = {
      _id: uuidv4(),

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
      .populate('orderItems.product', 'name price')
      .execPopulate();

    res.status(201).json(populatedOrder);

      createdAt: new Date(),
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// ✅ PUT update order by ID

router.put('/:id', async (req, res) => {
router.put('/:id', (req, res) => {

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
      .populate('orderItems.product', 'name price')
      .execPopulate();

    res.json(populatedOrder);

    const orderIndex = orders.findIndex((order) => order._id === req.params.id);

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update only provided fields
    if (user) orders[orderIndex].user = user;
    if (orderItems) orders[orderIndex].orderItems = orderItems;
    if (shippingAddress) orders[orderIndex].shippingAddress = shippingAddress;
    if (paymentMethod) orders[orderIndex].paymentMethod = paymentMethod;
    if (paymentStatus) orders[orderIndex].paymentStatus = paymentStatus;
    if (orderStatus) orders[orderIndex].orderStatus = orderStatus;
    if (totalAmount !== undefined) orders[orderIndex].totalAmount = totalAmount;

    res.json(orders[orderIndex]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order' });
  }
});

module.exports = router;
