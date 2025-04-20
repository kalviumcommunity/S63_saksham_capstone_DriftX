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
import './Cart.css';

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
      className="cart-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="cart-header" variants={itemVariants}>
        <h1 className="cart-title">Your Shopping Cart</h1>
        <p className="cart-subtitle">Review your items and proceed to checkout</p>
      </motion.div>
      
      {displayItems.length === 0 ? (
        <motion.div 
          className="cart-empty"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaShoppingCart className="cart-empty-icon" />
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-text">
            Looks like you haven't added any items to your cart yet.
            Browse our collection and find something you'll love!
          </p>
          <Link to="/" className="cart-empty-button">
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <AnimatePresence>
              {displayItems.map(item => (
                <motion.div 
                  key={item.id}
                  className="cart-item"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <motion.img 
                    src={item.image} 
                    alt={item.name}
                    className="cart-item-image"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`} className="cart-item-title">
                      {item.name}
                    </Link>
                    <span className="cart-item-category">{item.category}</span>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    
                    <div className="cart-item-actions">
                      <div className="quantity-selector">
                        <motion.button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          whileHover={{ backgroundColor: '#e5e7eb' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          -
                        </motion.button>
                        <input 
                          type="number" 
                          className="quantity-input" 
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1"
                        />
                        <motion.button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          whileHover={{ backgroundColor: '#e5e7eb' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          +
                        </motion.button>
                      </div>
                      
                      <motion.button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        whileHover={{ scale: 1.05 }}
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
            className="cart-summary"
            variants={itemVariants}
          >
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className="summary-value">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">Tax</span>
              <span className="summary-value">${tax.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <motion.div 
                className="summary-row"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <span className="summary-label">Discount</span>
                <span className="summary-value" style={{ color: '#10b981' }}>
                  -${discount.toFixed(2)}
                </span>
              </motion.div>
            )}
            
            <div className="summary-total">
              <span className="total-label">Total</span>
              <span className="total-value">${total.toFixed(2)}</span>
            </div>
            
            <motion.button 
              className="checkout-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Proceed to Checkout
            </motion.button>
            
            <Link to="/" className="continue-shopping">
              <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Continue Shopping
            </Link>
            
            <div className="promo-code">
              <h3 className="promo-title">Promo Code</h3>
              <form className="promo-form" onSubmit={handlePromoSubmit}>
                <input 
                  type="text" 
                  className="promo-input" 
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <motion.button 
                  type="submit" 
                  className="promo-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTag />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;