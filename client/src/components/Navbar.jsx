import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const { userInfo } = useSelector((state) => state.user || { userInfo: null });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Left - Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="navbar-brand">DriftX</Link>
        </motion.div>

        {/* Center - Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Right - Links & Cart */}
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link to="/" className="navbar-link">Home</Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link to="/mens" className="navbar-link">Men</Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link to="/womens" className="navbar-link">Women</Link>
          </motion.div>
          
          {userInfo ? (
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link to="/profile" className="navbar-link">Profile</Link>
            </motion.div>
          ) : (
            <>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to="/login" className="navbar-link">Login</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to="/register" className="navbar-link">Register</Link>
              </motion.div>
            </>
          )}
          
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span 
                    className="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
