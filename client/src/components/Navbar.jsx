import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const { userInfo } = useSelector((state) => state.user || { userInfo: null });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DriftX
            </Link>
          </motion.div>

          {/* Center - Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>

          {/* Right - Links & Cart */}
          <div className={`md:flex items-center space-x-8 ${
            isMenuOpen 
              ? 'fixed top-16 left-0 right-0 bg-white shadow-lg flex flex-col space-y-4 p-4 transform translate-y-0 opacity-100 visible transition-all duration-300' 
              : 'hidden md:flex'
          }`}>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link to="/mens" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                Men
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link to="/womens" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                Women
              </Link>
            </motion.div>
            
            {userInfo ? (
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                  Profile
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium">
                    Register
                  </Link>
                </motion.div>
              </>
            )}
            
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-xl">
                <FaShoppingCart />
                <AnimatePresence>
                  {cartItems.length > 0 && (
                    <motion.span 
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold"
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
      </div>
    </nav>
  );
};

export default Navbar;
