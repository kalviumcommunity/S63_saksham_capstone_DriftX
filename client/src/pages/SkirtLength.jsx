import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const SkirtLength = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const skirtTypes = [
    {
      title: "Mini Skirt",
      description: "Perfect for casual outings and youthful looks",
      ideal: "Best for showing off legs and creating a fun, playful appearance",
      image: "https://www.shutterstock.com/image-photo/portrait-hot-graceful-woman-laying-260nw-1696821391.jpg"
    },
    {
      title: "Knee-Length",
      description: "Professional and versatile choice",
      ideal: "Suitable for office wear and formal occasions",
      image: "https://c4.wallpaperflare.com/wallpaper/208/200/871/look-landscape-sexy-pose-model-hd-wallpaper-thumb.jpg"
    },
    {
      title: "Midi Skirt",
      description: "Elegant and sophisticated option",
      ideal: "Great for both casual and formal settings",
      image: "https://t3.ftcdn.net/jpg/11/21/73/40/360_F_1121734088_6V2gYY0g4WdLPGEou2UwH7tbva7yR5gH.jpg"
    },
    {
      title: "Maxi Skirt",
      description: "Dramatic and flowing style",
      ideal: "Ideal for formal events and summer occasions",
      image: "https://www.shutterstock.com/image-photo/young-beautiful-sexy-woman-white-260nw-1333252271.jpg"
    }
  ];

  // Floating animation variant
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // 3D Card hover effect
  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleVideoHover = (e) => {
    const video = e.target;
    if (video.paused) {
      video.play();
    }
  };

  const handleVideoLeave = (e) => {
    const video = e.target;
    if (!video.paused) {
      video.pause();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={floatingAnimation}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              background: `radial-gradient(circle, rgba(255,153,0,0.1) 0%, rgba(128,0,128,0.1) 100%)`,
              borderRadius: '50%',
              filter: 'blur(8px)',
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <motion.div 
        className="relative h-[60vh] overflow-hidden"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{ y }}
          className="absolute inset-0 bg-[url('https://www.shutterstock.com/image-photo/good-morning-sexy-young-woman-260nw-1332929420.jpg')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/50 to-black/80">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-[#ff9900]/20 to-purple-600/20"
            />
          </div>
        </motion.div>
        
        {/* Enhanced Title Animation */}
        <div className="relative h-full flex items-center justify-center">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-center text-white mb-4 relative"
          >
            <span className="relative inline-block">
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ff9900] to-purple-600"
              />
              The Art of Skirt Length
            </span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Interactive Tabs with Enhanced Animations */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {['Overview', 'Styling', 'Trends'].map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-3 mx-2 rounded-full text-lg font-semibold transition-all duration-300 relative overflow-hidden ${
                activeTab === index
                  ? 'bg-gradient-to-r from-[#ff9900] to-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#ff9900] to-purple-600 opacity-0"
                initial={false}
                animate={activeTab === index ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">{tab}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Video Sections with Enhanced 3D Effects */}
        <div className="relative py-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 grid grid-cols-6 gap-4 z-0"
          >
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                className="h-24 bg-gradient-to-r from-[#ff9900]/20 to-white/5 rounded-lg"
              />
            ))}
          </motion.div>

          {/* Main Content with Parallax Scrolling */}
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ x: -100, opacity: 0, rotate: -15 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full md:w-2/3 mb-12 group perspective"
            >
              {/* Enhanced Video Container with 3D Effect */}
              <motion.div
                whileHover={{ rotateY: 5, scale: 1.02 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff9900] via-[#ff9900]/50 to-purple-600 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-black rounded-lg p-1">
                  <div className="relative">
                    <video
                      className="w-full h-[400px] object-cover rounded-lg transform transition-all duration-500 group-hover:scale-[1.02]"
                      controls
                      preload="auto"
                      playsInline
                      crossOrigin="anonymous"
                      poster="https://thumbs.dreamstime.com/b/woman-walking-wheat-field-black-white-27524295.jpg"
                      onMouseEnter={handleVideoHover}
                      onMouseLeave={handleVideoLeave}
                    >
                      <source src="/videos/lady6.mp4" type="video/mp4" />
                      <p className="text-white">Your browser does not support the video tag.</p>
                    </video>
                    
                    {/* Enhanced Video Title Overlay - Positioned at the top */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                      <motion.h3
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-2xl font-bold mb-2"
                      >
                        Styling Guide: Perfect Skirt Length
                      </motion.h3>
                      <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 text-lg"
                      >
                        Discover the ideal length for your style
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Second Video with Mirror Effect */}
            <motion.div
              initial={{ x: 100, opacity: 0, rotate: 15 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative w-full md:w-2/3 ml-auto group perspective"
            >
              <motion.div
                whileHover={{ rotateY: -5, scale: 1.02 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-l from-[#ff9900] via-purple-600 to-[#ff9900]/50 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-black rounded-lg p-1">
                  <div className="relative">
                    <video
                      className="w-full h-[400px] object-cover rounded-lg transform transition-all duration-500 group-hover:scale-[1.02]"
                      controls
                      preload="auto"
                      playsInline
                      crossOrigin="anonymous"
                      poster="https://images.pexels.com/photos/18687433/pexels-photo-18687433/free-photo-of-two-models-posing-in-black-tops-and-pants.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      onMouseEnter={handleVideoHover}
                      onMouseLeave={handleVideoLeave}
                    >
                      <source src="/videos/lady7.mp4" type="video/mp4" />
                      <p className="text-white">Your browser does not support the video tag.</p>
                    </video>
                    
                    {/* Enhanced Video Title Overlay - Positioned at the top */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                      <motion.h3
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white text-2xl font-bold mb-2"
                      >
                        Seasonal Skirt Trends
                      </motion.h3>
                      <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-300 text-lg"
                      >
                        Latest styles and fashion tips
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Skirt Types Grid with 3D Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {skirtTypes.map((skirt, index) => (
            <motion.div
              key={skirt.title}
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative transform-gpu perspective"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-lg opacity-50 group-hover:opacity-100 transition duration-300 blur"></div>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={skirt.image}
                    alt={skirt.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-[#ff9900] group-hover:text-white transition-colors">
                    {skirt.title}
                  </h3>
                  <p className="text-gray-300 mb-4 group-hover:text-white/90 transition-colors">
                    {skirt.description}
                  </p>
                  <p className="text-sm text-gray-400 group-hover:text-white/70 transition-colors">
                    {skirt.ideal}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Style Tips Section with Glassmorphism */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff9900] via-purple-600 to-[#ff9900] rounded-lg opacity-50 blur-lg"></div>
          <div className="relative bg-black/60 backdrop-blur-xl p-8 rounded-lg border border-white/10">
            <h3 className="text-3xl font-semibold mb-8 text-white text-center">Style Tips</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-[#ff9900]/10 to-purple-600/10 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <h4 className="font-semibold mb-3 text-[#ff9900] text-xl">Body Proportions</h4>
                <p className="text-gray-300">Choose lengths that complement your natural proportions</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-[#ff9900]/10 to-purple-600/10 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <h4 className="font-semibold mb-3 text-[#ff9900] text-xl">Occasion</h4>
                <p className="text-gray-300">Consider the event or setting when selecting length</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-[#ff9900]/10 to-purple-600/10 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <h4 className="font-semibold mb-3 text-[#ff9900] text-xl">Styling</h4>
                <p className="text-gray-300">Pair with appropriate shoes and accessories</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skirt Length Guide with Interactive Elements */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 relative"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9900] to-purple-600">
                Complete Skirt Length Guide
              </span>
            </h2>
            
            {/* Interactive Length Comparison Slider */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {skirtTypes.map((skirt, index) => (
                <motion.div
                  key={skirt.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={skirt.image}
                      alt={skirt.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{skirt.title}</h3>
                  <p className="text-gray-300 mb-4">{skirt.description}</p>
                  <p className="text-sm text-gray-400">{skirt.ideal}</p>
                  
                  {/* Hover Effect Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black flex items-end p-6"
                  >
                    <div className="text-white">
                      <h4 className="text-lg font-semibold mb-2">Style Tips:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Best paired with fitted tops</li>
                        <li>Choose appropriate footwear</li>
                        <li>Consider the occasion</li>
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Seasonal Style Guide */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Seasonal Style Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                  <motion.div
                    key={season}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">{season}</h4>
                    <div className="space-y-2 text-gray-300">
                      <p>• Recommended lengths</p>
                      <p>• Fabric choices</p>
                      <p>• Color palettes</p>
                      <p>• Styling tips</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Style Quiz Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-900/30 to-[#ff9900]/30 rounded-2xl p-8 mb-16"
            >
              <h3 className="text-3xl font-bold text-white mb-6 text-center">Find Your Perfect Skirt Length</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff9900] to-purple-600 flex items-center justify-center">
                    <span className="text-2xl">1</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Body Type</h4>
                  <p className="text-gray-300">Understand your proportions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff9900] to-purple-600 flex items-center justify-center">
                    <span className="text-2xl">2</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Occasion</h4>
                  <p className="text-gray-300">Define your purpose</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#ff9900] to-purple-600 flex items-center justify-center">
                    <span className="text-2xl">3</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Style</h4>
                  <p className="text-gray-300">Express your personality</p>
                </div>
              </div>
            </motion.div>

            {/* Styling Tips and Tricks */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Pro Styling Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Proportion Play",
                    tips: ["Balance volume with fitted pieces", "Consider your height", "Use the rule of thirds"]
                  },
                  {
                    title: "Accessorizing",
                    tips: ["Choose appropriate footwear", "Belt placement matters", "Coordinate with tops"]
                  },
                  {
                    title: "Occasion Appropriate",
                    tips: ["Office vs Casual", "Evening events", "Weekend style"]
                  },
                  {
                    title: "Common Mistakes",
                    tips: ["Avoiding unflattering lengths", "Proper fit importance", "Weather considerations"]
                  }
                ].map((section) => (
                  <motion.div
                    key={section.title}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full mr-2"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trend Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-900/30 to-[#ff9900]/30 rounded-2xl p-8"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Trend Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { season: "Current Season", trends: ["Midi pleated skirts", "High-waisted minis", "Asymmetric hems"] },
                  { season: "Upcoming Trends", trends: ["Sustainable materials", "Vintage inspirations", "Bold prints"] },
                  { season: "Street Style", trends: ["Mix and match", "Layering techniques", "Statement pieces"] }
                ].map((forecast) => (
                  <motion.div
                    key={forecast.season}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">{forecast.season}</h4>
                    <ul className="space-y-3">
                      {forecast.trends.map((trend, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full mr-2"></span>
                          {trend}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Interactive Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-[#ff9900]/20 blur-3xl"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9900] to-purple-600">
                Interactive Style Quiz
              </span>
            </h2>

            {/* Quiz Game */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-[500px] bg-black/30 backdrop-blur-lg rounded-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff9900]/20 to-purple-600/20"></div>
                <div className="relative h-full p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Find Your Perfect Length</h3>
                  <div className="space-y-6">
                    {[
                      {
                        question: "What's your body type?",
                        options: ["Hourglass", "Pear", "Rectangle", "Apple"]
                      },
                      {
                        question: "Your preferred style?",
                        options: ["Classic", "Trendy", "Minimalist", "Bold"]
                      },
                      {
                        question: "Most common occasion?",
                        options: ["Work", "Casual", "Evening", "Special"]
                      }
                    ].map((q, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="space-y-2"
                      >
                        <p className="text-white font-medium">{q.question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {q.options.map((option, optIndex) => (
                            <motion.button
                              key={optIndex}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-white/10 rounded-lg text-white text-sm hover:bg-white/20 transition-colors"
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Results Preview */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-[500px] bg-black/30 backdrop-blur-lg rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-[#ff9900]/20"></div>
                <div className="relative h-full p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Your Style Profile</h3>
                  <div className="space-y-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-32 h-32 mx-auto bg-gradient-to-br from-[#ff9900] to-purple-600 rounded-full"
                    />
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Body Type Match</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full text-white text-sm"
                        >
                          85%
                        </motion.div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Style Compatibility</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full text-white text-sm"
                        >
                          92%
                        </motion.div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Trend Alignment</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full text-white text-sm"
                        >
                          78%
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Virtual Try-On Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-900/30 to-[#ff9900]/30 rounded-2xl p-8 mb-16 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h3 className="text-3xl font-bold text-white mb-8 text-center relative">
                Virtual Try-On Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AR Mirror",
                    description: "Try different lengths in real-time",
                    icon: "🪞",
                    features: ["Real-time preview", "Length adjustment", "Style suggestions"]
                  },
                  {
                    title: "AI Stylist",
                    description: "Get personalized recommendations",
                    icon: "🤖",
                    features: ["Body analysis", "Trend matching", "Style tips"]
                  },
                  {
                    title: "Virtual Wardrobe",
                    description: "Mix and match with your clothes",
                    icon: "👗",
                    features: ["Outfit creation", "Style matching", "Save favorites"]
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff9900] to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.features.map((item, itemIndex) => (
                          <motion.li
                            key={item}
                            whileHover={{ x: 5 }}
                            className="text-gray-300 flex items-center"
                          >
                            <motion.span
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: itemIndex * 0.2
                              }}
                              className="w-2 h-2 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full mr-2"
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Style Game Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-[#ff9900]/20 blur-3xl"></div>
              <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  Style Challenge Game
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Style Matching Game */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">Style Matching</h4>
                    <div className="space-y-4">
                      {[
                        { level: "Beginner", score: "850", progress: "75%" },
                        { level: "Intermediate", score: "1200", progress: "60%" },
                        { level: "Expert", score: "1500", progress: "45%" }
                      ].map((item) => (
                        <motion.div
                          key={item.level}
                          whileHover={{ x: 10 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{item.level}</span>
                            <span className="text-white font-bold">{item.score}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: item.progress }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-[#ff9900] to-purple-600"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Daily Challenges */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">Daily Challenges</h4>
                    <div className="space-y-4">
                      {[
                        { challenge: "Mix & Match", reward: "100", status: "Completed" },
                        { challenge: "Trend Spotter", reward: "150", status: "In Progress" },
                        { challenge: "Style Master", reward: "200", status: "Locked" }
                      ].map((item) => (
                        <motion.div
                          key={item.challenge}
                          whileHover={{ x: 10 }}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span className="text-gray-300">{item.challenge}</span>
                            <span className="text-[#ff9900] ml-2">+{item.reward}</span>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`px-3 py-1 rounded-full text-white text-sm ${
                              item.status === "Completed"
                                ? "bg-green-500/50"
                                : item.status === "In Progress"
                                ? "bg-[#ff9900]/50"
                                : "bg-gray-500/50"
                            }`}
                          >
                            {item.status}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Advanced AI Style Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-[#ff9900]/20 blur-3xl"></div>
          <div className="relative max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9900] to-purple-600">
                AI-Powered Style Analysis
              </span>
            </h2>

            {/* AI Analysis Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Body Analysis",
                  icon: "📊",
                  metrics: [
                    { name: "Proportions", value: "92%", trend: "↑" },
                    { name: "Balance", value: "88%", trend: "→" },
                    { name: "Symmetry", value: "95%", trend: "↑" }
                  ]
                },
                {
                  title: "Style DNA",
                  icon: "🧬",
                  metrics: [
                    { name: "Classic", value: "75%", trend: "↑" },
                    { name: "Modern", value: "85%", trend: "↑" },
                    { name: "Trendy", value: "60%", trend: "→" }
                  ]
                },
                {
                  title: "Color Harmony",
                  icon: "🎨",
                  metrics: [
                    { name: "Seasonal", value: "90%", trend: "↑" },
                    { name: "Contrast", value: "82%", trend: "→" },
                    { name: "Balance", value: "88%", trend: "↑" }
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff9900] to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
                    <div className="space-y-4">
                      {category.metrics.map((metric, mIndex) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: mIndex * 0.1 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-300">{metric.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-bold">{metric.value}</span>
                            <motion.span
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: metric.trend === "↑" ? [0, -10, 0] : metric.trend === "↓" ? [0, 10, 0] : [0]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`text-sm ${
                                metric.trend === "↑" ? "text-green-400" : metric.trend === "↓" ? "text-red-400" : "text-yellow-400"
                              }`}
                            >
                              {metric.trend}
                            </motion.span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Advanced Virtual Styling Lab */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-900/30 to-[#ff9900]/30 rounded-2xl p-8 mb-16 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <h3 className="text-3xl font-bold text-white mb-8 text-center relative">
                Virtual Styling Lab
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 3D Model Manipulator */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">3D Model Controls</h4>
                  <div className="space-y-6">
                    {[
                      { control: "Length Adjustment", value: "65%", type: "slider" },
                      { control: "Waist Position", value: "Medium", type: "select" },
                      { control: "Fabric Drape", value: "Flowy", type: "select" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.control}
                        whileHover={{ x: 5 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">{item.control}</span>
                          <span className="text-white">{item.value}</span>
                        </div>
                        {item.type === "slider" ? (
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: item.value }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-[#ff9900] to-purple-600"
                            />
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            {["Low", "Medium", "High"].map((option) => (
                              <motion.button
                                key={option}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  option === item.value
                                    ? "bg-gradient-to-r from-[#ff9900] to-purple-600 text-white"
                                    : "bg-white/10 text-gray-300"
                                }`}
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Material and Texture Editor */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">Material Editor</h4>
                  <div className="space-y-6">
                    {[
                      { property: "Fabric Type", options: ["Silk", "Cotton", "Wool", "Linen"] },
                      { property: "Pattern", options: ["Solid", "Striped", "Floral", "Geometric"] },
                      { property: "Texture", options: ["Smooth", "Textured", "Embellished"] }
                    ].map((item, index) => (
                      <motion.div
                        key={item.property}
                        whileHover={{ x: 5 }}
                        className="space-y-2"
                      >
                        <span className="text-gray-300">{item.property}</span>
                        <div className="flex flex-wrap gap-2">
                          {item.options.map((option) => (
                            <motion.button
                              key={option}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors"
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Advanced Style Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-[#ff9900]/20 blur-3xl"></div>
              <div className="relative bg-black/30 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  Advanced Style Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Style Evolution Timeline */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">Style Evolution</h4>
                    <div className="space-y-6">
                      {[
                        { year: "2024", trend: "Sustainable Minimalism", impact: "High" },
                        { year: "2023", trend: "Vintage Revival", impact: "Medium" },
                        { year: "2022", trend: "Tech-Infused Fashion", impact: "Low" }
                      ].map((item) => (
                        <motion.div
                          key={item.year}
                          whileHover={{ x: 10 }}
                          className="flex items-center space-x-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#ff9900] to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold">{item.year}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white">{item.trend}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-300">Impact:</span>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  item.impact === "High"
                                    ? "bg-green-500/50"
                                    : item.impact === "Medium"
                                    ? "bg-yellow-500/50"
                                    : "bg-red-500/50"
                                }`}
                              >
                                {item.impact}
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Style Prediction Engine */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-6"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">Future Predictions</h4>
                    <div className="space-y-6">
                      {[
                        { prediction: "AI-Generated Styles", confidence: "92%", timeframe: "2025" },
                        { prediction: "Smart Fabrics", confidence: "85%", timeframe: "2024" },
                        { prediction: "Virtual Fitting Rooms", confidence: "88%", timeframe: "2023" }
                      ].map((item) => (
                        <motion.div
                          key={item.prediction}
                          whileHover={{ x: 10 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{item.prediction}</span>
                            <span className="text-[#ff9900]">{item.timeframe}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: item.confidence }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-[#ff9900] to-purple-600"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkirtLength; 