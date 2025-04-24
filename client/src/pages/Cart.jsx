import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaTrash, 
  FaArrowLeft, 
  FaTag 
} from 'react-icons/fa';
import { 
  removeFromCart, 
  updateCartQuantity, 
  clearCart 
} from '../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax - discount;
  
  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity }));
  };
  
  // Handle remove item
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };
  
  // Handle promo code
  const handlePromoSubmit = (e) => {
    e.preventDefault();
    
    // Example promo codes
    const promoCodes = {
      'WELCOME10': 10,
      'SUMMER20': 20,
      'SALE15': 15
    };
    
    if (promoCodes[promoCode]) {
      setDiscount(subtotal * (promoCodes[promoCode] / 100));
    } else {
      setDiscount(0);
      alert('Invalid promo code');
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
  
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">Your Shopping Cart</h1>
        <p className="text-text-secondary">Review your items and proceed to checkout</p>
      </motion.div>
      
      {displayItems.length === 0 ? (
        <motion.div 
          className="text-center py-16 px-4 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaShoppingCart className="text-6xl text-primary/50 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-text-primary mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
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
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-6">
            <AnimatePresence>
              {displayItems.map(item => (
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
                    className="w-full sm:w-40 h-40 object-cover rounded-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex-1 flex flex-col">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="text-lg font-semibold text-text-primary hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span className="text-text-secondary text-sm mb-2">{item.category}</span>
                    <span className="text-lg font-medium text-text-primary">${item.price.toFixed(2)}</span>
                    
                    <div className="mt-auto flex flex-wrap items-center gap-4">
                      <div className="flex items-center border border-border rounded-md">
                        <motion.button 
                          className="w-8 h-8 flex items-center justify-center text-text-primary hover:bg-background-alt transition-colors"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          whileTap={{ scale: 0.95 }}
                        >
                          -
                        </motion.button>
                        <input 
                          type="number" 
                          className="w-12 h-8 text-center border-x border-border focus:outline-none" 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1"
                        />
                        <motion.button 
                          className="w-8 h-8 flex items-center justify-center text-text-primary hover:bg-background-alt transition-colors"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          whileTap={{ scale: 0.95 }}
                        >
                          +
                        </motion.button>
                      </div>
                      
                      <motion.button 
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/5 rounded-md transition-colors"
                        onClick={() => handleRemoveItem(item.id)}
                        whileTap={{ scale: 0.95 }}
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
            <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-text-primary font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-text-secondary">Tax</span>
                <span className="text-text-primary font-medium">${tax.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <motion.div 
                  className="flex justify-between"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-text-secondary">Discount</span>
                  <span className="text-success font-medium">-${discount.toFixed(2)}</span>
                </motion.div>
              )}
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-text-primary">Total</span>
                  <span className="text-xl font-bold text-text-primary">${total.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-sm text-success mt-2">
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
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
            
            <motion.button
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-md hover:-translate-y-1 hover:shadow-lg transition-all"
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
            >
              Proceed to Checkout
            </motion.button>
            
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 mt-4 text-text-secondary hover:text-primary transition-colors"
            >
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;