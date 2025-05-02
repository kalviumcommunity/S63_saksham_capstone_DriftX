import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring as useFramerSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useSpring, animated, config } from '@react-spring/web';
import Tilt from 'react-parallax-tilt';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Stars } from '@react-three/drei';
import { FaRobot, FaHeart, FaShare, FaBookmark, FaStar, FaArrowUp, FaComments, FaEye, FaChartLine, FaTags, FaUserFriends, FaRegLightbulb, FaTshirt, FaShoppingBag, FaInstagram, FaPinterest, FaCamera, FaLeaf, FaBook, FaPalette, FaGem, FaCheck, FaTimes, FaSpinner, FaArrowDown, FaHistory } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

// Enhanced Engagement Button
const EngagementButton = ({ icon: Icon, label, count, isActive, onClick, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const springProps = useSpring({
    scale: isHovered ? 1.1 : 1,
    config: config.wobbly
  });

  const glowSpring = useSpring({
    boxShadow: isHovered 
      ? `0 0 20px ${color}66, 0 0 40px ${color}33` 
      : '0 0 0px transparent',
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div
      style={{
        ...springProps,
        ...glowSpring
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        onClick={onClick}
        className={`p-4 rounded-2xl bg-gradient-to-br ${
          isActive 
            ? 'from-purple-600 to-pink-600' 
            : 'from-gray-800 to-gray-900'
        } backdrop-blur-lg transition-all duration-300`}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className={`text-2xl ${isActive ? 'text-white' : 'text-gray-400'}`} />
      </motion.button>
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {count}
        </motion.div>
      )}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 text-white text-sm px-2 py-1 rounded">
        {label}
      </div>
    </animated.div>
  );
};

// 3D Model Component with Error Handling
const FashionModel = ({ onError }) => {
  const [modelError, setModelError] = useState(false);

  try {
    const { scene } = useGLTF('/path/to/your/3d/model.glb');
    return <primitive object={scene} scale={1.5} />;
  } catch (error) {
    console.error('Error loading 3D model:', error);
    setModelError(true);
    onError();
    return null;
  }
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <FaSpinner className="text-4xl text-purple-400 animate-spin" />
    <span className="ml-3 text-xl text-purple-400">Loading 3D Model...</span>
  </div>
);

// Error Message Component
const ErrorMessage = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <FaTimes className="text-4xl text-red-400 mx-auto mb-4" />
      <p className="text-xl text-red-400">Failed to load 3D model</p>
      <p className="text-sm text-gray-400 mt-2">Please try refreshing the page</p>
    </div>
  </div>
);

// AI Fashion Assistant Component
const AIFashionAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your fashion AI assistant. Ask me anything about office fashion!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "For office wear, I recommend sticking to neutral colors like navy, black, and beige. They're versatile and professional.",
        "A well-fitted blazer is essential for office attire. It instantly elevates any outfit.",
        "Consider investing in quality fabrics - they last longer and maintain a polished look throughout the day.",
        "Don't forget about appropriate accessories. Simple, elegant pieces work best in professional settings."
      ];
      setMessages(prev => [...prev, { type: 'bot', text: responses[Math.floor(Math.random() * responses.length)] }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <FaRobot className="text-white text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-96 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h3 className="text-white font-medium">Fashion AI Assistant</h3>
            </div>

            <div className="h-96 overflow-y-auto p-4 bg-black/20">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white/10 text-gray-200'
                    } max-w-[80%] backdrop-blur-sm`}
          >
            {msg.text}
                  </div>
          </motion.div>
        ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 p-3 bg-white/10 text-gray-200 rounded-lg w-fit backdrop-blur-sm"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
      </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
        <input
                  type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about office fashion..."
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 backdrop-blur-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send
                </motion.button>
              </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced Content Section Component
const ContentSection = ({ title, icon: Icon, children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8 }}
      className={`py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
            <Icon className="text-2xl text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, change }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg">
          <Icon className="text-2xl text-purple-400" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <h4 className="text-2xl font-bold text-white">{value}</h4>
        </div>
      </div>
      <div className={`flex items-center gap-2 text-sm ${
        change >= 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        <FaChartLine className={change >= 0 ? '' : 'transform rotate-180'} />
        <span>{Math.abs(change)}% from last week</span>
      </div>
    </motion.div>
  );
};

// Image with Fallback Component
const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const fallbackImage = '/path/to/placeholder.jpg'; // Replace with your placeholder image

  return (
    <img
      src={error ? fallbackImage : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

// Virtual Try-On Section
const VirtualTryOn = () => {
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [modelError, setModelError] = useState(false);
  
  return (
    <ErrorBoundary>
      <div className="relative h-[600px] bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden">
        {modelError ? (
          <ErrorMessage />
        ) : (
          <Canvas>
            <Suspense fallback={<LoadingSpinner />}>
              <OrbitControls 
                enablePan={false}
                enableZoom={true}
                minDistance={2}
                maxDistance={5}
              />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <spotLight
                position={[0, 5, 10]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <FashionModel onError={() => setModelError(true)} />
            </Suspense>
          </Canvas>
        )}
        
        {/* Model Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
          <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            Rotate View
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            Change Outfit
          </button>
          <button className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            Take Screenshot
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

// Style Quiz Section
const StyleQuiz = () => {
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    answers: [],
    result: null
  });

  const questions = [
    {
      question: "What's your preferred office dress code?",
      options: ["Business Formal", "Business Casual", "Smart Casual", "Creative Professional"]
    },
    {
      question: "Which colors do you feel most confident wearing?",
      options: ["Neutrals", "Jewel Tones", "Pastels", "Bold & Bright"]
    },
    {
      question: "What's your typical work environment?",
      options: ["Corporate Office", "Creative Studio", "Hybrid/Remote", "Client-Facing"]
    },
    {
      question: "What's your style priority?",
      options: ["Comfort", "Professionalism", "Creativity", "Versatility"]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...quizState.answers, answer];
    
    if (newAnswers.length === questions.length) {
      // Calculate result
      const result = calculateStyleProfile(newAnswers);
      setQuizState({ ...quizState, answers: newAnswers, result });
    } else {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers
      });
    }
  };

  const calculateStyleProfile = (answers) => {
    // Add logic to determine style profile based on answers
    return {
      styleProfile: "Modern Professional",
      description: "Your style combines classic professionalism with contemporary trends.",
      recommendations: [
        "Invest in quality blazers",
        "Experiment with modern cuts",
        "Focus on versatile pieces"
      ]
    };
  };

  return (
    <motion.div className="max-w-2xl mx-auto">
      {quizState.result ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">{quizState.result.styleProfile}</h3>
          <p className="text-gray-300">{quizState.result.description}</p>
          <div className="space-y-4">
            <h4 className="font-semibold">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {quizState.result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">{questions[quizState.currentQuestion].question}</h3>
          <div className="grid grid-cols-2 gap-4">
            {questions[quizState.currentQuestion].options.map((option, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Trend Forecast Section
const TrendForecast = () => {
  const trends = [
    {
      season: "Fall 2024",
      trends: ["Power Suiting", "Sustainable Fabrics", "Minimalist Accessories"],
      colorPalette: ["#2C3E50", "#ECF0F1", "#E74C3C"],
      keyPieces: [
        {
          name: "Oversized Blazer",
          description: "Statement piece in sustainable wool blend",
          price: "$199",
          trend: "Power Suiting"
        },
        {
          name: "Recycled Cashmere Sweater",
          description: "Luxurious and eco-conscious",
          price: "$149",
          trend: "Sustainable Fabrics"
        },
        {
          name: "Minimal Gold Necklace",
          description: "Versatile layering piece",
          price: "$89",
          trend: "Minimalist Accessories"
        }
      ]
    },
    {
      season: "Winter 2024",
      trends: ["Textured Neutrals", "Modern Layering", "Statement Boots"],
      colorPalette: ["#34495E", "#BDC3C7", "#C0392B"],
      keyPieces: [
        {
          name: "Bouclé Coat",
          description: "Textured neutral statement piece",
          price: "$299",
          trend: "Textured Neutrals"
        },
        {
          name: "Silk Turtleneck",
          description: "Perfect layering essential",
          price: "$129",
          trend: "Modern Layering"
        },
        {
          name: "Leather Knee Boots",
          description: "Bold yet professional",
          price: "$249",
          trend: "Statement Boots"
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {trends.map((season, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold mb-6">{season.season}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Key Trends</h4>
              <ul className="space-y-2">
                {season.trends.map((trend, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FaStar className="text-purple-400" />
                    {trend}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-4">
                {season.colorPalette.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/10"
                    style={{ backgroundColor: color }}
        />
      ))}
              </div>
            </div>
            <div className="col-span-2">
              <h4 className="text-xl font-semibold mb-4">Key Pieces</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {season.keyPieces.map((piece, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 rounded-xl p-4"
                  >
                    <h5 className="font-semibold">{piece.name}</h5>
                    <p className="text-sm text-gray-400 mt-2">{piece.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-purple-400">{piece.price}</span>
                      <span className="text-xs text-gray-400">{piece.trend}</span>
                    </div>
    </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Interactive Lookbook Section
const LookbookSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const looks = [
    {
      title: "Modern Professional",
      description: "Perfect for the contemporary office",
      image: "/path/to/look1.jpg",
      items: [
        { name: "Structured Blazer", price: "$129", link: "#" },
        { name: "High-Waisted Pants", price: "$89", link: "#" },
        { name: "Leather Tote", price: "$199", link: "#" }
      ],
      style: "Business Professional",
      occasion: "Client Meetings",
      colorPalette: ["#2C3E50", "#ECF0F1", "#E74C3C"]
    },
    {
      title: "Creative Executive",
      description: "Bold and professional with a creative twist",
      image: "/path/to/look2.jpg",
      items: [
        { name: "Statement Blazer", price: "$159", link: "#" },
        { name: "Wide-Leg Pants", price: "$99", link: "#" },
        { name: "Designer Clutch", price: "$149", link: "#" }
      ],
      style: "Creative Professional",
      occasion: "Creative Meetings",
      colorPalette: ["#8E44AD", "#2ECC71", "#F1C40F"]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {looks.map((look, index) => (
          <Tilt
            key={index}
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
            scale={1.05}
            transitionSpeed={2000}
            className="transform-style-3d"
          >
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-black/30 backdrop-blur-xl rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src={look.image}
                alt={look.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{look.title}</h3>
                <p className="text-gray-300">{look.description}</p>
                <div className="flex gap-2">
                  {look.colorPalette.map((color, i) => (
                    <div 
                      key={i}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  {look.items.map((item, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

// Shopping Suggestions Section
const ShoppingSuggestions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const items = [
    {
      name: "Classic Blazer",
      brand: "Professional Plus",
      price: "$189",
      image: "/path/to/blazer.jpg",
      category: "outerwear",
      rating: 4.8,
      reviews: 128,
      colors: ["Navy", "Black", "Beige"],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      name: "Silk Shell Top",
      brand: "Luxe Basics",
      price: "$99",
      image: "/path/to/top.jpg",
      category: "tops",
      rating: 4.6,
      reviews: 89,
      colors: ["White", "Ivory", "Black"],
      sizes: ["XS", "S", "M", "L"]
    },
    {
      name: "Tailored Trousers",
      brand: "Modern Essentials",
      price: "$149",
      image: "/path/to/trousers.jpg",
      category: "bottoms",
      rating: 4.7,
      reviews: 156,
      colors: ["Black", "Navy", "Gray"],
      sizes: ["2-12"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {['all', 'outerwear', 'tops', 'bottoms', 'accessories'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full ${
              activeFilter === filter
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items
          .filter(item => activeFilter === 'all' || item.category === activeFilter)
          .map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-black/30 backdrop-blur-xl rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-400">{item.brand}</p>
                  </div>
                  <span className="text-xl font-bold">{item.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">({item.reviews})</span>
                </div>
                <div className="flex gap-2">
                  {item.colors.map((color, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/5 rounded-full text-xs"
                    >
                      {color}
                    </span>
                  ))}
                </div>
                <button className="w-full py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <h3 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h3>
          <p className="text-gray-400">We're having trouble loading this component</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Parallax Hero Section
const ParallaxHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/80"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Office Fashion Guide
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto px-4">
            Master the art of professional dressing with our comprehensive guide
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white"
          >
            <FaArrowDown className="text-3xl mx-auto" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Interactive Style Guide Section
const StyleGuideSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const guides = [
    {
      title: "Color Psychology",
      description: "Understanding color combinations for professional impact",
      icon: FaPalette,
      colors: ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB"]
    },
    {
      title: "Fabric Selection",
      description: "Choosing the right materials for comfort and style",
      icon: FaTshirt,
      materials: ["Wool", "Cotton", "Silk", "Linen"]
    },
    {
      title: "Accessorizing",
      description: "Elevating your outfit with the perfect accessories",
      icon: FaGem,
      tips: ["Minimal jewelry", "Quality watch", "Classic bag"]
    }
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-b from-black/50 to-purple-900/20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Professional Style Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide, idx) => (
        <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <guide.icon className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
              <p className="text-gray-400 mb-4">{guide.description}</p>
              {guide.colors && (
                <div className="flex gap-2">
                  {guide.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
              {guide.materials && (
                <ul className="space-y-2">
                  {guide.materials.map((material, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaCheck className="text-green-400" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              )}
              {guide.tips && (
                <ul className="space-y-2">
                  {guide.tips.map((tip, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Interactive 3D Wardrobe Section
const WardrobeSection = () => {
  const [activeItem, setActiveItem] = useState(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.section
      style={{ scale }}
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/50" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Essential Wardrobe Pieces
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wardrobeItems.map((item, idx) => (
          <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-black/30 backdrop-blur-xl rounded-2xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400">{item.price}</span>
                  <button className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
          </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Seasonal Trends Section with Parallax
const SeasonalTrendsSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <motion.section
      style={{ y }}
      className="py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Seasonal Office Trends
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seasonalTrends.map((trend, idx) => (
              <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-xl rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4">{trend.season}</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  {trend.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <ul className="space-y-2">
                  {trend.trends.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaCheck className="text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </motion.div>
            ))}
          </div>
      </div>
    </motion.section>
  );
};

// Style Tips Section with Interactive Cards
const StyleTipsSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  return (
    <section className="py-20 bg-gradient-to-b from-black/50 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Professional Style Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {styleTips.map((tip, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`bg-black/30 backdrop-blur-xl rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                activeCard === idx ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setActiveCard(idx)}
            >
              <tip.icon className="text-3xl text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
              <p className="text-gray-400">{tip.description}</p>
              {activeCard === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <ul className="space-y-2">
                    {tip.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FaCheck className="text-green-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Data for sections
const wardrobeItems = [
  {
    name: "Classic Blazer",
    description: "A timeless piece for any professional wardrobe",
    price: "$199",
    image: "/path/to/blazer.jpg"
  },
  {
    name: "Tailored Trousers",
    description: "Perfect fit for a polished look",
    price: "$149",
    image: "/path/to/trousers.jpg"
  },
  {
    name: "Silk Blouse",
    description: "Elegant and versatile top",
    price: "$129",
    image: "/path/to/blouse.jpg"
  }
];

const seasonalTrends = [
  {
    season: "Fall/Winter 2024",
    colors: ["#2C3E50", "#8E44AD", "#E74C3C", "#ECF0F1"],
    trends: [
      "Oversized blazers",
      "Monochrome looks",
      "Textured fabrics",
      "Statement boots"
    ]
  },
  {
    season: "Spring/Summer 2024",
    colors: ["#27AE60", "#3498DB", "#F1C40F", "#E67E22"],
    trends: [
      "Pastel suits",
      "Lightweight fabrics",
      "Minimalist accessories",
      "Floral patterns"
    ]
  }
];

const styleTips = [
  {
    title: "Color Coordination",
    description: "Master the art of color matching",
    icon: FaPalette,
    details: [
      "Stick to a three-color palette",
      "Use neutrals as base colors",
      "Add one statement color",
      "Consider your skin tone"
    ]
  },
  {
    title: "Accessorizing",
    description: "Elevate your outfit with accessories",
    icon: FaGem,
    details: [
      "Choose quality over quantity",
      "Match metals consistently",
      "Keep it minimal",
      "Invest in classic pieces"
    ]
  },
  {
    title: "Fabric Care",
    description: "Maintain your professional wardrobe",
    icon: FaTshirt,
    details: [
      "Read care labels carefully",
      "Dry clean delicate items",
      "Store properly",
      "Regular maintenance"
    ]
  }
];

// AI Color Analysis Section
const AIColorAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => {
          setAnalysis({
            dominantColors: ["#2C3E50", "#ECF0F1", "#E74C3C"],
            colorHarmony: "Monochromatic",
            recommendations: [
              "These colors work well for a professional setting",
              "Consider adding a pop of color with accessories",
              "Perfect for creating a cohesive look"
            ],
            mood: "Professional & Sophisticated"
          });
          setIsAnalyzing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-4">Upload Your Outfit</h3>
          <div 
            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Uploaded outfit" 
                className="max-h-64 mx-auto rounded-lg"
              />
            ) : (
              <div className="space-y-4">
                <FaCamera className="text-4xl mx-auto text-purple-400" />
                <p className="text-gray-400">Click to upload your outfit photo</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-4">AI Color Analysis</h3>
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-64">
              <div className="space-y-4 text-center">
                <div className="flex gap-2 justify-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
                <p className="text-gray-400">Analyzing your outfit...</p>
              </div>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Dominant Colors</h4>
                <div className="flex gap-2">
                  {analysis.dominantColors.map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Color Harmony</h4>
                <p className="text-gray-400">{analysis.colorHarmony}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mood</h4>
                <p className="text-gray-400">{analysis.mood}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaRegLightbulb className="text-purple-400" />
                      <span className="text-gray-400">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Upload an outfit to get started</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Virtual Stylist Section
const VirtualStylist = () => {
  const [userPreferences, setUserPreferences] = useState({
    style: '',
    occasion: '',
    budget: '',
    colors: []
  });
  const [recommendations, setRecommendations] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setRecommendations({
        outfits: [
          {
            name: "Power Professional",
            items: [
              { name: "Tailored Blazer", price: "$199", link: "#" },
              { name: "Silk Blouse", price: "$89", link: "#" },
              { name: "Slim Fit Pants", price: "$129", link: "#" }
            ],
            description: "Perfect for important meetings and presentations"
          },
          {
            name: "Creative Executive",
            items: [
              { name: "Statement Jacket", price: "$249", link: "#" },
              { name: "Patterned Top", price: "$79", link: "#" },
              { name: "Wide-Leg Trousers", price: "$149", link: "#" }
            ],
            description: "Ideal for creative industries and networking events"
          }
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6">Your Style Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Style</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                value={userPreferences.style}
                onChange={(e) => setUserPreferences({ ...userPreferences, style: e.target.value })}
              >
                <option value="">Select Style</option>
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="creative">Creative</option>
              </select>
        </div>
            <div>
              <label className="block text-gray-400 mb-2">Occasion</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                value={userPreferences.occasion}
                onChange={(e) => setUserPreferences({ ...userPreferences, occasion: e.target.value })}
              >
                <option value="">Select Occasion</option>
                <option value="office">Office</option>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Budget</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                value={userPreferences.budget}
                onChange={(e) => setUserPreferences({ ...userPreferences, budget: e.target.value })}
              >
                <option value="">Select Budget</option>
                <option value="budget">Budget</option>
                <option value="mid">Mid-Range</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg"
            >
              Generate Outfits
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6">AI Recommendations</h3>
          {isGenerating ? (
            <div className="flex items-center justify-center h-64">
              <div className="space-y-4 text-center">
                <div className="flex gap-2 justify-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                <p className="text-gray-400">Generating personalized outfits...</p>
              </div>
            </div>
          ) : recommendations ? (
            <div className="space-y-6">
              {recommendations.outfits.map((outfit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-white/5 rounded-xl p-4"
                >
                  <h4 className="font-semibold mb-2">{outfit.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">{outfit.description}</p>
                  <div className="space-y-2">
                    {outfit.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-purple-400">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Select your preferences to get started</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Fashion Trend Predictor Section
const TrendPredictor = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Trends' },
    { id: 'colors', name: 'Colors' },
    { id: 'fabrics', name: 'Fabrics' },
    { id: 'styles', name: 'Styles' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const generatePredictions = () => {
    setIsLoading(true);
    // Simulate AI prediction
    setTimeout(() => {
      setPredictions({
        trends: [
          {
            name: "Sustainable Luxury",
            description: "Eco-friendly materials with high-end finishes",
            confidence: 92,
            timeline: "Next 6 months",
            impact: "High"
          },
          {
            name: "Tech-Infused Textiles",
            description: "Smart fabrics with temperature regulation",
            confidence: 88,
            timeline: "Next 12 months",
            impact: "Medium"
          },
          {
            name: "Minimalist Maximalism",
            description: "Bold statements with clean lines",
            confidence: 85,
            timeline: "Next 3 months",
            impact: "High"
          }
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generatePredictions}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg mb-8"
      >
        Generate Trend Predictions
      </motion.button>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="space-y-4 text-center">
            <div className="flex gap-2 justify-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-gray-400">Analyzing fashion trends...</p>
          </div>
        </div>
      ) : predictions ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {predictions.trends.map((trend, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold">{trend.name}</h4>
                <span className="text-purple-400 font-semibold">{trend.confidence}%</span>
              </div>
              <p className="text-gray-400 mb-4">{trend.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white">{trend.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Impact:</span>
                  <span className={`${
                    trend.impact === 'High' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {trend.impact}
                  </span>
                </div>
              </div>
        </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Click to generate trend predictions</p>
        </div>
      )}
    </div>
  );
};

// Outfit Generator Section
const OutfitGenerator = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [generatedOutfits, setGeneratedOutfits] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const wardrobeItems = [
    { id: 1, name: "Black Blazer", category: "outerwear", image: "/path/to/blazer.jpg" },
    { id: 2, name: "White Shirt", category: "tops", image: "/path/to/shirt.jpg" },
    { id: 3, name: "Gray Pants", category: "bottoms", image: "/path/to/pants.jpg" },
    { id: 4, name: "Black Dress", category: "dresses", image: "/path/to/dress.jpg" },
    { id: 5, name: "Navy Blazer", category: "outerwear", image: "/path/to/navy-blazer.jpg" },
    { id: 6, name: "Silk Blouse", category: "tops", image: "/path/to/blouse.jpg" }
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedOutfits({
        outfits: [
          {
            name: "Classic Professional",
            items: [1, 2, 3],
            rating: 4.8,
            occasion: "Office"
          },
          {
            name: "Modern Executive",
            items: [4, 5],
            rating: 4.6,
            occasion: "Meetings"
          }
        ]
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6">Your Wardrobe</h3>
          <div className="grid grid-cols-2 gap-4">
            {wardrobeItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className={`relative cursor-pointer ${
                  selectedItems.includes(item.id) ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => {
                  setSelectedItems(prev =>
                    prev.includes(item.id)
                      ? prev.filter(id => id !== item.id)
                      : [...prev, item.id]
                  );
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 rounded-b-lg">
                  <p className="text-white text-sm">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6">Generated Outfits</h3>
          {isGenerating ? (
            <div className="flex items-center justify-center h-64">
              <div className="space-y-4 text-center">
                <div className="flex gap-2 justify-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                <p className="text-gray-400">Generating outfits...</p>
              </div>
            </div>
          ) : generatedOutfits ? (
            <div className="space-y-6">
              {generatedOutfits.outfits.map((outfit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                  className="bg-white/5 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{outfit.name}</h4>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-gray-400">{outfit.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{outfit.occasion}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {outfit.items.map((itemId) => {
                      const item = wardrobeItems.find(i => i.id === itemId);
                      return (
                        <img
                          key={itemId}
                          src={item.image}
                          alt={item.name}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      );
                    })}
                  </div>
              </motion.div>
            ))}
          </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400">Select items and generate outfits</p>
            </div>
          )}
        </motion.div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGenerate}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg"
        disabled={selectedItems.length < 2}
      >
        Generate Outfits
      </motion.button>
    </div>
  );
};

// Style Evolution Timeline Section
const StyleEvolution = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [evolutionData, setEvolutionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  const generateData = () => {
    setIsLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setEvolutionData({
        trends: [
          {
            period: "Week 1",
            style: "Classic Professional",
            confidence: 85,
            items: ["Blazer", "White Shirt", "Black Pants"]
          },
          {
            period: "Week 2",
            style: "Modern Minimalist",
            confidence: 88,
            items: ["Turtleneck", "Tailored Pants", "Loafers"]
          },
          {
            period: "Week 3",
            style: "Creative Executive",
            confidence: 82,
            items: ["Patterned Blouse", "Wide-Leg Pants", "Statement Jewelry"]
          }
        ],
        insights: [
          "Your style is becoming more experimental",
          "You're incorporating more color into your outfits",
          "Your confidence in mixing patterns has increased"
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedPeriod === period.id
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {period.name}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateData}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg mb-8"
      >
        Analyze Style Evolution
      </motion.button>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="space-y-4 text-center">
            <div className="flex gap-2 justify-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <p className="text-gray-400">Analyzing your style evolution...</p>
          </div>
        </div>
      ) : evolutionData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Style Timeline</h3>
            <div className="space-y-4">
              {evolutionData.trends.map((trend, idx) => (
          <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{trend.period}</h4>
                    <span className="text-purple-400">{trend.confidence}%</span>
                  </div>
                  <p className="text-gray-400 mb-4">{trend.style}</p>
                  <div className="flex flex-wrap gap-2">
                    {trend.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
          </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">AI Insights</h3>
            <div className="space-y-4">
              {evolutionData.insights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <FaRegLightbulb className="text-2xl text-purple-400 mt-1" />
                    <p className="text-gray-400">{insight}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400">Click to analyze your style evolution</p>
        </div>
      )}
    </div>
  );
};

// Main Component
const BlogOfficeFashion = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      <AnimatePresence>
        {isLoaded && (
          <>
            <ParallaxHero />
            <StyleGuideSection />
            <WardrobeSection />
            <SeasonalTrendsSection />
            <StyleTipsSection />
            
            {/* New Sections */}
            <ContentSection title="Virtual Try-On" icon={FaTshirt}>
              <VirtualTryOn />
            </ContentSection>

            <ContentSection title="Style Quiz" icon={FaRegLightbulb}>
              <StyleQuiz />
            </ContentSection>

            <ContentSection title="Trend Forecast" icon={FaChartLine}>
              <TrendForecast />
            </ContentSection>

            <ContentSection title="Interactive Lookbook" icon={FaCamera}>
              <LookbookSection />
            </ContentSection>

            <ContentSection title="Shopping Suggestions" icon={FaShoppingBag}>
              <ShoppingSuggestions />
            </ContentSection>

            {/* New AI-Enhanced Sections */}
            <ContentSection title="AI Color Analysis" icon={FaPalette}>
              <AIColorAnalysis />
            </ContentSection>

            <ContentSection title="Virtual Stylist" icon={FaRobot}>
              <VirtualStylist />
            </ContentSection>

            <ContentSection title="Fashion Trend Predictor" icon={FaChartLine}>
              <TrendPredictor />
            </ContentSection>

            <ContentSection title="AI Outfit Generator" icon={FaTshirt}>
              <OutfitGenerator />
            </ContentSection>

            <ContentSection title="Style Evolution Timeline" icon={FaHistory}>
              <StyleEvolution />
            </ContentSection>
            
            {/* Back to Top Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 p-4 bg-purple-600 rounded-full shadow-lg z-50"
            >
              <FaArrowUp className="text-white text-xl" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* AI Fashion Assistant */}
      <AIFashionAssistant />
    </div>
  );
};

export default BlogOfficeFashion;