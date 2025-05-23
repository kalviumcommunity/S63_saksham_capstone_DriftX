import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle, FaUndo } from 'react-icons/fa';
import { io as socketIOClient } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Adjust if backend runs elsewhere

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/orders/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setOrders(data);
        // --- SOCKET.IO: Connect and join rooms ---
        if (token && data.length > 0) {
          const sock = socketIOClient(SOCKET_URL, {
            auth: { token }
          });
          setSocket(sock);
          data.forEach(order => {
            sock.emit('joinOrderRoom', order._id);
          });
          sock.on('orderStatusUpdate', (update) => {
            setOrders(prevOrders => prevOrders.map(order =>
              order._id === update.orderId
                ? { ...order, orderStatus: update.status, paymentStatus: update.paymentStatus, updatedAt: update.updatedAt }
                : order
            ));
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
    // Cleanup on unmount
    return () => {
      if (socket) {
        orders.forEach(order => {
          socket.emit('leaveOrderRoom', order._id);
        });
        socket.disconnect();
      }
    };
    // eslint-disable-next-line
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FaBox className="text-blue-500" />;
      case 'Shipped':
        return <FaShippingFast className="text-green-500" />;
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'Refunded':
        return <FaUndo className="text-orange-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-6)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.orderStatus)}
                    <span className="text-sm font-medium text-gray-900">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Order Items</h3>
                      <ul className="space-y-2">
                        {order.orderItems.map((item, index) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Details</h3>
                      <div className="space-y-1 text-sm">
                        <p>Method: {order.paymentMethod}</p>
                        <p>Status: {order.paymentStatus}</p>
                        {order.paymentDetails && (
                          <>
                            <p>Transaction ID: {order.paymentDetails.captureId}</p>
                            <p>Processed: {formatDate(order.paymentDetails.captureTime)}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Shipping Address</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Total Amount</p>
                      <p className="text-lg font-bold text-primary">${order.totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12">
              <FaBox className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new order.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory; 