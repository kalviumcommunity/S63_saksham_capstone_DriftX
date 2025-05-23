import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaTrash, 
  FaArrowLeft, 
  FaTag,
  FaMoon,
  FaSun,
  FaRobot
} from 'react-icons/fa';
import { 
  removeFromCart, 
  updateCartQuantity, 
  clearCart 
} from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import AIRecommendations from '../components/AIRecommendations';
import useResponsive from '../utils/useResponsive';
import Confetti from 'react-confetti';
import { useSpeechSynthesis } from 'react-speech-kit';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [undoItem, setUndoItem] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const { speak } = useSpeechSynthesis();
  
  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax - discount;
  
  // Simulate real-time stock (random for demo)
  const getStock = (id) => 3 + (id % 5);

  // Progress bar for free shipping
  const freeShippingThreshold = 100;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Voice feedback
  const voiceNotify = (msg) => speak({ text: msg });

  // Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    const stock = getStock(id);
    if (quantity < 1) return;
    if (quantity > stock) {
      toast.error('Not enough stock', { autoClose: 1200, position: 'bottom-right' });
      voiceNotify('Not enough stock');
      return;
    }
    dispatch(updateCartQuantity({ id, quantity }));
    toast.info('Cart updated', { autoClose: 800, position: 'bottom-right' });
    voiceNotify('Cart updated');
  };
  
  // Handle remove item with undo
  const handleRemoveItem = (id) => {
    const item = cartItems.find(i => i.id === id);
    setUndoItem(item);
    dispatch(removeFromCart(id));
    toast(<span>Item removed <button onClick={handleUndoRemove} className="ml-2 underline">Undo</button></span>, { autoClose: 3000, position: 'bottom-right' });
  };
  const handleUndoRemove = () => {
    if (undoItem) {
      dispatch(updateCartQuantity({ id: undoItem.id, quantity: undoItem.quantity }));
      setUndoItem(null);
      toast.success('Undo successful', { autoClose: 1000, position: 'bottom-right' });
    }
  };
  
  // On successful promo, show confetti and voice
  const handlePromoSubmit = (e) => {
    e.preventDefault();
    const promoCodes = { 'WELCOME10': 10, 'SUMMER20': 20, 'SALE15': 15 };
    if (promoCodes[promoCode]) {
      setDiscount(subtotal * (promoCodes[promoCode] / 100));
      toast.success('Promo applied!', { autoClose: 1200, position: 'bottom-right' });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      voiceNotify('Promo applied');
    } else {
      setDiscount(0);
      toast.error('Invalid promo code', { autoClose: 1200, position: 'bottom-right' });
      voiceNotify('Invalid promo code');
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 }
    }
  };
  
  // Sample product data for men's and women's clothing
  const sampleProducts = [
    {
      id: 1,
      name: "Men's Classic Fit Shirt",
      category: "Men's Clothing",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      quantity: 1
    },
    {
      id: 2,
      name: "Women's Summer Dress",
      category: "Women's Clothing",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quantity: 2
    },
    {
      id: 3,
      name: "Men's Denim Jacket",
      category: "Men's Clothing",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      quantity: 1
    }
  ];
  
  // Use sample data if cart is empty (for demonstration)
  const displayItems = cartItems.length > 0 ? cartItems : sampleProducts;
  
  // Loading skeletons for async cart (simulate loading)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [cartItems]);
  
  return (
    <motion.div 
      className={`w-full min-h-screen px-0 sm:px-0 py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      {/* Dark/Light mode toggle */}
      <button onClick={() => setDarkMode(d => !d)} className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow">
        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
      </button>
      {/* Floating AI chat button */}
      <button onClick={() => setShowAIChat(true)} className="fixed bottom-4 right-4 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors">
        <FaRobot className="text-2xl" />
      </button>
      {/* Mini-cart drawer for mobile */}
      {isMobile && showMiniCart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
          <div className="w-80 bg-white h-full shadow-lg p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Mini Cart</h2>
            {/* ...map items... */}
            <button onClick={() => setShowMiniCart(false)} className="mt-4 w-full py-2 bg-primary text-white rounded">Close</button>
          </div>
        </div>
      )}
      {/* Sticky checkout bar on mobile */}
      {isMobile && displayItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-40 bg-primary text-white flex justify-between items-center px-4 py-3 shadow-lg">
          <span className="font-bold">Total: ${total.toFixed(2)}</span>
          <Link to="/checkout" className="bg-white text-primary font-bold px-4 py-2 rounded shadow">Checkout</Link>
        </div>
      )}
      {/* Free shipping progress bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-center mt-1 text-black dark:text-white">
          {subtotal < freeShippingThreshold ? `Add $${(freeShippingThreshold - subtotal).toFixed(2)} for free shipping!` : 'You have free shipping!'}
        </p>
      </div>
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">Your Shopping Cart</h1>
        <p className="text-black">Review your items and proceed to checkout</p>
      </motion.div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr] gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40 h-40 bg-gray-200 rounded-md" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="h-5 bg-gray-100 rounded w-1/4" />
                <div className="mt-auto flex gap-2">
                  <div className="w-24 h-8 bg-gray-100 rounded" />
                  <div className="w-20 h-8 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-full mt-4" />
          </div>
        </div>
      ) : displayItems.length === 0 ? (
        <motion.div 
          className="text-center py-16 px-4 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaShoppingCart className="text-6xl text-primary/50 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-black mb-2">Your cart is empty</h2>
          <p className="text-black mb-6 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet.
            Browse our collection and find something you'll love!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-md hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-6">
            <AnimatePresence>
              {displayItems.map((item) => (
                <motion.div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <motion.img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full sm:w-40 h-40 object-cover rounded-md cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => { setShowImageModal(true); setModalImage(item.image); }}
                  />
                  
                  <div className="flex-1 flex flex-col">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="text-lg font-semibold text-black hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span className="text-sm mb-2 text-black">{item.category}</span>
                    <span className="text-lg font-medium text-black">${item.price.toFixed(2)}</span>
                    
                    <div className="mt-auto flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-border rounded-md">
                        <motion.button 
                          className="w-8 h-8 flex items-center justify-center text-black hover:bg-background-alt transition-colors"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </motion.button>
                        <input 
                          type="number" 
                          className="w-12 h-8 text-center border-x border-border focus:outline-none text-black" 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1"
                          aria-label={`Quantity of ${item.name}`}
                        />
                        <motion.button 
                          className="w-8 h-8 flex items-center justify-center text-black hover:bg-background-alt transition-colors"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </motion.button>
                      </div>
                      
                      <motion.button 
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-black hover:bg-error/5 rounded-md transition-colors"
                        onClick={() => handleRemoveItem(item.id)}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrash /> Remove
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-black">Subtotal</span>
                <span className="text-black font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-black">Shipping</span>
                <span className="text-black font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-black">Tax</span>
                <span className="text-black font-medium">${tax.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-black">Discount</span>
                  <span className="text-black font-medium">-${discount.toFixed(2)}</span>
                </motion.div>
              )}
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-black">Total</span>
                  <span className="text-xl font-bold text-black">${total.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-black mt-2">
                    You've qualified for free shipping!
                  </p>
                )}
              </div>
            </div>
            
            <form onSubmit={handlePromoSubmit} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-black"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Apply
                </motion.button>
              </div>
            </form>
            
            <Link to="/checkout">
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-md hover:-translate-y-1 hover:shadow-lg transition-all"
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
              >
                Proceed to Checkout
              </motion.button>
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 mt-4 text-black hover:text-primary transition-colors"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      )}
      {/* Product image modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setShowImageModal(false)}>
          <img src={modalImage} alt="Product" className="max-w-full max-h-[80vh] rounded-lg shadow-lg" />
        </div>
      )}
      {/* AI Recommendations below cart */}
      <div className="mt-12">
        <AIRecommendations />
      </div>
    </motion.div>
  );
};

export default Cart;