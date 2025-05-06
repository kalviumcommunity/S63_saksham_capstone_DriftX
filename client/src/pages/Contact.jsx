import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

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
    <div className="bg-background-alt text-text-primary font-sans py-12">
      {/* Hero Section */}
      <motion.section 
        className="text-center max-w-7xl mx-auto px-6 mb-12"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 text-text-primary inline-block relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className="text-lg text-text-secondary max-w-3xl mx-auto"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Have questions about our products or services? We're here to help! Reach out to our team using the form below or contact us directly.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-6 mb-16">
        {/* Contact Information */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-8"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Get In Touch</h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div 
              className="flex items-start gap-4"
              variants={slideUp}
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#222]">Our Location</h3>
                <p className="text-[#333]">123 Fashion Street</p>
                <p className="text-[#333]">New York, NY 10001</p>
                <p className="text-[#333]">United States</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              variants={slideUp}
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#222]">Phone</h3>
                <p className="text-[#333]">+1 (555) 123-4567</p>
                <p className="text-[#333]">+1 (555) 765-4321</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              variants={slideUp}
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#222]">Email</h3>
                <p className="text-[#333]">info@driftx.com</p>
                <p className="text-[#333]">support@driftx.com</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-4"
              variants={slideUp}
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <FaClock className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#222]">Business Hours</h3>
                <p className="text-[#333]">Monday - Friday: 9am - 6pm</p>
                <p className="text-[#333]">Saturday: 10am - 4pm</p>
                <p className="text-[#333]">Sunday: Closed</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-8"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Send Us a Message</h2>
          
          {submitSuccess && (
            <motion.div 
              className="bg-success/10 text-success p-4 rounded-md mb-6 border border-success/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p>Thank you for your message! We'll get back to you as soon as possible.</p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#222]">
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
                  className="w-full px-4 py-3 rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#222]">
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
                  className="w-full px-4 py-3 rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2 text-[#222]">
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
                className="w-full px-4 py-3 rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="How can we help?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#222]">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y min-h-[150px]"
                placeholder="Write your message here..."
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-md hover:-translate-y-1 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;