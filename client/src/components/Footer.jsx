import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaArrowRight
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const socialIconVariants = {
    hover: { y: -5, scale: 1.1 },
    tap: { scale: 0.95 }
  };
  
  const linkVariants = {
    hover: { x: 5, color: "#6366f1" },
    tap: { scale: 0.98 }
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <Link to="/" className="footer-logo">DriftX</Link>
            <p className="footer-description">
              Discover the latest trends in men's and women's fashion. Quality clothing for every occasion at affordable prices.
            </p>
            <div className="footer-social">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaPinterestP />
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/" className="footer-link">Home</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/about" className="footer-link">About Us</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/contact" className="footer-link">Contact Us</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/profile" className="footer-link">My Account</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/cart" className="footer-link">Shopping Cart</Link>
              </motion.div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-heading">Categories</h3>
            <div className="footer-links">
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/mens" className="footer-link">Men's Clothing</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/womens" className="footer-link">Women's Clothing</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/mens" className="footer-link">Men's Accessories</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/womens" className="footer-link">Women's Accessories</Link>
              </motion.div>
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Link to="/mens" className="footer-link">New Arrivals</Link>
              </motion.div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Fashion Street, New York, NY 10001</span>
              </div>
              <div className="footer-contact-item">
                <FaPhoneAlt className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="contact-icon" />
                <span>support@driftx.com</span>
              </div>
              <div className="footer-contact-item">
                <FaClock className="contact-icon" />
                <span>Mon-Fri: 9AM - 6PM</span>
              </div>
              
              <div className="footer-newsletter">
                <h4 className="footer-heading">Newsletter</h4>
                <p className="footer-description">Subscribe to get updates on new arrivals and special offers</p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="newsletter-input" 
                    required 
                  />
                  <motion.button 
                    type="submit" 
                    className="newsletter-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaArrowRight />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} <Link to="/">DriftX</Link>. All Rights Reserved.
          </div>
          <div className="footer-payment">
            <motion.span 
              className="payment-icon"
              whileHover={{ y: -3, color: "#f9fafb" }}
            >
              <FaCcVisa />
            </motion.span>
            <motion.span 
              className="payment-icon"
              whileHover={{ y: -3, color: "#f9fafb" }}
            >
              <FaCcMastercard />
            </motion.span>
            <motion.span 
              className="payment-icon"
              whileHover={{ y: -3, color: "#f9fafb" }}
            >
              <FaCcPaypal />
            </motion.span>
            <motion.span 
              className="payment-icon"
              whileHover={{ y: -3, color: "#f9fafb" }}
            >
              <FaCcApplePay />
            </motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;