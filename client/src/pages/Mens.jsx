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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Men's Collection</h1>
            <p className="text-xl text-blue-100">Discover our latest styles and trends</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ x: 5 }}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="mr-3 text-blue-600">{category.icon}</span>
                    <span>{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <button
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <FaSort className="text-blue-600" />
                  <span>Sort by: {sortOption.replace("-", " ")}</span>
                  <FaChevronDown className={`transition-transform ${sortMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {sortMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  >
                    {["latest", "price-low", "price-high", "name"].map((option) => (
                      <button
                        key={option}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          sortOption === option ? "text-blue-600" : ""
                        }`}
                        onClick={() => handleSortChange(option)}
                      >
                        {option.replace("-", " ")}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <Link to={`/product/${product._id}`}>
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4">
                            <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-600">${product.price}</span>
                          <div className="flex items-center text-yellow-400">
                            <span className="mr-1">{product.rating}</span>
                            <span>★</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mens;