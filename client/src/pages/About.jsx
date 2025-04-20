import { motion } from 'framer-motion';
import { FaShippingFast, FaAward, FaHeadset, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './About.css';

const About = () => {
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

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      bio: 'John founded DriftX with a vision to create a premium shopping experience for customers worldwide.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      bio: 'Sarah leads our design team, ensuring all products meet our high standards for quality and aesthetics.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      bio: 'Michael oversees our technology infrastructure, ensuring a seamless shopping experience for our customers.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Customer Relations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      bio: 'Emily ensures that every customer receives exceptional service and support throughout their journey with us.'
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <motion.img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="About us hero" 
          className="about-hero-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        />
        <div className="about-hero-content">
          <motion.h1 
            className="about-hero-title"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            About DriftX
          </motion.h1>
          <motion.p 
            className="about-hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We're on a mission to provide high-quality products with exceptional customer service.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story">
        <motion.div 
          className="about-story-image"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Our story" 
          />
        </motion.div>
        <motion.div 
          className="about-story-content"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="about-story-title">Our Story</h2>
          <p className="about-story-text">
            Founded in 2020, DriftX began with a simple idea: to create a shopping experience that combines quality, convenience, and exceptional service.
          </p>
          <p className="about-story-text">
            What started as a small online store has grown into a trusted marketplace offering a wide range of products to customers worldwide. Our commitment to quality and customer satisfaction remains at the heart of everything we do.
          </p>
          <p className="about-story-text">
            Today, we continue to expand our product offerings while maintaining the personalized service that our customers have come to expect from DriftX.
          </p>
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="about-values">
        <div className="about-values-container">
          <motion.div 
            className="about-section-header"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="about-section-title">Our Values</h2>
            <p className="about-section-subtitle">
              These core principles guide everything we do at DriftX
            </p>
          </motion.div>
          
          <motion.div 
            className="about-values-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="about-value-card"
              variants={slideUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="about-value-icon">
                <FaShippingFast />
              </div>
              <h3 className="about-value-title">Quality</h3>
              <p className="about-value-text">We carefully curate our products to ensure they meet our high standards for quality and durability.</p>
            </motion.div>
            
            <motion.div 
              className="about-value-card"
              variants={slideUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="about-value-icon">
                <FaAward />
              </div>
              <h3 className="about-value-title">Excellence</h3>
              <p className="about-value-text">We strive for excellence in every aspect of our business, from product selection to customer service.</p>
            </motion.div>
            
            <motion.div 
              className="about-value-card"
              variants={slideUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="about-value-icon">
                <FaHeadset />
              </div>
              <h3 className="about-value-title">Customer Focus</h3>
              <p className="about-value-text">Our customers are at the center of everything we do. Your satisfaction is our top priority.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="about-team">
        <motion.div 
          className="about-section-header"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="about-section-title">Meet Our Team</h2>
          <p className="about-section-subtitle">
            The passionate individuals behind DriftX
          </p>
        </motion.div>
        
        <motion.div 
          className="about-team-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className="about-team-card"
              variants={slideUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="about-team-image"
              />
              <div className="about-team-content">
                <h3 className="about-team-name">{member.name}</h3>
                <p className="about-team-role">{member.role}</p>
                <p className="about-team-bio">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="about-contact">
        <div className="about-contact-container">
          <motion.div 
            className="about-section-header"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="about-section-title">Get In Touch</h2>
            <p className="about-section-subtitle">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>
          
          <motion.div 
            className="about-contact-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="about-contact-item"
              variants={slideUp}
            >
              <div className="about-contact-icon">
                <FaMapMarkerAlt />
              </div>
              <h3 className="about-contact-title">Visit Us</h3>
              <p className="about-contact-text">123 Commerce Street<br />New York, NY 10001</p>
            </motion.div>
            
            <motion.div 
              className="about-contact-item"
              variants={slideUp}
            >
              <div className="about-contact-icon">
                <FaEnvelope />
              </div>
              <h3 className="about-contact-title">Email Us</h3>
              <p className="about-contact-text">info@driftx.com<br />support@driftx.com</p>
            </motion.div>
            
            <motion.div 
              className="about-contact-item"
              variants={slideUp}
            >
              <div className="about-contact-icon">
                <FaPhone />
              </div>
              <h3 className="about-contact-title">Call Us</h3>
              <p className="about-contact-text">+1 (555) 123-4567<br />Mon-Fri, 9am-5pm EST</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;