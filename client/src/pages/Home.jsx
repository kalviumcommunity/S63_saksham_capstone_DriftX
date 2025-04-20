import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaPaperPlane, FaTshirt, FaRuler } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const mensRef = useRef(null);
  const womensRef = useRef(null);
  
  // 3D animation values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts();
        const productList = Array.isArray(res.data)
          ? res.data
          : res.data.products;
        setProducts(productList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchData();
    
    // Hide 3D logo after 5 seconds
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  // Scroll to section function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  // 3D Logo animation variants
  const logoVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: 90,
      rotateY: 0
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1
      }
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      transition: { duration: 0.5 }
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
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Sample product data for men's and women's clothing
  const sampleProducts = [
    {
      _id: 1,
      name: "Men's Classic Fit Shirt",
      category: "Men's Clothing",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      rating: 4.5,
      description: "A classic fit shirt perfect for any occasion.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Blue", "Black"]
    },
    {
      _id: 2,
      name: "Women's Summer Dress",
      category: "Women's Clothing",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 4.8,
      description: "A beautiful summer dress for a day out.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Red", "Pink", "Floral"]
    },
    {
      _id: 3,
      name: "Men's Denim Jacket",
      category: "Men's Clothing",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      rating: 4.3,
      description: "A stylish denim jacket for a casual look.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Blue", "Light Blue", "Dark Blue"]
    },
    {
      _id: 4,
      name: "Women's Casual Blouse",
      category: "Women's Clothing",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 4.6,
      description: "A comfortable casual blouse for everyday wear.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Black", "Beige"]
    },
    {
      _id: 5,
      name: "Men's Slim Fit Jeans",
      category: "Men's Clothing",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 4.4,
      description: "Slim fit jeans for a modern look.",
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["Blue", "Black", "Grey"]
    },
    {
      _id: 6,
      name: "Women's Leather Jacket",
      category: "Women's Clothing",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      rating: 4.9,
      description: "A stylish leather jacket for a bold look.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Brown", "Red"]
    },
    {
      _id: 7,
      name: "Men's Casual T-Shirt",
      category: "Men's Clothing",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      rating: 4.2,
      description: "A comfortable casual t-shirt for everyday wear.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["White", "Black", "Grey", "Navy", "Green"]
    },
    {
      _id: 8,
      name: "Women's Maxi Dress",
      category: "Women's Clothing",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
      rating: 4.7,
      description: "A beautiful maxi dress for special occasions.",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Black", "Red", "Blue", "Floral"]
    }
  ];

  // Use sample data if no products are fetched
  const displayProducts = products.length > 0 ? products : sampleProducts;

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 3D Logo Animation */}
      <AnimatePresence>
        {showLogo && (
          <motion.div 
            className="logo-3d-container"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseMove={handleMouseMove}
          >
            <motion.div 
              className="logo-3d"
              style={{ rotateX, rotateY, z: 100 }}
            >
              <motion.div className="logo-3d-text">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  D
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  r
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  i
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  f
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  t
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  X
                </motion.span>
              </motion.div>
              <motion.p
                className="logo-3d-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Fashion Redefined
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        variants={itemVariants}
      >
        <motion.img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="Fashion Collection" 
          className="hero-image"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Your Style with DriftX
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our latest collection of premium clothing for men and women. Quality fabrics, trendy designs, and unbeatable prices.
          </motion.p>
          <motion.button 
            className="hero-button"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div 
        className="categories-section"
        variants={itemVariants}
      >
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find the perfect outfit for any occasion</p>
        </div>
        
        <div className="categories-grid">
          <motion.div 
            className="category-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
              alt="Men's Collection" 
              className="category-image"
            />
            <div className="category-content">
              <h3 className="category-title">Men's Collection</h3>
              <p className="category-description">Shirts, jeans, jackets, and more</p>
              <motion.button 
                className="category-link"
                onClick={() => scrollToSection(mensRef)}
                whileHover={{ x: 5 }}
              >
                Explore Collection <FaArrowRight className="category-link-icon" />
              </motion.button>
              <Link to="/mens" className="category-link category-link-page">
                Shop Men's <FaArrowRight className="category-link-icon" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="category-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Women's Collection" 
              className="category-image"
            />
            <div className="category-content">
              <h3 className="category-title">Women's Collection</h3>
              <p className="category-description">Dresses, tops, skirts, and more</p>
              <motion.button 
                className="category-link"
                onClick={() => scrollToSection(womensRef)}
                whileHover={{ x: 5 }}
              >
                Explore Collection <FaArrowRight className="category-link-icon" />
              </motion.button>
              <Link to="/womens" className="category-link category-link-page">
                Shop Women's <FaArrowRight className="category-link-icon" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Men's Collection Section */}
      <div id="mens-section" ref={mensRef}>
        <motion.div 
          className="collection-section"
          variants={itemVariants}
        >
          <div className="section-header">
            <h2 className="section-title">Men's Collection</h2>
            <p className="section-subtitle">Premium clothing for the modern man</p>
          </div>
          
          <div className="products-grid">
            {displayProducts
              .filter(product => product.category.includes("Men"))
              .slice(0, 4)
              .map((product) => (
                <motion.div 
                  key={product._id}
                  className="product-card-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ProductCard product={product} />
                  
                  {/* Size and Color Options */}
                  <motion.div 
                    className="product-options"
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="product-sizes">
                      <FaRuler className="product-option-icon" />
                      <div className="size-options">
                        {product.sizes && product.sizes.map(size => (
                          <span key={size} className="size-option">{size}</span>
                        ))}
                      </div>
                    </div>
                    <div className="product-colors">
                      {product.colors && product.colors.map(color => (
                        <span 
                          key={color} 
                          className="color-option"
                          style={{ 
                            backgroundColor: color.toLowerCase(),
                            border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                          }}
                          title={color}
                        ></span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </div>
          
          <motion.div 
            className="view-more-container"
            whileHover={{ y: -5 }}
          >
            <Link to="/mens" className="view-more-button">
              View All Men's Collection <FaArrowRight className="view-more-icon" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Women's Collection Section */}
      <div id="womens-section" ref={womensRef}>
        <motion.div 
          className="collection-section"
          variants={itemVariants}
        >
          <div className="section-header">
            <h2 className="section-title">Women's Collection</h2>
            <p className="section-subtitle">Elegant designs for the modern woman</p>
          </div>
          
          <div className="products-grid">
            {displayProducts
              .filter(product => product.category.includes("Women"))
              .slice(0, 4)
              .map((product) => (
                <motion.div 
                  key={product._id}
                  className="product-card-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ProductCard product={product} />
                  
                  {/* Size and Color Options */}
                  <motion.div 
                    className="product-options"
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="product-sizes">
                      <FaRuler className="product-option-icon" />
                      <div className="size-options">
                        {product.sizes && product.sizes.map(size => (
                          <span key={size} className="size-option">{size}</span>
                        ))}
                      </div>
                    </div>
                    <div className="product-colors">
                      {product.colors && product.colors.map(color => (
                        <span 
                          key={color} 
                          className="color-option"
                          style={{ 
                            backgroundColor: color.toLowerCase(),
                            border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                          }}
                          title={color}
                        ></span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </div>
          
          <motion.div 
            className="view-more-container"
            whileHover={{ y: -5 }}
          >
            <Link to="/womens" className="view-more-button">
              View All Women's Collection <FaArrowRight className="view-more-icon" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Featured Products Section */}
      <motion.div 
        className="featured-section"
        variants={itemVariants}
      >
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked items from our latest collection</p>
        </div>
        
        <div className="products-grid">
          {displayProducts.slice(0, 4).map((product) => (
            <motion.div 
              key={product._id}
              className="product-card-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <ProductCard product={product} />
              
              {/* Size and Color Options */}
              <motion.div 
                className="product-options"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: 'auto' }}
              >
                <div className="product-sizes">
                  <FaRuler className="product-option-icon" />
                  <div className="size-options">
                    {product.sizes && product.sizes.map(size => (
                      <span key={size} className="size-option">{size}</span>
                    ))}
                  </div>
                </div>
                <div className="product-colors">
                  {product.colors && product.colors.map(color => (
                    <span 
                      key={color} 
                      className="color-option"
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                      }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trending Section */}
      <motion.div 
        className="trending-section"
        variants={itemVariants}
      >
        <div className="trending-header">
          <h2 className="trending-title">Trending Now</h2>
          <Link to="/products" className="view-all">
            View All <FaArrowRight className="view-all-icon" />
          </Link>
        </div>
        
        <div className="products-grid">
          {displayProducts.slice(4, 8).map((product) => (
            <motion.div 
              key={product._id}
              className="product-card-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <ProductCard product={product} />
              
              {/* Size and Color Options */}
              <motion.div 
                className="product-options"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: 'auto' }}
              >
                <div className="product-sizes">
                  <FaRuler className="product-option-icon" />
                  <div className="size-options">
                    {product.sizes && product.sizes.map(size => (
                      <span key={size} className="size-option">{size}</span>
                    ))}
                  </div>
                </div>
                <div className="product-colors">
                  {product.colors && product.colors.map(color => (
                    <span 
                      key={color} 
                      className="color-option"
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none'
                      }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div 
        className="newsletter-section"
        variants={itemVariants}
      >
        <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
        <p className="newsletter-description">
          Stay updated with our latest collections, exclusive offers, and fashion tips.
        </p>
        
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input 
            type="email" 
            className="newsletter-input" 
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button 
            type="submit" 
            className="newsletter-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPaperPlane />
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Home;