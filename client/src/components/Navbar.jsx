import React from 'react';
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { 
  FaShoppingCart, 
  FaSearch, 
  FaUser, 
  FaBars, 
  FaTimes, 
  FaHeart,
  FaChevronDown,
  FaList,
  FaBoxOpen,
  FaRegHeart,
  FaSignOutAlt,
  FaUserPlus
} from "react-icons/fa";
import { searchProductsDummy } from '../services/api';
import { logout } from "../redux/slices/userSlice";

// Add this before the Navbar component
const UserDropdown = ({ isOpen, onClose }) => {
  const { userInfo } = useSelector((state) => state.user || { userInfo: null });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 py-2"
          onMouseLeave={onClose}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            {userInfo ? (
              <>
                <p className="text-sm text-gray-500">Hello,</p>
                <p className="font-medium text-gray-900">{userInfo.username || userInfo.name || userInfo.email}</p>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="w-full py-2 px-4 bg-[#ff9900] text-white rounded-md text-sm font-medium hover:bg-[#ff9900]/90 transition-colors text-center"
                >
                  Sign in
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  New customer?{" "}
                  <Link to="/register" className="text-[#ff9900] hover:underline">
                    Start here
                  </Link>
                </p>
              </div>
            )}
          </div>

          <div className="py-2">
            <div className="px-2">
              <p className="px-3 py-2 text-xs font-semibold text-gray-500">Your Account</p>
              <Link
                to={userInfo ? "/profile" : "/login"}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FaUser className="w-4 h-4 mr-3 text-gray-400" />
                Your Profile
              </Link>
              <Link
                to={userInfo ? "/orders" : "/login"}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FaBoxOpen className="w-4 h-4 mr-3 text-gray-400" />
                Your Orders
              </Link>
              <Link
                to={userInfo ? "/wishlist" : "/login"}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <FaRegHeart className="w-4 h-4 mr-3 text-gray-400" />
                Your Wishlist
              </Link>
            </div>
          </div>

          {userInfo && (
            <div className="border-t border-gray-100 py-2 px-2">
              <button
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md w-full text-left"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                  onClose && onClose();
                }}
              >
                <FaSignOutAlt className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const { userInfo } = useSelector((state) => state.user || { userInfo: null });
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeout = useRef(null);
  const navigate = useNavigate();
  const searchBarRef = useRef(null); // Add ref for search bar

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Fetch suggestions as user types
  useEffect(() => {
    if (!searchQuery) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setSearchLoading(false);
      return;
    }
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    setSearchLoading(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const results = await searchProductsDummy(searchQuery);
        setSearchSuggestions(results.slice(0, 6));
        setShowSuggestions(true);
      } catch (e) {
        setSearchSuggestions([]);
        setShowSuggestions(true);
      } finally {
        setSearchLoading(false);
      }
    }, 250);
    return () => clearTimeout(searchTimeout.current);
  }, [searchQuery]);

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
    window.location.href = `/search?q=${encodeURIComponent(name)}`;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Click-away handler for search bar click mode
  useEffect(() => {
    if (!isSearchClicked) return;
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchClicked]);

  // Open search bar if hovered or clicked
  const searchBarShouldBeOpen = isSearchHovered || isSearchClicked;

  // Navigation links with dropdowns
  const navLinks = [
    { 
      name: "Home", 
      path: "/",
      dropdown: null
    },
    { 
      name: "Style Guide", 
      path: "/style-guide",
      dropdown: [
        { name: "Office Dress Guide", path: "/office-dress" },
        { name: "Skirt Length Guide", path: "/skirt-length" },
        { name: "Blazer Style Guide", path: "/blazer-style" }
      ]
    },
    { 
      name: "Men", 
      path: "/mens",
      dropdown: [
        { name: "All Men's", path: "/mens" },
        { name: "Shirts", path: "/mens/shirts" },
        { name: "Pants", path: "/mens/pants" },
        { name: "Shoes", path: "/mens/shoes" },
        { name: "Accessories", path: "/mens/accessories" }
      ]
    },
    { 
      name: "Women", 
      path: "/womens",
      dropdown: [
        { name: "All Women's", path: "/womens" },
        { name: "Shirts", path: "/womens/shirts" },
        { name: "Pants", path: "/womens/pants" },
        { name: "Accessories", path: "/womens/accessories" }
      ]
    },
    { 
      name: "Collections", 
      path: "/collections",
      dropdown: [
        { name: "Elegant White", path: "/elegant-white" },
        { name: "Classic Neutrals", path: "/classic-neutrals" },
        { name: "Modern Outerwear", path: "/modern-outerwear" }
      ]
    },
    { 
      name: "About", 
      path: "/about",
      dropdown: null
    },
    { 
      name: "Contact", 
      path: "/contact",
      dropdown: null
    }
  ];

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        when: "beforeChildren"
      }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { 
      opacity: 1, 
      width: "100%",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      width: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-black/70 backdrop-blur-md py-1 shadow-lg" 
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 relative">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.span 
                className="text-xl font-bold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DRIFT<span className="text-[#ff9900]">X</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.dropdown ? (
                    <div className="relative">
                      <button
                        className={`flex items-center text-sm text-white hover:text-[#ff9900] transition-colors relative overflow-hidden focus:outline-none ${
                          location.pathname === link.path ? "text-[#ff9900]" : ""
                        }`}
                        tabIndex={0}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === index}
                        onFocus={() => setActiveDropdown(index)}
                        onBlur={() => setActiveDropdown(null)}
                      >
                        <span className="relative z-10">
                          {link.name}
                        </span>
                        <motion.span
                          layoutId="navbar-underline"
                          className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#ff9900] rounded-full"
                          initial={false}
                          animate={{
                            opacity: activeDropdown === index ? 1 : 0,
                            scaleX: activeDropdown === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-1"
                        >
                          <FaChevronDown className="h-2.5 w-2.5 transition-transform" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="absolute left-0 mt-1 w-48 bg-white/30 backdrop-blur-xl shadow-2xl rounded-xl z-30 border border-white/20 overflow-hidden"
                            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
                          >
                            <div className="py-2">
                              {link.dropdown.map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.path}
                                  className="block px-4 py-2 text-sm text-black hover:bg-[#ff9900]/10 hover:text-[#ff9900] transition-colors"
                                  tabIndex={0}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-sm text-white hover:text-[#ff9900] transition-colors relative overflow-hidden ${
                        location.pathname === link.path ? "text-[#ff9900]" : ""
                      }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <motion.span
                        layoutId="navbar-underline"
                        className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#ff9900] rounded-full"
                        initial={false}
                        animate={{
                          opacity: location.pathname === link.path ? 1 : 0,
                          scaleX: location.pathname === link.path ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSearchClicked((clicked) => !clicked)}
                  className="text-white hover:text-[#ff9900] transition-colors"
                  tabIndex={0}
                  aria-label="Open search bar"
                >
                  <FaSearch className="h-4 w-4" />
                </motion.button>
              </motion.div>

              {/* Wishlist Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to="/wishlist" className="text-white hover:text-[#ff9900] transition-colors">
                  <FaHeart className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* User Icon with Dropdown */}
              <motion.div
                className="relative"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
                ref={userDropdownRef}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer text-white hover:text-[#ff9900] transition-colors"
                >
                  <FaUser className="h-4 w-4" />
                </motion.div>
                <UserDropdown 
                  isOpen={isUserDropdownOpen} 
                  onClose={() => setIsUserDropdownOpen(false)}
                />
              </motion.div>

              {/* Cart Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Link to="/cart" className="text-white hover:text-[#ff9900] transition-colors">
                  <FaShoppingCart className="h-4 w-4" />
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-[#ff9900] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-[#ff9900] transition-colors"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
          {/* Search Bar Popup - moved here for full width */}
          <AnimatePresence>
            {searchBarShouldBeOpen && (
              <motion.div
                ref={searchBarRef}
                onMouseEnter={() => setIsSearchHovered(true)}
                onMouseLeave={() => setIsSearchHovered(false)}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={searchVariants}
                className="mt-2 absolute left-0 right-0 z-50 px-4"
              >
                <form onSubmit={handleSearchSubmit} autoComplete="off">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="w-full px-3 py-1.5 text-sm bg-white/10 backdrop-blur-md text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff9900]"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onFocus={() => searchSuggestions.length > 0 && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    />
                    <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                      <FaSearch className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl z-50 border border-white/30 overflow-hidden"
                      >
                        {searchLoading ? (
                          <li className="px-4 py-2 text-gray-500 text-sm flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 mr-2 text-[#ff9900]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="#ff9900" d="M4 12a8 8 0 018-8v8z"></path></svg>
                            Loading...
                          </li>
                        ) : searchSuggestions.length > 0 ? (
                          searchSuggestions.map((item, idx) => (
                            <li
                              key={item.id || idx}
                              className="px-4 py-2 text-black hover:bg-[#ff9900]/10 hover:text-[#ff9900] cursor-pointer text-sm transition-colors"
                              onMouseDown={() => handleSuggestionClick(item.title)}
                            >
                              {item.title}
                            </li>
                          ))
                        ) : (
                          <li className="px-4 py-2 text-gray-500 text-sm">No results found</li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-lg md:hidden"
            style={{ top: "48px" }}
          >
            <div className="flex flex-col h-full p-6 overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.div key={index} variants={mobileItemVariants} className="py-3 border-b border-white/10">
                  {link.dropdown ? (
                    <div>
                      <button
                        className={`flex items-center justify-between w-full text-white hover:text-[#ff9900] transition-colors ${
                          location.pathname === link.path ? "text-[#ff9900]" : ""
                        }`}
                        onClick={() => toggleDropdown(index)}
                      >
                        <span className="text-lg font-medium">{link.name}</span>
                        <motion.span
                          animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown className="h-4 w-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="mt-2 pl-4 border-l border-white/10"
                          >
                            {link.dropdown.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                className="block py-2 text-white hover:text-[#ff9900] transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block text-lg font-medium text-white hover:text-[#ff9900] transition-colors ${
                        location.pathname === link.path ? "text-[#ff9900]" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile Menu Footer */}
              <div className="mt-auto pt-6">
                <div className="flex flex-col space-y-4">
                  {userInfo ? (
                    <div className="text-white">
                      <p className="text-sm opacity-70">Logged in as</p>
                      <p className="font-medium">{userInfo.username || userInfo.name || userInfo.email}</p>
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="px-4 py-2 bg-white/10 rounded-full text-white text-center hover:bg-white/20 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="px-4 py-2 bg-[#ff9900] rounded-full text-white text-center hover:bg-[#ff9900]/80 transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar Spacer */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;