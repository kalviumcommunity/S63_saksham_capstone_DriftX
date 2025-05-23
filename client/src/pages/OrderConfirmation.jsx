import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaMapMarkerAlt, FaCreditCard, 
         FaShoppingBag, FaArrowRight, FaGift, FaHeart, FaArrowUp,
         FaComments, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useSpring as useSpringThree, animated } from '@react-spring/web';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Lottie from 'lottie-react';
import successAnimation from '../assets/animations/success.json';
import deliveryAnimation from '../assets/animations/delivery.json';
import { io as socketIOClient } from 'socket.io-client';

// 3D Box Component
const Box = () => {
  const { nodes, materials } = useGLTF('/package-box.glb');
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.5;
    }
  }, []);

  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4F46E5" metalness={0.5} roughness={0.5} />
    </mesh>
  );
};

const SOCKET_URL = 'http://localhost:5000';

const OrderConfirmation = () => {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress);
  const y = useTransform(scaleProgress, [0, 1], [0, -100]);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);
  
  // Advanced spring animations
  const heroSpring = useSpringThree({
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { mass: 1, tension: 120, friction: 14 }
  });

  // Gradient animation
  const gradientAnimation = useSpringThree({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 5000 },
    loop: true
  });

  // Add state for order status
  const [orderStatus, setOrderStatus] = useState('Processing');
  const orderId = '123456'; // TODO: Replace with dynamic orderId from props, params, or context

  useEffect(() => {
    // Enhanced confetti animation
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'];

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: colors,
        shapes: ['circle', 'square'],
        ticks: 200,
        scalar: randomInRange(0.9, 1.2),
        drift: randomInRange(-0.5, 0.5),
      });

      requestAnimationFrame(frame);
    }());
  }, []);

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = socketIOClient(SOCKET_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });
    // Join the order room
    socket.emit('joinOrderRoom', orderId);
    // Listen for order status updates
    socket.on('orderStatusUpdate', (data) => {
      if (data.orderId === orderId && data.status) {
        setOrderStatus(data.status);
      }
    });
    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth',
      duration: 1000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with 3D animation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, #4F46E5 0%, #EC4899 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <animated.div style={heroSpring} className="relative z-10 text-center">
          <div className="w-32 h-32 mx-auto mb-8">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto px-4"
          >
            Thank you for your purchase. Your order #123456 has been successfully placed.
          </motion.p>
        </animated.div>

        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-20">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars />
            <Box />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </div>
      </motion.section>

      {/* Order Details Section with Glass Morphism */}
      <motion.section
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Order Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaBox, title: "Order Number", value: "#123456" },
              { icon: FaCreditCard, title: "Payment Method", value: "Credit Card" },
              { icon: FaTruck, title: "Shipping Method", value: "Express Delivery" },
              { icon: FaMapMarkerAlt, title: "Delivery Address", value: "123 Street Name" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="backdrop-blur-lg bg-white/80 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300
                          border border-white/20 hover:border-primary/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="text-2xl text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section with Advanced Animation */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Order Timeline</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {[
              { status: "Order Placed", time: "Just now", active: true },
              { status: "Processing", time: "Expected in 1 hour", active: false },
              { status: "Shipping", time: "Expected in 2 days", active: false },
              { status: "Delivery", time: "Expected in 3-4 days", active: false }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <span className={`w-3 h-3 rounded-full ${step.active ? 'bg-primary' : 'bg-gray-400'}`}></span>
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <h3 className={`text-lg font-semibold ${step.active ? 'text-primary' : 'text-gray-900'}`}>
                      {step.status}
                    </h3>
                    <time className="text-sm text-gray-500">{step.time}</time>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section with Hover Effects */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Ordered Items</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300
                          hover:shadow-2xl border border-gray-100"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Name</h3>
                  <p className="text-gray-600 mb-4">Quantity: 1</p>
                  <p className="text-primary font-semibold text-lg">$99.99</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Customer Support Section with Interactive Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Need Help?</h2>
          <p className="text-xl text-gray-600 mb-12">Our customer support team is here to help you 24/7</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaComments, title: "Chat with Us", description: "Live chat support" },
              { icon: FaPhoneAlt, title: "Call Us", description: "24/7 phone support" },
              { icon: FaEnvelope, title: "Email Us", description: "Get response within 24h" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group p-6 bg-white rounded-2xl shadow-lg cursor-pointer
                          hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center
                              group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
                  <item.icon className="text-2xl text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Floating Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 space-y-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg
                    hover:bg-primary-dark hover:shadow-xl transition-all duration-300"
        >
          <FaArrowUp />
        </motion.button>
      </motion.div>

      {/* Continue Shopping Button */}
      <div className="py-12 text-center">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg
                      shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300"
          >
            Continue Shopping
            <FaArrowRight className="ml-2" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation; 