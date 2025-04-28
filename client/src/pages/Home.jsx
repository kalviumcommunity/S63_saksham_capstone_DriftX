import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FaTruck, FaExchangeAlt, FaShieldAlt, FaClock, FaStar } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import ProductShowcase from "../components/ProductShowcase";
import InclusivityShowcase from "../components/InclusivityShowcase";
import { getAllProducts } from "../services/api";

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
      url: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg",
      title: "Elegant White Collection"
    },
    {
      url: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg",
      title: "Urban Black Essential"
    },
    {
      url: "https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg",
      title: "Beige Comfort Series"
    },
    {
      url: "https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg",
      title: "Classic Neutrals"
    },
    {
      url: "https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg",
      title: "Modern Outerwear"
    }
  ];

  const showcaseItems = [
    {
      id: 1,
      type: "video",
      videoSrc: "/videos/casual-fashion.mp4",
      title: "White Knit Sweater",
      price: "$70.00",
      brand: "MOE",
      poster: "https://images.pexels.com/photos/9558583/pexels-photo-9558583.jpeg"
    },
    {
      id: 2,
      type: "video",
      videoSrc: "/videos/grey-fashion.mp4",
      title: "Grey Casual Set",
      price: "$85.00",
      brand: "MOE",
      poster: "https://images.pexels.com/photos/9558657/pexels-photo-9558657.jpeg"
    },
    {
      id: 3,
      type: "video",
      videoSrc: "/videos/mens-fashion.mp4",
      title: "Men's Summer Collection 2024",
      price: "$95.00",
      brand: "MOE",
      poster: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg"
    },
    {
      id: 4,
      type: "video",
      videoSrc: "/videos/fashion-video.mp4",
      title: "Women's Luxury Collection",
      price: "$95.00",
      brand: "MOE",
      poster: "https://images.pexels.com/photos/9558762/pexels-photo-9558762.jpeg"
    },
    {
      id: 5,
      type: "video",
      videoSrc: "/videos/evening-fashion.mp4",
      title: "Nude Evening Dress",
      price: "$110.00",
      brand: "MOE",
      poster: "https://images.pexels.com/photos/9558788/pexels-photo-9558788.jpeg"
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

  return (
    <motion.div 
      className="w-full min-h-screen bg-[#1E1E1E]"
      style={{ opacity, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            DRIFTX
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
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
            <motion.button
              className="bg-black text-white px-8 py-4 w-fit hover:bg-gray-900 transition-colors shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={() => window.location.href = '/collection'}
            >
              DISCOVER NOW
            </motion.button>
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
            <source src="/videos/menny.mp4" type="video/mp4" />
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

      {/* New Arrivals Section */}
      <motion.section 
        className="w-full py-24 px-4 sm:px-8 bg-[#252525] mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
            New Arrivals
          </h2>
          
          <div className="w-full overflow-hidden relative">
            <motion.div 
              className="flex gap-6 px-4"
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...fashionImages, ...fashionImages].map((image, index) => (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0 w-[300px] h-[400px] overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-medium">{image.title}</h3>
                    <Link 
                      to="/collection" 
                      className="text-sm text-white/80 hover:text-white mt-1 inline-block"
                    >
                      View Collection →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[...Array(4)].map((_, index) => (
                <motion.div 
                  key={index}
                  className="animate-pulse bg-white rounded-xl p-6"
                >
                  <div className="bg-gray-200 rounded-lg aspect-[3/4] mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
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
              <a 
                href="/blog/office-fashion" 
                className="text-sm uppercase tracking-wider border-b border-white text-white pb-1 inline-block hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                READ MORE
              </a>
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
              <a 
                href="/blog/skirt-guide" 
                className="text-sm uppercase tracking-wider border-b border-white text-white pb-1 inline-block hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                READ MORE
              </a>
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
              <a 
                href="/blog/blazer-guide" 
                className="text-sm uppercase tracking-wider border-b border-white text-white pb-1 inline-block hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                READ MORE
              </a>
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
            <motion.button
              className="bg-black text-white px-8 py-4 w-fit hover:bg-gray-900 transition-colors shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={() => window.location.href = '/collection'}
            >
              DISCOVER NOW
            </motion.button>
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
            <source src="/videos/menny.mp4" type="video/mp4" />
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
                  src="/videos/fashion-runway.mp4"
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
      
    </motion.div>
  );
};

export default Home;