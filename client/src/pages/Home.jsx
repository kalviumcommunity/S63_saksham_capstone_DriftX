import React from 'react';
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FaTruck, FaExchangeAlt, FaShieldAlt, FaClock, FaStar } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import ProductShowcase from "../components/ProductShowcase";
import InclusivityShowcase from "../components/InclusivityShowcase";
import { getAllProducts } from "../services/api";
import AISearchAutocomplete from '../components/AISearchAutocomplete';
import ThreeDMall from '../components/ThreeDMall';
import AIRecommendations from '../components/AIRecommendations';
import VirtualTryOn from '../components/VirtualTryOn';
import LiveStyleAssistant from '../components/LiveStyleAssistant';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const [videoError, setVideoError] = useState(false);
  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(scaleProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const scale = useTransform(scaleProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  const fashionImages = [
    {
      url: "https://www.modelwerk.de/image/839074.jpg?size=rmbig",
      title: "Elegant White Collection",
      path: "/elegant-white"
    },
    {
      url: "https://blancdeblancbridal.com/wp-content/uploads/2024/03/Hessa-4jpg_1600.jpg",
      title: "Urban Black Essential",
      path: "/urban-black"
    },
    {
      url: "https://www.modelwerk.de/image/839094.jpg?size=rmbig",
      title: "Beige Comfort Series",
      path: "/beige-comfort"
    },
    {
      url: "https://img.freepik.com/free-photo/medium-shot-woman-sitting-chair_23-2149392849.jpg?semt=ais_hybrid&w=740",
      title: "Classic Neutrals",
      path: "/classic-neutrals"
    },
    {
      url: "https://bookartistsonline.weebly.com/uploads/2/2/4/5/22456530/delhi-female-models-kay-7_orig.jpeg",
      title: "Modern Outerwear",
      path: "/modern-outerwear"
    }
  ];

  const showcaseItems = [
    {
      id: 1,
      type: "video",
      videoSrc: "/videos/lady1.mp4",
      title: "White Knit Sweater",
      price: "$70.00",
      brand: "MOE",
      poster: "https://bookartistsonline.weebly.com/uploads/2/2/4/5/22456530/snapinsta-app-365084833-18300960682111302-189759856247271432-n-1080_orig.jpg"
    },
    {
      id: 2,
      type: "video",
      videoSrc: "/videos/sameer1.mp4",
      title: "Grey Casual Set",
      price: "$85.00",
      brand: "MOE",
      poster: "https://st4.depositphotos.com/6903990/31458/i/450/depositphotos_314585930-stock-photo-beauty-girl-long-shiny-wavy.jpg"
    },
    {
      id: 3,
      type: "video",
      videoSrc: "/videos/sameer.mp4",
      title: "Men's Summer Collection 2024",
      price: "$95.00",
      brand: "MOE",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZFD87QBP8xIU29I34qJEsYvz8eogtK3VX67zdd5t4YH0DelVFHiwkIn39Rg349VxUrgE&usqp=CAU"
    },
    {
      id: 4,
      type: "video",
      videoSrc: "/videos/saksham1.mp4",
      title: "Women's Luxury Collection",
      price: "$95.00",
      brand: "MOE",
      poster: "https://bookartistsonline.weebly.com/uploads/2/2/4/5/22456530/whatsapp-image-2023-09-04-at-7-35-37-pm_orig.jpeg"
    },
    {
      id: 5,
      type: "video",
      videoSrc: "/videos/penny.mp4",
      title: "Nude Evening Dress",
      price: "$110.00",
      brand: "MOE",
      poster: "https://bookartistsonline.weebly.com/uploads/2/2/4/5/22456530/img-8899_orig.jpg"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        if (response && response.products) {
          setProducts(response.products);
        } else if (Array.isArray(response)) {
          setProducts(response);
        } else {
          setProducts([]);
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  const handleVideoError = (e) => {
    console.error("Video loading error:", e);
    setVideoError(true);
  };

  const VideoComponent = ({ src, poster, isNext }) => {
    const [error, setError] = useState(false);
    const videoRef = useRef(null);
    
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load();
        if (isNext) {
          videoRef.current.preload = "auto";
        }
      }
    }, [src, isNext]);
    
    return error ? (
      <img 
        src={poster} 
        alt="Fashion Collection"
        className="w-full h-full object-cover"
      />
    ) : (
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        onError={() => setError(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  };

  const renderCarouselItem = (item, isCenter, isNext) => (
    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      {isCenter && item.type === 'video' ? (
        <VideoComponent src={item.videoSrc} poster={item.poster || item.image} isNext={isNext} />
      ) : (
        <img
          src={item.image || item.poster}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-white/80 text-sm mb-1">{item.brand}</p>
          <h3 className="text-white text-xl font-medium mb-2">{item.title}</h3>
          <p className="text-white text-xl font-bold">{item.price}</p>
        </div>
      </div>
    </div>
  );

  const NewArrivalsCarousel = () => {
    return (
      <div className="w-full bg-[#2D2D2D] py-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">New Arrivals</h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Double the items to create seamless loop */}
            {[...fashionImages, ...fashionImages].map((collection, index) => (
              <Link
                key={`${collection.title}-${index}`}
                to={collection.path === '/urban-black' ? '/modern-outerwear' : 
                    collection.path === '/beige-comfort' ? '/classic-neutrals' : 
                    collection.path}
                className="flex-shrink-0 w-[300px] mx-4"
              >
                <div className="relative group">
                  <img
                    src={collection.url}
                    alt={collection.title}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <h3 className="text-white text-xl font-semibold text-center px-4">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="w-full min-h-full"
      style={{ opacity, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/aunty.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />

            {/* Hero Content */}
            <div className="relative z-10 text-center text-black px-4">
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-4 text-white"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                DRIFTX
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 text-white"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover luxury fashion that defines your unique personality
              </motion.p>
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/mens"
                  className="px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
                >
                  Shop Men
                </Link>
                <Link
                  to="/womens"
                  className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300"
                >
                  Shop Women
                </Link>
              </motion.div>
            </div>
          </section>

          {/* AI Search Section */}
          <section className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black py-20 overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/sameer1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
            </div>
            <div className="relative z-10 container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                AI-Powered Search
              </h2>
              <AISearchAutocomplete className="mb-8" />
            </div>
          </section>

          {/* AI Recommendations Section */}
          <div className="mb-24" />
          <AIRecommendations />

          {/* Virtual Try-On Section */}
          <div className="mb-24" />
          <VirtualTryOn />

          {/* Live Style Assistant Section */}
          <div className="mb-24" />
          <LiveStyleAssistant />

          {/* 3D Mall Section */}
          <section className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
                Explore Our 3D Mall
              </h2>
              <ThreeDMall />
            </div>
          </section>

          {/* New Arrivals Section */}
          <NewArrivalsCarousel />

          {/* Category Split Banner */}
          <motion.section 
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
          >
            <motion.div 
              className="relative h-[500px] overflow-hidden"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="absolute inset-0 bg-[#F5E6E0] z-10 p-12 flex flex-col justify-center"
                style={{ 
                  backgroundColor: 'rgba(245, 230, 224, 0.7)',
                  backdropFilter: 'brightness(1.1) contrast(1.1)'
                }}
              >
                <motion.p 
                  className="text-sm uppercase tracking-widest mb-4 text-gray-800 font-medium"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Most-loved collections
                </motion.p>
                <motion.h2 
                  className="text-6xl font-light mb-6 text-gray-900"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  COSY &<br />COMFORT
                </motion.h2>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link to="/classic-neutrals" className="bg-black text-white px-8 py-4 w-fit hover:bg-gray-900 transition-colors shadow-lg inline-block">
                    DISCOVER NOW
                  </Link>
                </motion.div>
              </div>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  filter: 'brightness(1.1) contrast(1.1)',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  console.error("Video loading error:", e);
                  const fallbackImg = document.createElement('img');
                  fallbackImg.src = "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg";
                  fallbackImg.alt = "Cosy Collection";
                  fallbackImg.className = "absolute inset-0 w-full h-full object-cover";
                  e.target.parentNode.replaceChild(fallbackImg, e.target);
                }}
              >
                <source src="/videos/lady3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            <motion.div 
              className="relative h-[500px] overflow-hidden"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  filter: 'brightness(0.9) contrast(1.1)'
                }}
                onError={(e) => {
                  console.error("Video loading error:", e);
                  const fallbackImg = document.createElement('img');
                  fallbackImg.src = "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg";
                  fallbackImg.alt = "Women's Collection";
                  fallbackImg.className = "absolute inset-0 w-full h-full object-cover";
                  e.target.parentNode.replaceChild(fallbackImg, e.target);
                }}
              >
                <source src="/videos/penny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                  Women's Collection
                </h3>
                <Link
                  to="/womens"
                  className="bg-white text-black px-8 py-4 hover:bg-gray-100 transition-all duration-300"
                >
                  Shop Women's Collection
                </Link>
              </div>
            </motion.div>
          </motion.section>

          {/* Blog Articles Section */}
          <section className="w-full py-24 px-4 sm:px-8 bg-[#1E1E1E]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Article 1 */}
                <motion.article
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-[3/4] overflow-hidden mb-6">
                    <img
                      src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg"
                      alt="Office Fashion Guide"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    SEPTEMBER 19, 2024
                  </p>
                  <h3 className="text-xl mb-3 font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    HOW TO DRESS FOR THE OFFICE?
                  </h3>
                  <p className="text-gray-300 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Choosing the right outfit for the office can sometimes be a challenge...
                  </p>
                  <Link 
                    to="/blog/office-fashion" 
                    className="text-sm uppercase tracking-wider border-b border-white text-white pb-1 inline-block hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    READ MORE
                  </Link>
                </motion.article>

                {/* Article 2 */}
                <motion.article
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="aspect-[3/4] overflow-hidden mb-6">
                    <img
                      src="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
                      alt="Skirt Length Guide"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    SEPTEMBER 19, 2024
                  </p>
                  <h3 className="text-xl mb-3 font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    HOW TO CHOOSE THE RIGHT SKIRT LENGTH?
                  </h3>
                  <p className="text-gray-300 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    The right skirt length can enhance your figure...
                  </p>
                  <Link 
                    to="/blog/skirt-guide" 
                    className="text-sm uppercase tracking-wider border-b border-white text-white pb-1 inline-block hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    READ MORE
                  </Link>
                </motion.article>

                {/* Article 3 */}
                <motion.article
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="aspect-[3/4] overflow-hidden mb-6">
                    <img
                      src="https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg"
                      alt="Blazer Style Guide"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    SEPTEMBER 19, 2024
                  </p>
                  <h3 className="text-xl mb-3 font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    BLAZER AND OFFICE STYLE
                  </h3>
                  <p className="text-gray-300 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    The blazer is a staple piece in office fashion...
                  </p>
                  <Link 
                    to="/blog/blazer-guide" 
                    className="text-sm uppercase tracking-wider border-b border-white text-white pb-1 inline-block hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    READ MORE
                  </Link>
                </motion.article>
              </div>
            </div>
          </section>

          {/* Brand Logo Slider */}
          <div className="w-full py-20 bg-[#252525] overflow-hidden border-t border-gray-700">
            <div className="relative w-full">
              <motion.div 
                className="flex items-center"
                animate={{
                  x: ["-100%", "0%"]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear"
                  }
                }}
                style={{
                  width: "fit-content"
                }}
              >
                {/* Multiple sets of logos for seamless infinite scroll */}
                {[...Array(4)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex items-center">
                    <div className="flex gap-32 items-center mx-16">
                      <div className="text-2xl opacity-80 hover:opacity-100 transition-opacity text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "3px" }}>lalupa</div>
                      <div className="text-2xl opacity-80 hover:opacity-100 transition-opacity text-white" style={{ fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "1px" }}>nife</div>
                      <div className="text-2xl font-light opacity-80 hover:opacity-100 transition-opacity tracking-[0.3em] text-white">LF</div>
                      <div className="text-2xl opacity-80 hover:opacity-100 transition-opacity tracking-wider text-white" style={{ fontFamily: "'Didot', serif" }}>FIGL</div>
                      <div className="text-2xl opacity-80 hover:opacity-100 transition-opacity text-white" style={{ fontFamily: "'Alex Brush', cursive" }}>Lanty</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Product Showcase Carousel */}
          <section className="w-full py-16 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4">
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center gap-0">
                    {[-2, -1, 0, 1, 2].map((offset) => {
                      const index = (activeIndex + offset + showcaseItems.length) % showcaseItems.length;
                      const item = showcaseItems[index];
                      const isCenter = offset === 0;

                      return (
                        <motion.div
                          key={item.id}
                          className="relative w-[280px] h-[400px] flex-shrink-0"
                          initial={false}
                          animate={{
                            scale: 1,
                            opacity: isCenter ? 1 : 0.8,
                            x: offset * 150,
                            rotate: offset === 0 ? 0 : offset > 0 ? -15 : 15,
                            y: Math.abs(offset) * 10,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            mass: 1.2,
                          }}
                          style={{
                            transformOrigin: 'center center',
                            zIndex: isCenter ? 2 : 1
                          }}
                        >
                          <div className="relative w-full h-full overflow-hidden rounded-lg">
                            {isCenter && item.type === 'video' ? (
                              <VideoComponent src={item.videoSrc} poster={item.poster || item.image} isNext={false} />
                            ) : (
                              <img
                                src={item.image || item.poster}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                              <p className="text-white/90 text-xs uppercase tracking-wider mb-1">{item.brand}</p>
                              <h3 className="text-white text-sm font-medium mb-1">{item.title}</h3>
                              <p className="text-white text-sm font-bold">{item.price}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all z-10"
                  aria-label="Previous"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all z-10"
                  aria-label="Next"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Featured Collection Section */}
          <motion.section 
            className="w-full min-h-screen flex flex-col md:flex-row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Side - Image */}
            <motion.div 
              className="w-full md:w-1/2 h-screen relative overflow-hidden"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div 
                className="absolute inset-0 bg-[#F5E6E0] z-10 p-12 flex flex-col justify-center"
                style={{ 
                  backgroundColor: 'rgba(245, 230, 224, 0.7)',
                  backdropFilter: 'brightness(1.1) contrast(1.1)'
                }}
              >
                <motion.p 
                  className="text-sm uppercase tracking-widest mb-4 text-gray-800 font-medium"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Most-loved collections
                </motion.p>
                <motion.h2 
                  className="text-6xl font-light mb-6 text-gray-900"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  COSY &<br />COMFORT
                </motion.h2>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link to="/classic-neutrals" className="bg-black text-white px-8 py-4 w-fit hover:bg-gray-900 transition-colors shadow-lg inline-block">
                    DISCOVER NOW
                  </Link>
                </motion.div>
              </div>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  filter: 'brightness(1.1) contrast(1.1)',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  console.error("Video loading error:", e);
                  const fallbackImg = document.createElement('img');
                  fallbackImg.src = "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg";
                  fallbackImg.alt = "Cosy Collection";
                  fallbackImg.className = "absolute inset-0 w-full h-full object-cover";
                  e.target.parentNode.replaceChild(fallbackImg, e.target);
                }}
              >
                <source src="/videos/lady1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Right Side - Video */}
            <motion.div 
              className="w-full md:w-1/2 h-screen relative overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 w-full h-full">
                {!videoError ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false}
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    poster="https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg"
                  >
                    <source 
                      src="/videos/lady2.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src="https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg"
                    alt="Fashion Runway"
                    className="w-full h-full object-cover"
                  />
                )}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    videoLoaded ? 'bg-gradient-to-r from-black/20 to-transparent' : 'bg-black/40'
                  }`}
                />
                {!videoLoaded && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.section>
          
          {/* Inclusivity Section */}
          <InclusivityShowcase />
          
          {/* Product Showcase Section */}
          <ProductShowcase />
        </>
      )}
    </motion.div>
  );
};

export default Home;