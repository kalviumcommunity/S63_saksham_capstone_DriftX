import React from 'react';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { 
  BiFilterAlt,
  BiGridAlt,
  BiShoppingBag,
  BiHeart,
  BiChevronDown,
  BiLoader,
  BiRightArrowAlt,
  BiCloset,
  BiPurchaseTag,
  BiShoppingBag as BiCart
} from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

SwiperCore.use([Parallax, Pagination, Navigation]);

// Move image arrays to top-level scope so all components can access them
const luxuryCategoryImages = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
];
const trendingImages = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
];
const occasionImages = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
];
const customerFavImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
];
const lookbookImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
];
const instagramImages = [
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
];

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedColors, setSelectedColors] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modal, setModal] = useState(null);

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
    if (selectedCategory === "all") return products;
    return products.filter(product => 
      product.category && 
      product.category.toLowerCase().includes(selectedCategory.toLowerCase())
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
    { id: "all", name: "All", icon: BiGridAlt },
    { id: "dresses", name: "Dresses", icon: BiCloset },
    { id: "skirts", name: "Skirts", icon: BiShoppingBag },
    { id: "accessories", name: "Accessories", icon: BiPurchaseTag },
    { id: "shoes", name: "Shoes", icon: BiCart },
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

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/chunnu.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Women's Collection
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl px-4"
          >
            Explore our elegant selection of women's fashion
          </motion.p>
        </div>
      </div>

      {/* --- BEGIN ULTRA-MODERN WOMEN'S PAGE SECTIONS --- */}
      <HeroParallaxSection />
      <LuxuryCategoriesShowcase />
      <BigSaleCountdownSection />
      <DesignerBrandsTicker />
      <ShopByOccasionTilt />
      <CustomerFavoritesMasonry />
      <LookbookStyleInspiration />
      <InstagramShoppableFeed />
      <LuxuryNewsletterSection />
      {/* --- END ULTRA-MODERN WOMEN'S PAGE SECTIONS --- */}

      {/* Categories and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-gray-700 text-white'
                    : 'bg-[#2D2D2D] text-gray-300 hover:bg-gray-700'
                } transition-colors duration-300`}
              >
                <category.icon className="text-lg" />
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Filter Button */}
          <button
            onClick={toggleFilter}
            className="flex items-center space-x-2 px-4 py-2 bg-[#2D2D2D] text-gray-300 rounded-full hover:bg-gray-700 transition-colors duration-300"
          >
            <BiFilterAlt />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#2D2D2D] p-6 rounded-lg mb-8"
          >
            <h3 className="text-white font-semibold mb-4">Price Range</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-gray-300 mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#2D2D2D] rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">${product.price}</p>
                <button className="w-full bg-gray-700 text-white py-2 rounded-full hover:bg-gray-600 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

// 1. HeroParallaxSection
function HeroParallaxSection() {
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [typed, setTyped] = useState("");
  const fullText = "DriftX Women";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      setTyped((prev) => prev + fullText[i]);
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax values
  const bgTranslate = scrollY * 0.18;
  const headingTranslate = scrollY * 0.10;

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        ref={bgRef}
        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80"
        alt="DriftX Women"
        className="absolute inset-0 w-full h-full object-cover object-top brightness-90 z-0 pointer-events-none"
        style={{
          filter: 'grayscale(0.1) contrast(1.1)',
          y: bgTranslate,
        }}
        animate={{ y: bgTranslate }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-10 pointer-events-none" />
      <div className="relative z-20 text-center space-y-6 pt-32 pb-16">
        <motion.h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-pink-600 drop-shadow-lg"
          style={{ y: headingTranslate }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: headingTranslate }}
          transition={{ duration: 1, type: "spring", stiffness: 60 }}
        >
          <span className="inline-block animate-typing">{typed}</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-700 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Discover timeless fashion crafted for you.
        </motion.p>
        <motion.button
          className="mt-4 px-8 py-3 rounded-full bg-pink-500 text-white font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 relative overflow-hidden"
          whileHover={{ scale: 1.06, boxShadow: "0 0 0 8px #f9a8d4aa" }}
          animate={{ boxShadow: [
            "0 0 0 0 #f9a8d4aa",
            "0 0 0 12px #f9a8d400",
            "0 0 0 0 #f9a8d4aa"
          ] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Explore Collection
        </motion.button>
        <motion.div
          className="flex justify-center mt-10"
          animate={{ y: [0, 16, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-4xl text-pink-400">↓</span>
        </motion.div>
      </div>
    </motion.section>
  );
}

// 2. LuxuryCategoriesShowcase
function LuxuryCategoriesShowcase() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    // Parallax and fade-in for grid
    gsap.fromTo(
      gridRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
    // Card lift and shadow on scroll-in
    gsap.utils.toArray('.luxury-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  const images = [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  ];
  const cats = ["Tops", "Dresses", "Footwear", "Bags", "Jewelry", "Beauty"];
  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-4xl font-serif font-bold text-center text-pink-600 mb-12">Luxury Categories</motion.h2>
        <div ref={gridRef} className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]"><div className="flex flex-col gap-6">
          {cats.map((cat, i) => (
            <motion.div
              key={cat}
              className="luxury-card relative rounded-2xl overflow-hidden shadow-xl bg-white mb-6 group hover:shadow-2xl transition-all duration-300"
              style={{ minHeight: 260 + (i%3)*40 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #e9d5ff55" }}
            >
              <img src={images[i]} alt={cat} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {/* Shine effect */}
              <span className="absolute inset-0 pointer-events-none">
                <span className="shine block absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-white/30 via-white/0 to-white/0 rotate-12 opacity-0 group-hover:opacity-100 transition duration-700" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
              <span className="absolute bottom-4 left-0 w-full text-center text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg">{cat}</span>
            </motion.div>
          ))}
        </div></div>
      </div>
    </motion.section>
  );
}

// 4. BigSaleCountdownSection
function BigSaleCountdownSection() {
  const cardRef = useRef(null);
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);
  return (
    <motion.section className="py-20 px-4" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <div ref={cardRef} className="max-w-5xl mx-auto rounded-3xl p-12 text-center shadow-2xl bg-gradient-to-r from-pink-100 via-pink-50 to-yellow-100">
        <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-4xl font-bold text-pink-600 mb-4">Summer Extravaganza - Up to 60% Off</motion.h2>
        <motion.p initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.2}} className="text-lg text-gray-700 mb-8">Sale ends in: <span className="font-mono bg-white/70 px-3 py-1 rounded text-pink-600">12:34:56</span></motion.p>
        <motion.button
          className="px-10 py-3 rounded-full bg-white/60 backdrop-blur border border-pink-200 text-pink-600 font-bold text-lg shadow-lg hover:bg-white/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          whileHover={{ scale: 1.06, boxShadow: "0 0 0 8px #f9a8d4aa" }}
          animate={{ boxShadow: [
            "0 0 0 0 #f9a8d4aa",
            "0 0 0 12px #f9a8d400",
            "0 0 0 0 #f9a8d4aa"
          ] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Shop the Sale
        </motion.button>
      </div>
    </motion.section>
  );
}

// 5. DesignerBrandsTicker
function DesignerBrandsTicker() {
  const tickerRef = useRef(null);
  useEffect(() => {
    if (!tickerRef.current) return;
    gsap.fromTo(
      tickerRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tickerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);
  return (
    <motion.section className="py-12 bg-white" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.h3 initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-lg text-center text-gray-500 mb-4">Partnering with the world's finest fashion houses.</motion.h3>
        <div ref={tickerRef} className="flex gap-12 overflow-x-auto items-center justify-center py-4">
          {["Zara", "Mango", "Gucci", "Dior", "H&M"].map(brand => (
            <motion.div key={brand} className="h-16 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition" whileHover={{ scale: 1.08 }}>
              <span className="text-2xl font-bold text-gray-700">{brand}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// 6. ShopByOccasionTilt
function ShopByOccasionTilt() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
    gsap.utils.toArray('.occasion-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  const images = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  ];
  const occs = ["Party Wear", "Workwear", "Casuals", "Vacation"];
  return (
    <motion.section className="py-20 px-4 max-w-7xl mx-auto" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-4xl font-serif font-bold mb-10 text-pink-600">Shop by Occasion</motion.h2>
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {occs.map((occ, i) => (
          <motion.div
            key={occ}
            className="occasion-card relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-64"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #f9a8d455" }}
          >
            <img src={images[i]} alt={occ} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-400/60 via-pink-200/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            <span className="absolute bottom-4 left-0 w-full text-center text-xl font-semibold text-white group-hover:text-yellow-200 transition z-20 drop-shadow-lg">{occ}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// 7. CustomerFavoritesMasonry
function CustomerFavoritesMasonry() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
    gsap.utils.toArray('.favorite-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  const images = [
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  ];
  return (
    <motion.section className="py-20 px-4 max-w-7xl mx-auto" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-4xl font-serif font-bold mb-10 text-pink-600">Customer Favorites</motion.h2>
      <div ref={gridRef} className="columns-1 sm:columns-2 md:columns-3 gap-6 [column-fill:_balance]"><div className="flex flex-col gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="favorite-card bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center mb-6 group"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #f9a8d455" }}
          >
            <img src={img} alt={`Favorite ${i+1}`} className="w-32 h-32 object-cover rounded-xl mb-4 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex items-center mb-2">{'★★★★★'.split('').map((s, idx) => <motion.span key={idx} whileHover={{ scale: 1.2, color: '#fbbf24' }} className="text-yellow-400 text-lg">★</motion.span>)}</div>
            <div className="text-lg font-semibold text-gray-800 mb-1">Favorite {i+1}</div>
            <div className="text-sm text-gray-500 italic mb-2">"Top pick for our customers!"</div>
            <motion.button whileHover={{ scale: 1.06, backgroundColor: '#f472b6' }} className="mt-2 px-5 py-2 rounded-full bg-pink-500 text-white font-medium shadow hover:bg-pink-600 transition-all">Add to Cart</motion.button>
          </motion.div>
        ))}
      </div></div>
    </motion.section>
  );
}

// 8. LookbookStyleInspiration
function LookbookStyleInspiration() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
    gsap.utils.toArray('.lookbook-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  const images = [
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  ];
  const titles = ["Florals are Forever", "Chic Blazers for Boss Babes", "Minimalist Luxe"];
  return (
    <motion.section className="py-20 px-4 max-w-6xl mx-auto" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-4xl font-serif font-bold mb-4 text-pink-600">Style Inspiration</motion.h2>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {titles.map((title, i) => (
          <motion.div
            key={title}
            className="lookbook-card bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col group"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #f9a8d455" }}
          >
            <img src={images[i]} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xl font-bold text-pink-600 mb-2">{title}</div>
              <div className="text-gray-700 mb-4 flex-1">Story preview goes here...</div>
              <motion.a whileHover={{ color: '#f472b6', x: 8 }} href="#" className="text-pink-500 font-semibold hover:underline mt-auto">Read Full Story →</motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// 9. InstagramShoppableFeed
function InstagramShoppableFeed() {
  const gridRef = useRef(null);
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      }
    );
    gsap.utils.toArray('.insta-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);
  const images = [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  ];
  return (
    <motion.section className="py-20 px-4 max-w-5xl mx-auto" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-4xl font-serif font-bold mb-10 text-pink-600 text-center">Shop the Look</motion.h2>
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="insta-card relative rounded-xl overflow-hidden group cursor-pointer shadow-lg h-40 bg-gray-200"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 #f9a8d455" }}
          >
            <img src={img} alt={`Insta ${i+1}`} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 z-0" />
            <motion.button whileHover={{ scale: 1.08, backgroundColor: '#f472b6' }} className="absolute inset-0 flex items-center justify-center bg-pink-500/70 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl z-10">Shop this Look</motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// 10. LuxuryNewsletterSection
function LuxuryNewsletterSection() {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);
  return (
    <motion.section ref={sectionRef} className="py-20 px-4 bg-gradient-to-r from-pink-50 via-white to-yellow-50" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
      <div className="max-w-2xl mx-auto rounded-3xl p-12 text-center shadow-2xl">
        <motion.h2 initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7}} className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">Stay Effortlessly Chic</motion.h2>
        <motion.p initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.7, delay:0.2}} className="text-lg text-gray-700 mb-8">Subscribe for exclusive drops, insider access, and runway inspirations.</motion.p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input type="email" required placeholder="Your email address" className="px-6 py-3 rounded-full border border-pink-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 w-full sm:w-auto" />
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 0 8px #f9a8d4aa" }}
            animate={{ boxShadow: [
              "0 0 0 0 #f9a8d4aa",
              "0 0 0 12px #f9a8d400",
              "0 0 0 0 #f9a8d4aa"
            ] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="px-8 py-3 rounded-full bg-pink-500 text-white font-semibold text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            Subscribe
          </motion.button>
        </form>
        <div className="mt-4 text-pink-500 font-medium">Get 10% off your first order.</div>
      </div>
    </motion.section>
  );
}

export default Womens;