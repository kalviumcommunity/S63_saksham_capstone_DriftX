import { motion } from 'framer-motion';
import { FaShippingFast, FaAward, FaHeadset, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

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
    <div className="bg-background-alt text-text-primary font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/80 to-secondary/80 py-24 overflow-hidden text-white">
        <motion.img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="About us hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl font-extrabold mb-6 md:text-6xl"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            About DriftX
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We're on a mission to provide high-quality products with exceptional customer service.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-wrap items-center gap-12">
        <motion.div 
          className="flex-1 min-w-[300px]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Our story" 
            className="w-full rounded-lg shadow-xl"
          />
        </motion.div>
        <motion.div 
          className="flex-1 min-w-[300px]"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-text-primary">Our Story</h2>
          <div className="space-y-4 text-lg text-text-secondary">
            <p>
              Founded in 2020, DriftX began with a simple idea: to create a shopping experience that combines quality, convenience, and exceptional service.
            </p>
            <p>
              What started as a small online store has grown into a trusted marketplace offering a wide range of products to customers worldwide. Our commitment to quality and customer satisfaction remains at the heart of everything we do.
            </p>
            <p>
              Today, we continue to expand our product offerings while maintaining the personalized service that our customers have come to expect from DriftX.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-text-primary">Our Values</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              These core principles guide everything we do at DriftX
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="bg-background-alt rounded-lg p-8 text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Quality</h3>
              <p className="text-text-secondary">We carefully curate our products to ensure they meet our high standards for quality and durability.</p>
            </motion.div>
            
            <motion.div 
              className="bg-background-alt rounded-lg p-8 text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Excellence</h3>
              <p className="text-text-secondary">We strive for excellence in every aspect of our business, from product selection to customer service.</p>
            </motion.div>
            
            <motion.div 
              className="bg-background-alt rounded-lg p-8 text-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text-primary">Customer Focus</h3>
              <p className="text-text-secondary">Our customers are at the center of everything we do. Your satisfaction is our top priority.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-text-primary">Meet Our Team</h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            The passionate individuals behind DriftX
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              variants={slideUp}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-text-primary">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-text-secondary">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div 
              className="text-center p-6"
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-white/90">123 Commerce Street<br />New York, NY 10001</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-white/90">info@driftx.com<br />support@driftx.com</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-6"
              variants={slideUp}
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-white/90">+1 (555) 123-4567<br />Mon-Fri, 9am-5pm EST</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;