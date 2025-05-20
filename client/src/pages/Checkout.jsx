import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaShippingFast, 
         FaBox, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaInfoCircle, 
         FaRobot, FaArrowRight, FaArrowLeft, FaMoneyBillWave, FaMobileAlt, FaWallet } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';
import ReactGA from 'react-ga4';

const Checkout = () => {
  const navigate = useNavigate();
  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const chatRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const [aiMessages, setAiMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI shopping assistant. How can I help you with your checkout?'
    }
  ]);

  // Animation variants
  const pageTransition = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Validation functions
  const validateShippingInfo = useCallback(() => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    return Object.keys(newErrors).length === 0 ? true : newErrors;
  }, [formData]);

  const validatePaymentInfo = useCallback(() => {
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId?.trim()) newErrors.upiId = 'UPI ID is required';
    }
    return Object.keys(newErrors).length === 0 ? true : newErrors;
  }, [formData, paymentMethod]);

  // Effect to validate form when data changes
  useEffect(() => {
    let validationResult;
    if (currentStep === 1) {
      validationResult = validateShippingInfo();
    } else if (currentStep === 2) {
      validationResult = validatePaymentInfo();
    } else {
      validationResult = true;
    }
    
    setIsFormValid(validationResult === true);
    setErrors(validationResult === true ? {} : validationResult);
  }, [formData, currentStep, paymentMethod, validateShippingInfo, validatePaymentInfo]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle AI chat
  const handleAIChat = async (message) => {
    setAiMessages(prev => [...prev, { type: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        type: 'bot',
        content: 'I understand you need help with the checkout process. What specific information would you like to know?'
      }]);
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else if (isFormValid) {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    ReactGA.event({ category: 'Checkout', action: 'Placed Order' });
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      navigate('/order-confirmation');
    }, 2000);
  };

  // Render steps based on current step
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            key="shipping"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.firstName ? 'border-error' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-error">{errors.firstName}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.lastName ? 'border-error' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-error">{errors.lastName}</p>
                )}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-error' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-error' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-error">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-error' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                  placeholder="Enter your shipping address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-error">{errors.address}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="payment"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <FaCreditCard className="text-4xl text-primary" />
                <span>Credit/Debit Card</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <FaMoneyBillWave className="text-4xl text-green-600" />
                <span>Cash on Delivery</span>
              </button>

              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <FaMobileAlt className="text-4xl text-purple-600" />
                <span>UPI / Paytm</span>
              </button>

              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <FaPaypal className="text-4xl text-[#00457C]" />
                <span>PayPal</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('googlepay')}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === 'googlepay' ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <FaGooglePay className="text-4xl text-[#4285F4]" />
                <span>Google Pay</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('applepay')}
                className={`p-6 border rounded-lg flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === 'applepay' ? 'border-primary bg-primary/5' : 'border-gray-300'
                }`}
              >
                <FaApplePay className="text-4xl text-black" />
                <span>Apple Pay</span>
              </button>
            </motion.div>

            {/* Payment Method Specific Forms */}
            <AnimatePresence mode="wait">
              {paymentMethod === 'card' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="1234 5678 9012 3456"
                      />
                      <FaCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Enter cardholder name"
                      />
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          placeholder="MM/YY"
                        />
                        <FaCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          placeholder="123"
                        />
                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'cod' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="p-6 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <FaMoneyBillWave className="text-2xl text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Cash on Delivery Information</h3>
                      <p className="text-gray-600 text-sm">
                        Pay with cash upon delivery. Additional fee of $2 applies for COD orders.
                        Our delivery partner will collect the payment at the time of delivery.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'upi' && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="username@upi"
                      />
                      <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </motion.div>
                  <div className="flex items-center justify-center gap-8 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 bg-[#00BAF2] rounded-full flex items-center justify-center">
                        <FaWallet className="text-white text-xl" />
                      </div>
                      <span className="text-sm">Paytm</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 bg-[#5F259F] rounded-full flex items-center justify-center">
                        <FaMobileAlt className="text-white text-xl" />
                      </div>
                      <span className="text-sm">PhonePe</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 bg-[#4285F4] rounded-full flex items-center justify-center">
                        <FaGooglePay className="text-white text-xl" />
                      </div>
                      <span className="text-sm">Google Pay</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {(paymentMethod === 'paypal' || paymentMethod === 'googlepay' || paymentMethod === 'applepay') && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="p-6 bg-gray-50 rounded-lg text-center"
                >
                  <p className="text-gray-600 mb-4">
                    You will be redirected to {
                      paymentMethod === 'paypal' ? 'PayPal' :
                      paymentMethod === 'googlepay' ? 'Google Pay' : 'Apple Pay'
                    } to complete your payment securely.
                  </p>
                  <motion.button
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {paymentMethod === 'paypal' && <FaPaypal />}
                    {paymentMethod === 'googlepay' && <FaGooglePay />}
                    {paymentMethod === 'applepay' && <FaApplePay />}
                    Continue with {
                      paymentMethod === 'paypal' ? 'PayPal' :
                      paymentMethod === 'googlepay' ? 'Google Pay' : 'Apple Pay'
                    }
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="review"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Review</h2>
            
            {/* Order summary */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              {/* Add order items here */}
            </motion.div>

            {/* Shipping details */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-900">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{formData.address}</p>
                </div>
              </div>
            </motion.div>

            {/* Payment details */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium text-gray-900 capitalize">{paymentMethod}</p>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // AI Chat component
  const AIChat = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div className="p-4 bg-primary text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaRobot className="text-xl" />
          <span className="font-medium">AI Assistant</span>
        </div>
        <button
          onClick={() => setShowAIAssistant(false)}
          className="text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
      
      <div className="h-96 overflow-y-auto p-4" ref={chatRef}>
        {aiMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.elements.message;
            if (input.value.trim()) {
              handleAIChat(input.value);
              input.value = '';
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            name="message"
            placeholder="Type your question..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step < currentStep
                      ? 'text-primary'
                      : step === currentStep
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep
                        ? 'bg-primary text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {step < currentStep ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 ${
                        step < currentStep ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-gray-900">Shipping</span>
              <span className="text-sm font-medium text-gray-900">Payment</span>
              <span className="text-sm font-medium text-gray-900">Review</span>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            {/* Navigation buttons */}
            <motion.div
              className="flex justify-between mt-8"
              variants={itemVariants}
            >
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <FaArrowLeft />
                  Back
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!isFormValid || loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors ml-auto ${
                  isFormValid && !loading
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === 3 ? (
                  loading ? 'Processing...' : 'Place Order'
                ) : (
                  <>
                    Next
                    <FaArrowRight />
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* AI Assistant Button */}
      <motion.button
        onClick={() => setShowAIAssistant(true)}
        className="fixed bottom-4 right-4 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      {/* AI Assistant Chat */}
      <AnimatePresence>
        {showAIAssistant && <AIChat />}
      </AnimatePresence>
    </div>
  );
};

export default Checkout; 