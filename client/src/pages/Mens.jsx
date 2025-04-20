import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { 
  FaFilter, 
  FaSort, 
  FaTshirt, 
  FaShoppingBag, 
  FaShoePrints,
  FaChevronDown,
  FaSpinner
} from "react-icons/fa";
import "./Mens.css";

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState("latest");
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/products");
        const productList = Array.isArray(res.data)
          ? res.data
          : res.data.products;
        
        // Filter products for men's category
        const mensProducts = productList.filter(
          (product) => product.category && product.category.toLowerCase().includes("men")
        );
        
        setProducts(mensProducts);
      } catch (err) {
        console.error("Error fetching men's products:", err);
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
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
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
    setSortMenuOpen(false);
  };

  // Handle load more
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate loading more products
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  // Filter categories
  const categories = [
    { id: "all", name: "All Products", icon: <FaShoppingBag /> },
    { id: "shirts", name: "Shirts", icon: <FaTshirt /> },
    { id: "pants", name: "Pants", icon: <FaTshirt /> },
    { id: "shoes", name: "Shoes", icon: <FaShoePrints /> },
    { id: "accessories", name: "Accessories", icon: <FaShoppingBag /> }
  ];

  // Sample product data for men's clothing
  const sampleProducts = [
    {
      _id: 1,
      name: "Men's Classic Fit Shirt",
      category: "Men's Shirts",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      rating: 4.5,
      description: "A classic fit shirt perfect for any occasion."
    },
    {
      _id: 2,
      name: "Men's Denim Jacket",
      category: "Men's Jackets",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
      rating: 4.3,
      description: "A stylish denim jacket for a casual look."
    },
    {
      _id: 3,
      name: "Men's Slim Fit Jeans",
      category: "Men's Pants",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      rating: 4.4,
      description: "Slim fit jeans for a modern look."
    },
    {
      _id: 4,
      name: "Men's Casual T-Shirt",
      category: "Men's Shirts",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      rating: 4.2,
      description: "A comfortable casual t-shirt for everyday wear."
    },
    {
      _id: 5,
      name: "Men's Formal Suit",
      category: "Men's Formal",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.8,
      description: "A sophisticated suit for formal occasions."
    },
    {
      _id: 6,
      name: "Men's Leather Shoes",
      category: "Men's Shoes",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.6,
      description: "Classic leather shoes for a polished look."
    },
    {
      _id: 7,
      name: "Men's Wool Sweater",
      category: "Men's Shirts",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1638462922859-336656c3a25e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      rating: 4.5,
      description: "A warm wool sweater for cold weather."
    },
    {
      _id: 8,
      name: "Men's Leather Belt",
      category: "Men's Accessories",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1624222247344-550fb60fe8ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      rating: 4.4,
      description: "A classic leather belt to complete your outfit."
    }
  ];

  // Use sample data if no products are fetched
  const filteredProducts = sortProducts(filterProducts()).length > 0 
    ? sortProducts(filterProducts()) 
    : sampleProducts;

  return (
    <div className="mens-container">
      {/* Header Section */}
      <motion.div 
        className="mens-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
          alt="Men's Collection" 
          className="mens-header-image"
        />
        <div className="mens-header-content">
          <motion.h1 
            className="mens-title"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Men's Collection
          </motion.h1>
          <motion.p 
            className="mens-subtitle"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover our exclusive collection for men featuring premium quality clothing and accessories.
          </motion.p>
        </div>
      </motion.div>

      {/* Filter Section */}
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
        
        <div className={`sort-dropdown ${sortMenuOpen ? 'open' : ''}`}>
          <motion.button 
            className="sort-button"
            onClick={() => setSortMenuOpen(!sortMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSort style={{ marginRight: '0.5rem' }} />
            Sort By
            <FaChevronDown className="sort-icon" style={{ marginLeft: '0.5rem' }} />
          </motion.button>
          
          {sortMenuOpen && (
            <AnimatePresence>
              <motion.div 
                className="sort-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className={`sort-option ${sortOption === 'latest' ? 'active' : ''}`}
                  onClick={() => handleSortChange('latest')}
                >
                  Latest
                </div>
                <div 
                  className={`sort-option ${sortOption === 'price-low' ? 'active' : ''}`}
                  onClick={() => handleSortChange('price-low')}
                >
                  Price: Low to High
                </div>
                <div 
                  className={`sort-option ${sortOption === 'price-high' ? 'active' : ''}`}
                  onClick={() => handleSortChange('price-high')}
                >
                  Price: High to Low
                </div>
                <div 
                  className={`sort-option ${sortOption === 'name' ? 'active' : ''}`}
                  onClick={() => handleSortChange('name')}
                >
                  Name: A to Z
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Products Section */}
      {loading ? (
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSpinner className="empty-icon loading-spinner" />
          <h2 className="empty-title">Loading Products</h2>
          <p className="empty-text">Please wait while we fetch the latest men's collection for you.</p>
        </motion.div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaShoppingBag className="empty-icon" />
              <h2 className="empty-title">No Products Found</h2>
              <p className="empty-text">
                We couldn't find any products in this category. Check back later for new arrivals or try a different category.
              </p>
              <Link to="/" className="empty-button">
                Explore Other Categories
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              className="products-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {filteredProducts.length > 0 && (
            <motion.div 
              className="load-more-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button 
                className="load-more-button"
                onClick={handleLoadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <FaSpinner className="loading-spinner" style={{ marginRight: '0.5rem' }} />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Products
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Mens;