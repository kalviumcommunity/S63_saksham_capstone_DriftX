import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50,
        damping: 20
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <motion.section 
        className="contact-hero"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="contact-hero-title"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="contact-hero-subtitle"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Have questions about our products or services? We're here to help! Reach out to our team using the form below or contact us directly.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <div className="contact-content">
        {/* Contact Information */}
        <motion.div 
          className="contact-info"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="contact-info-title">Get In Touch</h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="contact-info-item"
              variants={slideUp}
            >
              <div className="contact-info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-info-content">
                <h3>Our Location</h3>
                <p>123 Fashion Street</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-info-item"
              variants={slideUp}
            >
              <div className="contact-info-icon">
                <FaPhone />
              </div>
              <div className="contact-info-content">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 765-4321</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-info-item"
              variants={slideUp}
            >
              <div className="contact-info-icon">
                <FaEnvelope />
              </div>
              <div className="contact-info-content">
                <h3>Email</h3>
                <p>info@driftx.com</p>
                <p>support@driftx.com</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-info-item"
              variants={slideUp}
            >
              <div className="contact-info-icon">
                <FaClock />
              </div>
              <div className="contact-info-content">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div 
          className="contact-form-container"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="contact-form-title">Send Us a Message</h2>
          
          {submitSuccess && (
            <motion.div 
              className="contact-success-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p>Thank you for your message! We'll get back to you as soon as possible.</p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="name" className="contact-form-label">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="contact-form-group">
                <label htmlFor="email" className="contact-form-label">
                  Your Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="contact-form-group">
              <label htmlFor="subject" className="contact-form-label">
                Subject
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="contact-form-input"
                placeholder="How can we help you?"
              />
            </div>
            
            <div className="contact-form-group">
              <label htmlFor="message" className="contact-form-label">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="contact-form-textarea"
                placeholder="Your message here..."
              ></motion.textarea>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="contact-form-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <div className="contact-form-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="contact-form-button-icon" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
      
      {/* Map Section */}
      <motion.div 
        className="contact-map"
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="contact-map-title">Find Us</h2>
        <div className="contact-map-container">
          <div className="contact-map-placeholder">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                delay: 0.5 
              }}
            >
              <FaMapMarkerAlt className="contact-map-icon" />
              <h3 className="contact-map-text">Map Placeholder</h3>
              <p className="contact-map-description">
                In a real application, an interactive map would be displayed here.<br />
                Our store is located at 123 Fashion Street, New York, NY 10001.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* FAQ Section */}
      <motion.div 
        className="contact-faq"
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="contact-faq-title">Frequently Asked Questions</h2>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="contact-faq-item"
            variants={slideUp}
          >
            <h3 className="contact-faq-question">What are your shipping options?</h3>
            <p className="contact-faq-answer">
              We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas. Shipping costs vary based on location and chosen method.
            </p>
          </motion.div>
          
          <motion.div 
            className="contact-faq-item"
            variants={slideUp}
          >
            <h3 className="contact-faq-question">How can I track my order?</h3>
            <p className="contact-faq-answer">
              Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account and visiting the "My Orders" section.
            </p>
          </motion.div>
          
          <motion.div 
            className="contact-faq-item"
            variants={slideUp}
          >
            <h3 className="contact-faq-question">What is your return policy?</h3>
            <p className="contact-faq-answer">
              We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please visit our Returns page for more details on the process.
            </p>
          </motion.div>
          
          <motion.div 
            className="contact-faq-item"
            variants={slideUp}
          >
            <h3 className="contact-faq-question">Do you offer international shipping?</h3>
            <p className="contact-faq-answer">
              Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, and customs fees may apply depending on your location.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;