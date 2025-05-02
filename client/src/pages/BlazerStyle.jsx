import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const BlazerStyle = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeStyle, setActiveStyle] = useState(null);
  const [hoveredTip, setHoveredTip] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [particles, setParticles] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const blazerTips = [
    {
      title: "Fit is Key",
      description: "Ensure shoulders align perfectly and sleeves hit at the right length",
      image: "https://images.pexels.com/photos/20449172/pexels-photo-20449172/free-photo-of-fashion-model-posing-in-rubber-boots.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      title: "Color Selection",
      description: "Start with neutral colors like navy, black, and gray for versatility",
      image: "https://images.pexels.com/photos/20449327/pexels-photo-20449327/free-photo-of-two-people-posing-in-a-studio.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      title: "Material Matters",
      description: "Choose quality fabrics that maintain shape and look professional",
      image: "https://images.pexels.com/photos/12260189/pexels-photo-12260189.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    },
    {
      title: "Styling Options",
      description: "Pair with everything from dresses to jeans for various looks",
      image: "https://images.pexels.com/photos/20449118/pexels-photo-20449118/free-photo-of-a-woman-wearing-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    }
  ];

  const styleTips = [
    {
      title: "Casual Elegance",
      description: "Perfect for smart casual occasions",
      tips: [
        "Pair with well-fitted jeans",
        "Add a crisp white t-shirt",
        "Complete with loafers or sneakers"
      ],
      color: "from-[#ff9900] to-[#ff6600]",
      icon: "👔",
      particles: ["👖", "👕", "👟"],
      gradient: "bg-gradient-to-br from-[#ff9900] to-[#ff6600]"
    },
    {
      title: "Business Professional",
      description: "Ideal for office and formal meetings",
      tips: [
        "Match with tailored trousers",
        "Choose a silk blouse",
        "Add classic pumps or oxfords"
      ],
      color: "from-purple-600 to-purple-800",
      icon: "💼",
      particles: ["👔", "👠", "💎"],
      gradient: "bg-gradient-to-br from-purple-600 to-purple-800"
    },
    {
      title: "Evening Glamour",
      description: "Perfect for special occasions",
      tips: [
        "Pair with a sleek dress",
        "Add statement jewelry",
        "Complete with stiletto heels"
      ],
      color: "from-pink-500 to-purple-600",
      icon: "✨",
      particles: ["👗", "💍", "👠"],
      gradient: "bg-gradient-to-br from-pink-500 to-purple-600"
    }
  ];

  const colorPalettes = [
    {
      name: "Classic",
      colors: ["#000000", "#1F2937", "#374151", "#4B5563", "#6B7280"],
      description: "Timeless professional colors"
    },
    {
      name: "Earth Tones",
      colors: ["#92400E", "#B45309", "#D97706", "#F59E0B", "#FBBF24"],
      description: "Warm and natural hues"
    },
    {
      name: "Pastels",
      colors: ["#EC4899", "#F472B6", "#F9A8D4", "#FBD5E3", "#FCE7F3"],
      description: "Soft and subtle shades"
    }
  ];

  const particleAnimation = {
    animate: {
      y: [0, -30],
      opacity: [0, 1, 0],
      scale: [1, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateY: 15,
      z: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const tipVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      rotateY: 0
    }
  };

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i) => ({
      scale: [1, 1.2, 1],
      opacity: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  };

  const createParticles = (style) => {
    const newParticles = style.particles.map((particle, i) => ({
      id: Math.random(),
      emoji: particle,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }));
    setParticles(newParticles);
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

  const highQualityImages = {
    blazerStyles: [
      "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg", // Professional blazer
      "https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg", // Casual blazer
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg", // Evening blazer
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg", // Modern blazer
      "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg", // Classic blazer
      "https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg"  // Trendy blazer
    ],
    seasonal: {
      spring: "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg",
      summer: "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg",
      autumn: "https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg",
      winter: "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg"
    },
    inspiration: [
      "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg",
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg",
      "https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg",
      "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg",
      "https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg",
      "https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg",
      "https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg",
      "https://images.pexels.com/photos/2866119/pexels-photo-2866119.jpeg",
      "https://images.pexels.com/photos/3062624/pexels-photo-3062624.jpeg",
      "https://images.pexels.com/photos/2955375/pexels-photo-2955375.jpeg",
      "https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg"
    ],
    details: {
      measurement: "https://images.pexels.com/photos/4620769/pexels-photo-4620769.jpeg",
      styling: "https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg"
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
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleAnimation}
            animate="animate"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 2 === 0 ? '#ff9900' : '#800080',
              borderRadius: '50%',
              filter: 'blur(1px)',
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative h-[60vh] overflow-hidden"
        style={{ perspective: 1000 }}
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          style={{ 
            y,
            rotateX,
            transformStyle: 'preserve-3d'
          }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/17256658/pexels-photo-17256658/free-photo-of-woman-sitting-and-posing-on-stairs.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')] bg-cover bg-center"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/50 to-black/80"
            animate={{
              background: [
                'linear-gradient(to right, rgba(0,0,0,0.8), rgba(128,0,128,0.5), rgba(0,0,0,0.8))',
                'linear-gradient(to right, rgba(0,0,0,0.8), rgba(255,153,0,0.5), rgba(0,0,0,0.8))',
                'linear-gradient(to right, rgba(0,0,0,0.8), rgba(128,0,128,0.5), rgba(0,0,0,0.8))'
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-4 relative"
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative inline-block">
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ff9900] to-purple-600"
                />
                The Art of Blazer Style
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-gray-300 text-xl"
            >
              Elevate your fashion game with perfect blazer styling
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          className="flex justify-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-600 to-transparent top-1/2 -translate-y-1/2" />
          {['Essentials', 'Styling', 'Tips'].map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-3 mx-2 rounded-full text-lg font-semibold transition-all duration-300 relative z-10 overflow-hidden ${
                activeTab === index
                  ? 'bg-gradient-to-r from-[#ff9900] to-purple-600 text-white'
                  : 'bg-black/50 text-gray-300 hover:bg-black/70'
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

        <div className="relative py-24">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full md:w-2/3 mb-12 group perspective"
          >
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
                    poster="https://anninc.scene7.com/is/image/AN/837372_8952_MKTG1?$fullBplp$"
                    onMouseEnter={handleVideoHover}
                    onMouseLeave={handleVideoLeave}
                  >
                    <source src="/videos/lady9.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <motion.h3
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white text-2xl font-bold mb-2"
                    >
                      Professional Blazer Styling
                    </motion.h3>
                    <motion.p
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-200 text-lg"
                    >
                      Master the art of blazer combinations
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
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
                    poster="https://www.shutterstock.com/image-photo/beautiful-woman-flowers-bag-looking-260nw-1424234561.jpg"
                    onMouseEnter={handleVideoHover}
                    onMouseLeave={handleVideoLeave}
                  >
                    <source src="/videos/lady8.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                    <motion.h3
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-white text-2xl font-bold mb-2"
                    >
                      Modern Blazer Trends
                    </motion.h3>
                    <motion.p
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-200 text-lg"
                    >
                      Contemporary styles and combinations
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {blazerTips.map((style, index) => (
            <motion.div
              key={style.title}
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative transform-gpu perspective"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-lg opacity-50 group-hover:opacity-100 transition duration-300 blur"
                animate={{
                  scale: hoveredCard === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <div className="relative bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">{style.title}</h3>
                <p className="text-gray-300 mb-4">{style.description}</p>
                <motion.img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-48 object-cover rounded-lg mt-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff9900] via-purple-600 to-[#ff9900] rounded-lg opacity-50 blur-lg"></div>
          <div className="relative bg-black/60 backdrop-blur-xl p-8 rounded-lg border border-white/10">
            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold mb-8 text-white text-center"
            >
              Style Guide
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-[#ff9900] to-purple-600 mx-auto mt-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.h3>

            <div className="grid md:grid-cols-3 gap-8 perspective-1000">
              {styleTips.map((style, index) => (
                <motion.div
                  key={style.title}
                  variants={tipVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, y: 20, rotateY: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative p-6 rounded-lg ${style.gradient} cursor-pointer transform-gpu`}
                  onClick={() => {
                    setActiveStyle(activeStyle === index ? null : index);
                    setSelectedTip(index);
                    createParticles(style);
                  }}
                  onMouseEnter={() => setHoveredTip(index)}
                  onMouseLeave={() => setHoveredTip(null)}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/20 rounded-lg"
                    animate={{
                      opacity: hoveredTip === index ? 0.3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      scale: hoveredTip === index ? 1.2 : 1,
                      rotate: hoveredTip === index ? 10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {style.icon}
                  </motion.div>

                  <h4 className="text-xl font-semibold text-white mb-2">{style.title}</h4>
                  <p className="text-gray-200 mb-4">{style.description}</p>

                  <AnimatePresence>
                    {activeStyle === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2">
                          {style.tips.map((tip, tipIndex) => (
                            <motion.li
                              key={tip}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: 1,
                                x: 0
                              }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ 
                                duration: 0.3,
                                delay: tipIndex * 0.1
                              }}
                              className="text-gray-200 flex items-center"
                            >
                              <motion.span
                                className="mr-2"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, 0]
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatDelay: 2,
                                  delay: tipIndex * 0.2
                                }}
                              >
                                ✨
                              </motion.span>
                              {tip}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"
                    animate={{
                      scaleX: activeStyle === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <AnimatePresence>
                    {selectedTip === index && particles.map((particle, i) => (
                      <motion.div
                        key={particle.id}
                        custom={i}
                        variants={particleVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute text-2xl"
                        style={{
                          left: `${particle.x}%`,
                          top: `${particle.y}%`
                        }}
                      >
                        {particle.emoji}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <h4 className="text-xl font-semibold text-white mb-6 text-center">Quick Style Tips</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { text: "Always check the fit", icon: "📏" },
                  { text: "Consider the occasion", icon: "🎯" },
                  { text: "Accessorize wisely", icon: "💎" },
                  { text: "Mind the proportions", icon: "⚖️" }
                ].map((tip, index) => (
                  <motion.div
                    key={tip.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 text-center group hover:bg-white/10 transition-colors duration-300"
                  >
                    <motion.div
                      className="text-2xl mb-2"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      {tip.icon}
                    </motion.div>
                    <p className="text-gray-200 group-hover:text-white transition-colors duration-300">{tip.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <h4 className="text-xl font-semibold text-white mb-4 text-center">Style Quiz</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "What's your preferred style?",
                  "Which occasion are you dressing for?",
                  "What's your body type?",
                  "What's your color preference?"
                ].map((question, index) => (
                  <motion.div
                    key={question}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-black/20 rounded-lg"
                  >
                    <p className="text-gray-200 mb-2">{question}</p>
                    <div className="flex gap-2">
                      {["A", "B", "C", "D"].map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-white/10 rounded-full text-white text-sm hover:bg-white/20 transition-colors duration-300"
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

        {/* New Interactive Color Palette Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 relative"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              Color Harmony Guide
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {colorPalettes.map((palette, index) => (
                <motion.div
                  key={palette.name}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">{palette.name}</h3>
                  <div className="flex gap-2 mb-4">
                    {palette.colors.map((color) => (
                      <motion.div
                        key={color}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">{palette.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Enhanced 3D Blazer Showcase */}
        <motion.section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              3D Blazer Showcase
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highQualityImages.blazerStyles.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative group perspective"
                  whileHover={{ z: 50 }}
                >
                  <motion.div
                    className="relative transform transition-all duration-500 group-hover:rotate-y-180"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    <img
                      src={image}
                      alt={`Blazer Style ${index + 1}`}
                      className="w-full h-[500px] object-cover rounded-xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm p-6 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-4">Premium Style</h3>
                      <p className="text-gray-300">Discover the perfect blend of elegance and comfort with our curated blazer collection.</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Update Seasonal Trends section */}
        <motion.section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              Seasonal Trends
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-6">
              {Object.entries(highQualityImages.seasonal).map(([season, image], index) => (
                <motion.div
                  key={season}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <img
                    src={image}
                    alt={season}
                    className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2 capitalize">{season}</h3>
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Discover the latest {season.toLowerCase()} blazer trends
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Update Perfect Fit Guide section */}
        <motion.section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              Perfect Fit Guide
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Key Measurements</h3>
                {[
                  { label: "Shoulder Width", value: "16-18 inches" },
                  { label: "Chest", value: "38-42 inches" },
                  { label: "Sleeve Length", value: "24-26 inches" },
                  { label: "Back Length", value: "28-30 inches" }
                ].map((measurement, index) => (
                  <motion.div
                    key={measurement.label}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center mb-4 p-4 bg-white/5 rounded-lg"
                  >
                    <span className="text-gray-300">{measurement.label}</span>
                    <span className="text-white font-semibold">{measurement.value}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="relative"
              >
                <img
                  src={highQualityImages.details.measurement}
                  alt="Measurement Guide"
                  className="rounded-xl shadow-2xl h-[600px] w-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Update Style Inspiration Gallery */}
        <motion.section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              Style Inspiration Gallery
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {highQualityImages.inspiration.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <img
                    src={image}
                    alt={`Style ${index + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* New Lookbook Section */}
        <motion.section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold text-white text-center mb-12"
            >
              Luxury Lookbook
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="space-y-8"
              >
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={highQualityImages.blazerStyles[0]}
                    alt="Professional Look"
                    className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white">Professional Excellence</h3>
                    <p className="text-gray-300">Perfect for business meetings and formal occasions</p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={highQualityImages.blazerStyles[1]}
                    alt="Casual Look"
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white">Casual Sophistication</h3>
                    <p className="text-gray-300">Effortless style for everyday elegance</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="space-y-8"
              >
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={highQualityImages.blazerStyles[2]}
                    alt="Evening Look"
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white">Evening Charm</h3>
                    <p className="text-gray-300">Make a statement at special events</p>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={highQualityImages.blazerStyles[3]}
                    alt="Modern Look"
                    className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white">Modern Edge</h3>
                    <p className="text-gray-300">Contemporary style for the fashion-forward</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default BlazerStyle; 