import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { 
  FaFilter, 
  FaHeart, 
  FaTshirt, 
  FaGem, 
  FaShoePrints,
  FaChevronDown,
  FaSpinner,
  FaArrowRight
} from "react-icons/fa";
import "./Womens.css";

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("latest");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedColors, setSelectedColors] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products");
        const productList = Array.isArray(res.data)
          ? res.data
          : res.data.products;
        
        // Filter products for women's category
        const womensProducts = productList.filter(
          (product) => product.category && product.category.toLowerCase().includes("women")
        );
        
        setProducts(womensProducts);
      } catch (err) {
        console.error("Error fetching women's products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

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

  // Filter products by category
  const filterProducts = () => {
    if (activeCategory === "all") return products;
    return products.filter(product => 
      product.category && 
      product.category.toLowerCase().includes(activeCategory.toLowerCase())
    );
  };

  // Sort products
  const sortProducts = (products) => {
    const sortedProducts = [...products];
    
    switch (sortOption) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "name":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedProducts;
    }
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Handle color selection
  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading more products
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  // Mock categories for demonstration
  const categories = [
    { id: "all", name: "All Products", icon: <FaHeart /> },
    { id: "dresses", name: "Dresses", icon: <FaTshirt /> },
    { id: "tops", name: "Tops", icon: <FaTshirt /> },
    { id: "shoes", name: "Shoes", icon: <FaShoePrints /> },
    { id: "accessories", name: "Accessories", icon: <FaGem /> }
  ];

  // Sample product data for women's clothing
  const sampleProducts = [
    {
      _id: 1,
      name: "Floral Summer Dress",
      category: "Women's Dresses",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      rating: 4.7,
      description: "A beautiful floral dress perfect for summer."
    },
    {
      _id: 2,
      name: "Women's Denim Jacket",
      category: "Women's Jackets",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.5,
      description: "A stylish denim jacket for a casual look."
    },
    {
      _id: 3,
      name: "High-Waisted Jeans",
      category: "Women's Pants",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.4,
      description: "Comfortable high-waisted jeans for everyday wear."
    },
    {
      _id: 4,
      name: "Silk Blouse",
      category: "Women's Tops",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 4.3,
      description: "An elegant silk blouse for a sophisticated look."
    },
    {
      _id: 5,
      name: "Evening Gown",
      category: "Women's Dresses",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=708&q=80",
      rating: 4.8,
      description: "A stunning evening gown for special occasions."
    },
    {
      _id: 6,
      name: "Leather Ankle Boots",
      category: "Women's Shoes",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      rating: 4.6,
      description: "Stylish leather ankle boots to complete your outfit."
    },
    {
      _id: 7,
      name: "Cashmere Sweater",
      category: "Women's Tops",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 4.5,
      description: "A luxurious cashmere sweater for cold weather."
    },
    {
      _id: 8,
      name: "Statement Necklace",
      category: "Women's Accessories",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.4,
      description: "A bold statement necklace to elevate any outfit."
    }
  ];

  // Use sample data if no products are fetched
  const filteredProducts = sortProducts(filterProducts()).length > 0 
    ? sortProducts(filterProducts()) 
    : sampleProducts;

  // Available colors for filter
  const colors = ['Black', 'White', 'Red', 'Blue', 'Pink', 'Green', 'Purple'];

  return (
    <div className="womens-container">
      {/* Hero Banner */}
      <motion.div 
        className="womens-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="womens-hero-content">
          <motion.h1 
            className="womens-hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Women's Collection
          </motion.h1>
          <motion.p 
            className="womens-hero-subtitle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore our exclusive collection for women featuring elegant designs and premium quality.
          </motion.p>
          <motion.div 
            className="womens-hero-cta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a 
              href="#products" 
              className="womens-hero-button"
            >
              Shop Now
            </a>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="womens-hero-decoration-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>
        
        <motion.div 
          className="womens-hero-decoration-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        ></motion.div>
      </motion.div>

      <div className="womens-content" id="products">
        {/* Category Navigation */}
        <motion.div 
          className="filter-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="filter-options">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ marginRight: '0.5rem' }}>{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filter Toggle Button */}
        <motion.div 
          className="womens-filter-header"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="womens-filter-title">
            {activeCategory === 'all' ? 'All Products' : categories.find(c => c.id === activeCategory)?.name}
          </h2>
          <motion.button
            className="womens-filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter className="womens-filter-icon" />
            <span>Filters</span>
          </motion.button>
        </motion.div>

        {/* Expandable Filters */}
        <motion.div
          className="womens-filters"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: showFilters ? 'auto' : 0,
            opacity: showFilters ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {showFilters && (
            <div className="womens-filters-content">
              <div className="womens-filters-grid">
                <div className="womens-filter-group">
                  <label className="womens-filter-label">Sort By</label>
                  <select 
                    className="womens-filter-select"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="latest">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div className="womens-filter-group">
                  <label className="womens-filter-label">Price Range</label>
                  <div className="womens-price-range">
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="womens-filter-input" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    />
                    <span>-</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="womens-filter-input" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    />
                  </div>
                </div>
                <div className="womens-filter-group">
                  <label className="womens-filter-label">Color</label>
                  <div className="womens-color-filters">
                    {colors.map(color => (
                      <button 
                        key={color}
                        className={`womens-color-button ${selectedColors.includes(color) ? 'womens-color-selected' : ''}`}
                        onClick={() => toggleColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="womens-filters-actions">
                <button className="womens-apply-filters">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Loading state */}
        {loading ? (
          <motion.div 
            className="womens-loading"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="womens-spinner">
              <div className="womens-spinner-outer"></div>
              <div className="womens-spinner-middle"></div>
              <div className="womens-spinner-inner"></div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Product Grid with animations */}
            {filteredProducts.length === 0 ? (
              <motion.div 
                className="womens-empty-state"
                variants={slideUp}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="womens-empty-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                >
                  <FaHeart className="womens-empty-icon-svg" />
                </motion.div>
                <h3 className="womens-empty-title">No products found</h3>
                <p className="womens-empty-message">
                  We couldn't find any products in this category. Check back later for new arrivals or try a different category.
                </p>
                <motion.button 
                  className="womens-empty-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Other Categories
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="womens-products-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product._id} 
                    className="womens-product-item"
                    variants={itemVariants}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <motion.div 
                className="womens-load-more"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <motion.button 
                  className="womens-load-more-button"
                  onClick={handleLoadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <FaSpinner className="womens-loading-icon" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* Summer Collection Banner */}
            <motion.div 
              className="womens-promo-banner"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <div className="womens-promo-content">
                <div className="womens-promo-text">
                  <motion.h3 
                    className="womens-promo-title"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Summer Collection 2025
                  </motion.h3>
                  <motion.p 
                    className="womens-promo-description"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Discover our new summer styles with vibrant colors and comfortable designs perfect for the season
                  </motion.p>
                  <motion.button 
                    className="womens-promo-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Shop Now
                  </motion.button>
                </div>
                <div className="womens-promo-badge">
                  <motion.div 
                    className="womens-promo-badge-circle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.7, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <span>New Arrivals</span>
                  </motion.div>
                </div>
                
                {/* Decorative circles */}
                <motion.div 
                  className="womens-promo-circle womens-promo-circle-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                ></motion.div>
                <motion.div 
                  className="womens-promo-circle womens-promo-circle-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Featured Categories */}
            <motion.div 
              className="womens-featured-categories"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="womens-category-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="womens-category-icon-wrapper">
                  <FaTshirt className="womens-category-icon-svg" />
                </div>
                <h3 className="womens-category-title">Dresses</h3>
                <p className="womens-category-description">Elegant designs for every occasion</p>
                <button className="womens-category-link">
                  View Collection
                </button>
              </motion.div>
              
              <motion.div 
                className="womens-category-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="womens-category-icon-wrapper">
                  <FaShoePrints className="womens-category-icon-svg" />
                </div>
                <h3 className="womens-category-title">Footwear</h3>
                <p className="womens-category-description">Comfortable and stylish shoes</p>
                <button className="womens-category-link">
                  View Collection
                </button>
              </motion.div>
              
              <motion.div 
                className="womens-category-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="womens-category-icon-wrapper">
                  <FaGem className="womens-category-icon-svg" />
                </div>
                <h3 className="womens-category-title">Accessories</h3>
                <p className="womens-category-description">Complete your look with our accessories</p>
                <button className="womens-category-link">
                  View Collection
                </button>
              </motion.div>
            </motion.div>

            {/* Newsletter subscription */}
            <motion.div 
              className="womens-newsletter"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }}
            >
              <div className="womens-newsletter-content">
                <h3 className="womens-newsletter-title">Join Our Community</h3>
                <p className="womens-newsletter-description">
                  Subscribe to get early access to new collections, exclusive offers and style tips
                </p>
                <div className="womens-newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="womens-newsletter-input"
                  />
                  <motion.button 
                    className="womens-newsletter-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
                <p className="womens-newsletter-disclaimer">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Womens;