import React from 'react';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/api";
import { 
  FiMenu, 
  FiX, 
  FiHeart, 
  FiShoppingCart, 
  FiChevronUp, 
  FiFilter,
  FiPackage,
  FiSliders,
  FiMic,
  FiShoppingBag,
  FiArrowRight,
  FiUser,
  FiSearch,
  FiGrid,
  FiList
} from "react-icons/fi";
import { 
  BsShop,
  BsCart3,
  BsBag,
  BsBootstrap,
  BsBox
} from "react-icons/bs";
import { FaFilter, FaTshirt, FaRedhat, FaShoePrints } from 'react-icons/fa';
import { GiTrousers } from 'react-icons/gi';
import mensCollectionImg from '/images/mens-collection.jpg';

// Sort options
const sortOptions = [
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" }
];

// Categories with proper icons and paths
const categories = [
  { id: "all", name: "All Products", icon: FaTshirt, path: "/mens" },
  { id: "shirts", name: "Shirts", icon: FaTshirt, path: "/mens/shirts" },
  { id: "pants", name: "Pants", icon: GiTrousers, path: "/mens/pants" },
  { id: "shoes", name: "Shoes", icon: FaShoePrints, path: "/mens/shoes" },
  { id: "accessories", name: "Accessories", icon: FaRedhat, path: "/mens/accessories" }
];

// Add badge types and their styles
const badges = {
  new: { text: "New", color: "bg-green-500" },
  trending: { text: "Trending", color: "bg-blue-500" },
  sale: { text: "Sale", color: "bg-red-500" }
};

// Enhance sample products with badges
const sampleProducts = [
  {
    _id: 1,
    name: "Men's Classic Fit Shirt",
    category: "Men's Shirts",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    hoverImage: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    rating: 4.5,
    description: "A classic fit shirt perfect for any occasion.",
    badge: "new"
  },
  {
    _id: 2,
    name: "Men's Denim Jacket",
    category: "Men's Jackets",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    hoverImage: "https://images.unsplash.com/photo-1591047139835-8da266e72076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    rating: 4.3,
    description: "A stylish denim jacket for a casual look.",
    badge: "trending"
  },
  // ... rest of the sample products ...
];

// Add these new imports for SVG shapes
const BlobShape = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <path
      fill="currentColor"
      d="M42.7,-62.9C50.9,-53.3,50.1,-34.9,51.7,-19.2C53.4,-3.5,57.4,9.4,55.7,22.9C54,36.4,46.5,50.4,34.4,57.7C22.3,65,5.6,65.5,-12.3,64.6C-30.2,63.7,-49.3,61.3,-58.9,50.2C-68.5,39,-68.7,19,-65.1,2.1C-61.5,-14.9,-54.1,-28.7,-43.4,-38.2C-32.7,-47.7,-18.7,-52.8,-0.6,-52C17.5,-51.2,34.5,-72.5,42.7,-62.9Z"
      transform="translate(100 100)"
    />
  </svg>
);

// AI Style Advisor Questions
const styleQuestions = [
  {
    id: 1,
    question: "What's your preferred style?",
    options: ["Casual", "Business", "Streetwear", "Athletic"]
  },
  {
    id: 2,
    question: "What colors do you usually wear?",
    options: ["Neutrals", "Bold Colors", "Earth Tones", "Pastels"]
  },
  {
    id: 3,
    question: "What's your typical budget per item?",
    options: ["Under $50", "$50-$100", "$100-$200", "$200+"]
  }
];

// Spin rewards
const spinRewards = [
  "10% OFF",
  "15% OFF",
  "20% OFF",
  "FREE SHIPPING",
  "5% OFF",
  "BUY 1 GET 1 50% OFF"
];

// Modal component
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        {children}
      </div>
    </div>
  );
};

const Mens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    priceRange: [0, 1000],
    brand: []
  });
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStyleAdvisorOpen, setIsStyleAdvisorOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [styleAnswers, setStyleAnswers] = useState([]);
  const [styleRecommendations, setStyleRecommendations] = useState(null);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState(null);
  const [isVoiceFilterActive, setIsVoiceFilterActive] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productList = await getAllProducts();
        
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

    // Scroll handler for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Show spinner popup after 5 seconds
    const timer = setTimeout(() => {
      if (!localStorage.getItem('spinnerShown')) {
        setIsSpinnerOpen(true);
        localStorage.setItem('spinnerShown', 'true');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVoiceFilterActive) {
      // Simulating voice recognition
      const timer = setTimeout(() => {
        setVoiceQuery("black t-shirt");
        setIsVoiceFilterActive(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVoiceFilterActive]);

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
      product.category.toLowerCase().includes(activeCategory.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Sort products
  const sortProducts = (products) => {
    const sortedProducts = [...products];
    
    switch (selectedSort) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "popular":
        return sortedProducts.sort((a, b) => b.reviews - a.reviews);
      default:
        return sortedProducts;
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

  // Use sample data if no products are fetched
  const filteredProducts = sortProducts(filterProducts()).length > 0 
    ? sortProducts(filterProducts()) 
    : sampleProducts;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle adding to cart
  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    // Show cart preview
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  // Handle style advisor
  const handleStyleAnswer = (answer) => {
    setStyleAnswers([...styleAnswers, answer]);
    if (currentQuestion < styleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Mock AI recommendation based on answers
      setTimeout(() => {
        setStyleRecommendations({
          style: styleAnswers[0],
          colors: styleAnswers[1],
          products: sampleProducts.slice(0, 4)
        });
      }, 1500);
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 5; // Number of full rotations
    const duration = 4000; // 4 seconds
    const finalAngle = (spins * 360) + (Math.random() * 360);
    
    const wheel = document.querySelector('.spin-wheel');
    wheel.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0, 0.2, 1)`;
    wheel.style.transform = `rotate(${finalAngle}deg)`;

    setTimeout(() => {
      setIsSpinning(false);
      const rewardIndex = Math.floor(Math.random() * spinRewards.length);
      setReward(spinRewards[rewardIndex]);
    }, duration);
  };

  const startVoiceFilter = () => {
    setIsVoiceFilterActive(true);
    // Mock voice recognition
    setTimeout(() => {
      setVoiceQuery("Show me blue shirts under $100");
      setIsVoiceFilterActive(false);
    }, 2000);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleVoiceFilter = () => {
    setIsVoiceFilterActive(true);
    // Add voice recognition logic here
  };

  // Modal handlers
  const showModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-16">
      {/* Enhanced Hero Section */}
      <motion.section 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/uncle.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        {/* Animated Hero Overlay Section (moved above main content) */}
        <motion.div
          className="max-w-7xl mx-auto px-4 flex items-center justify-between py-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Left: Heading */}
          <motion.div
            className="text-left"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FF3C00] mb-2">
              Blue Banana Athletics<br />
              New Collection
            </h2>
          </motion.div>
          {/* Right: Button */}
          <motion.div
            className="flex items-center"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
                <Link
                  to="/mens/shirts"
                  className="px-10 py-3 border-2 border-[#FF3C00] text-[#FF3C00] text-lg font-semibold rounded-full bg-transparent hover:bg-[#FF3C00] hover:text-white transition-colors duration-300 inline-block"
                >
                  SEE COLLECTION
                </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                  <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
      </div>
        </motion.div>
      </motion.section>

      {/* Blue Banana Athletics New Collection Section (below video) */}
      <motion.section
        className="relative w-full bg-transparent mt-12"
        style={{
          backgroundImage: "url('/images/mens-collection.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-8">
          <div className="flex-1 text-left w-full md:w-auto mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FF3C00]">
              Blue Banana Athletics<br />
              New Collection
            </h2>
          </div>
          <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row items-center justify-end gap-6">
                      <Link
                        to="/mens/shirts"
                        className="px-10 py-3 border-2 border-[#FF3C00] text-[#FF3C00] text-lg font-semibold rounded-full bg-transparent hover:bg-[#FF3C00] hover:text-white transition-colors duration-300 mb-6 md:mb-0 inline-block"
                      >
                        SEE COLLECTION
                      </Link>
            <motion.img
              src="/images/mens-collection.jpg"
              alt="Blue Banana Athletics Collection"
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl shadow-lg border-4 border-[#FF3C00] bg-white"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
        </div>
      </motion.section>

      {/* Comunidad Blue Banana Instagram Community Section */}
      <motion.section
        className="w-full bg-[#2C3A42] py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 uppercase tracking-wide">COMUNIDAD BLUE BANANA</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18
                }
              }
            }}
          >
            {/* Card 1 */}
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-lg group"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8, rotate: -8 },
                visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } }
              }}
            >
              <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80" alt="@albaperarnau" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white">
                  <span className="font-semibold">@albaperarnau</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200 text-sm">
                  Instagram
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-5 h-5'><rect width='20' height='20' x='2' y='2' rx='5' stroke='currentColor' strokeWidth='2'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg>
                </div>
              </div>
            </motion.div>
            {/* Card 2 */}
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-lg group"
              variants={{
                hidden: { opacity: 0, x: 80, scale: 0.7, rotate: 8 },
                visible: { opacity: 1, x: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } }
              }}
            >
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80" alt="@joanmarcpares" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white">
                  <span className="font-semibold">@joanmarcpares</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200 text-sm">
                  Instagram
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-5 h-5'><rect width='20' height='20' x='2' y='2' rx='5' stroke='currentColor' strokeWidth='2'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg>
                </div>
              </div>
            </motion.div>
            {/* Card 3 */}
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-lg group"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8, rotate: 8 },
                visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } }
              }}
            >
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80" alt="@pepejimenezz" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white">
                  <span className="font-semibold">@pepejimenezz</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200 text-sm">
                  Instagram
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-5 h-5'><rect width='20' height='20' x='2' y='2' rx='5' stroke='currentColor' strokeWidth='2'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg>
                </div>
              </div>
                  </motion.div>
            {/* Card 4 */}
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-lg group"
              variants={{
                hidden: { opacity: 0, x: -80, scale: 0.7, rotate: -8 },
                visible: { opacity: 1, x: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } }
              }}
            >
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80" alt="@danieldiazur" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white">
                  <span className="font-semibold">@danieldiazur</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200 text-sm">
                  Instagram
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-5 h-5'><rect width='20' height='20' x='2' y='2' rx='5' stroke='currentColor' strokeWidth='2'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Featured Categories Section --- */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left tracking-wide mb-6 md:mb-0">FEATURED CATEGORIES</h2>
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <button className="px-6 py-2 rounded-full bg-[#223136] text-white font-semibold text-lg focus:outline-none">MAN</button>
              <span className="text-gray-400 text-xl">—</span>
              <button className="px-6 py-2 rounded-full bg-gray-100 text-[#223136] font-semibold text-lg focus:outline-none">WOMEN</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* T-SHIRTS */}
            <motion.div
              className="relative rounded-lg overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="T-SHIRTS" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-semibold tracking-widest mb-4" style={{ letterSpacing: '0.15em' }}>T-SHIRTS</span>
              </div>
            </motion.div>
            {/* SWEATSHIRTS */}
              <motion.div
              className="relative rounded-lg overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" alt="SWEATSHIRTS" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-semibold tracking-widest mb-4" style={{ letterSpacing: '0.15em' }}>SWEATSHIRTS</span>
                <Link to="/mens/shirts" className="mt-2 px-6 py-2 border border-white text-white font-semibold rounded transition-colors duration-200 hover:bg-white hover:text-black bg-opacity-70 inline-block">
                  SEE MORE
                </Link>
                          </div>
            </motion.div>
            {/* HOODIES */}
            <motion.div
              className="relative rounded-lg overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80" alt="HOODIES" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-semibold tracking-widest mb-4" style={{ letterSpacing: '0.15em' }}>HOODIES</span>
              </div>
            </motion.div>
            {/* JACKETS */}
            <motion.div
              className="relative rounded-lg overflow-hidden group shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="JACKETS" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-semibold tracking-widest mb-4" style={{ letterSpacing: '0.15em' }}>JACKETS</span>
              </div>
            </motion.div>
                        </div>
                      </div>
      </section>

      {/* --- Adventure Pass Section --- */}
      <motion.section
        className="w-full relative flex flex-col items-center justify-center overflow-hidden py-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ minHeight: '320px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 w-full h-full">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Adventure 1" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" alt="Adventure 2" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Adventure 3" className="w-full h-full object-cover grayscale" />
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" alt="Adventure 4" className="w-full h-full object-cover grayscale" />
                          </div>
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="relative flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest text-center mb-6" style={{ lineHeight: 1.1 }}>
              ADVENTURE <span className="relative inline-block"><span className="bg-yellow-400 px-2 text-black">PASS</span></span>
            </h2>
            <Link to="/mens" className="mt-2 px-10 py-3 border-2 border-white text-white text-lg font-semibold rounded-full bg-transparent hover:bg-white hover:text-black transition-colors duration-300 inline-block">
              ÚNETE AL CLUB
            </Link>
                        </div>
                      </div>
      </motion.section>

      {/* --- Store Interior Section --- */}
      <motion.section
        className="relative w-full min-h-[600px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col justify-between py-16">
          <div className="flex flex-row justify-between items-start w-full">
            {/* Top Left: Store Address */}
            <div className="text-left">
              <h3 className="text-white text-lg md:text-xl font-semibold tracking-widest uppercase mb-2">Cordoba · Gongora Street, 4</h3>
              <h2 className="text-white text-2xl md:text-3xl font-bold uppercase">Blue Banana Store</h2>
            </div>
            {/* Top Right: Explore Button */}
            <div>
              <Link to="/mens" className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                Explore the stores
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-between items-end w-full mt-auto">
            {/* Bottom Left: Discover Text */}
            <div className="mb-4">
              <span className="text-white text-base md:text-lg font-semibold tracking-widest uppercase">Discover the style<br />of each store</span>
            </div>
            {/* Bottom Right: Our Stores Thumbnails */}
            <div className="flex flex-col items-end">
              <span className="text-white text-base md:text-lg font-semibold tracking-widest uppercase mb-2">Our Stores</span>
              <div className="flex gap-2">
                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80" alt="Store 1" className="w-16 h-16 object-cover rounded shadow-lg border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=80" alt="Store 2" className="w-16 h-16 object-cover rounded shadow-lg border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80" alt="Store 3" className="w-16 h-16 object-cover rounded shadow-lg border-2 border-white" />
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" alt="Store 4" className="w-16 h-16 object-cover rounded shadow-lg border-2 border-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- Advanced Animated Scroll Sections --- */}
      {/* 1. Parallax Banner Section */}
      <motion.section className="w-full h-[60vh] relative flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <motion.img src="/images/mens-collection.jpg" alt="Parallax Banner" className="absolute w-full h-full object-cover opacity-40" style={{ y: [0, 60, 0] }} animate={{ y: [0, 60, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }} />
        <motion.h2 className="relative z-10 text-5xl font-extrabold text-white drop-shadow-lg" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>Futuristic Fashion</motion.h2>
      </motion.section>

      {/* 2. 3D Tilt Product Cards */}
      <motion.section className="w-full py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1,2,3,4].map((i) => (
            <motion.div key={i} className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center cursor-pointer" whileHover={{ rotateY: 10, scale: 1.05, boxShadow: '0 8px 32px #0004' }} transition={{ type: 'spring', stiffness: 200 }}>
              <img src={mensCollectionImg} alt="Tech Product" className="w-40 h-40 object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold mb-2">Tech Wear {i}</h3>
              <p className="text-gray-600 mb-4">Next-gen smart clothing with built-in sensors and AR features.</p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition" onClick={() => showModal(<div><h2 className='text-xl font-bold mb-2'>AR Preview</h2><img src={mensCollectionImg} alt='AR Preview' className='w-full rounded-lg mb-4'/><p>AR Preview coming soon!</p></div>)}>Try AR Preview</button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. Interactive Product Carousel */}
      <motion.section className="w-full py-20 bg-gradient-to-l from-blue-900 via-blue-700 to-blue-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">AI-Powered Recommendations</h2>
          <motion.div className="flex gap-8 overflow-x-auto pb-4">
            {[1,2,3,4,5].map((i) => (
              <motion.div key={i} className="min-w-[300px] bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center" whileHover={{ scale: 1.07 }}>
                <img src={mensCollectionImg} alt="AI Product" className="w-32 h-32 object-cover rounded-lg mb-3" />
                <h4 className="font-semibold mb-1">AI Pick #{i}</h4>
                <p className="text-gray-700 text-sm">Handpicked for you by our AI stylist.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 4. Animated Counters Section */}
      <motion.section className="w-full py-16 bg-black text-white flex flex-col items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <h2 className="text-2xl font-bold mb-8">Our Impact</h2>
        <div className="flex gap-16">
          {[{label:'Smart Outfits',end:1200},{label:'AR Try-Ons',end:800},{label:'Satisfied Users',end:5000},{label:'Tech Awards',end:12}].map((item,i)=>(
            <motion.div key={i} className="flex flex-col items-center">
              <motion.span className="text-4xl font-extrabold" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.7, delay: i*0.2 }}>{item.end}+</motion.span>
              <span className="text-lg mt-2">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. Product Configurator Section */}
      <motion.section className="w-full py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <h2 className="text-3xl font-bold text-white mb-8">Customize Your Look</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
            <img src={mensCollectionImg} alt="Configurator" className="w-32 h-32 object-cover rounded-lg mb-3" />
            <label className="mb-2 font-semibold">Choose Color</label>
            <select className="mb-4 px-4 py-2 rounded border">
              <option>Black</option><option>Blue</option><option>White</option><option>Red</option>
            </select>
            <label className="mb-2 font-semibold">Size</label>
            <select className="mb-4 px-4 py-2 rounded border">
              <option>M</option><option>L</option><option>XL</option><option>XXL</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition" onClick={() => showModal(<div><h2 className='text-xl font-bold mb-2'>Preview</h2><img src={mensCollectionImg} alt='Preview' className='w-full rounded-lg mb-4'/><p>Preview of your custom look coming soon!</p></div>)}>Preview</button>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white text-lg max-w-md">Use our advanced configurator to design your own techwear outfit. Instantly preview in 3D and AR!</p>
          </div>
        </div>
      </motion.section>

      {/* 6. AR Preview Section */}
      <motion.section className="w-full py-20 bg-gradient-to-t from-blue-900 via-blue-700 to-blue-900 flex flex-col items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <h2 className="text-3xl font-bold text-white mb-8">Augmented Reality Preview</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img src={mensCollectionImg} alt="AR Preview" className="w-60 h-80 object-cover rounded-xl shadow-2xl" />
          <div className="text-white max-w-md">
            <p className="mb-4">See how our latest collection looks on you in real time using your phone's camera. Try before you buy with our AR preview!</p>
            <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-100 transition" onClick={() => showModal(<div><h2 className='text-xl font-bold mb-2'>AR Preview</h2><img src={mensCollectionImg} alt='AR Preview' className='w-full rounded-lg mb-4'/><p>AR Preview coming soon!</p></div>)}>Launch AR</button>
          </div>
        </div>
      </motion.section>

      {/* 7. AI Style Quiz Section */}
      <motion.section className="w-full py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <h2 className="text-3xl font-bold text-white mb-8">AI Style Quiz</h2>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full flex flex-col items-center">
          <p className="mb-6 text-lg text-gray-700">Answer a few questions and let our AI recommend your perfect outfit.</p>
          <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition" onClick={() => showModal(<div><h2 className='text-xl font-bold mb-2'>AI Style Quiz</h2><p>Quiz functionality coming soon!</p></div>)}>Start Quiz</button>
        </div>
      </motion.section>

      {/* 8. Animated Infinite Logo Scroll */}
      <motion.section className="w-full py-12 bg-black overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <motion.div className="flex items-center" animate={{ x: [0, -600, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          {[...Array(12)].map((_, i) => (
            <img key={i} src={mensCollectionImg} alt="Brand Logo" className="mx-8 w-20 h-20 object-contain grayscale hover:grayscale-0 transition duration-300" />
          ))}
        </motion.div>
      </motion.section>

      <Modal open={modalOpen} onClose={closeModal}>{modalContent}</Modal>
    </div>
  );
};

export default Mens;