import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef as useThreeRef } from 'react';

// 3D model for each outfit type
const Outfit3DModel = ({ type }) => {
  const meshRef = useThreeRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.7;
      meshRef.current.position.y = 0.2 + Math.sin(clock.getElapsedTime() * 1.2) * 0.1;
    }
  });
  if (type === 'dress') {
    return (
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.4, 1.6, 32]} />
        <meshStandardMaterial color="#e75480" opacity={0.95} transparent />
      </mesh>
    );
  }
  if (type === 'shirt') {
    return (
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[1.1, 0.7, 0.6]} />
        <meshStandardMaterial color="#4a90e2" opacity={0.95} transparent />
      </mesh>
    );
  }
  if (type === 'pants') {
    return (
      <mesh ref={meshRef} position={[0, -0.5, 0]}>
        <boxGeometry args={[0.5, 1.2, 0.5]} />
        <meshStandardMaterial color="#222" opacity={0.95} transparent />
      </mesh>
    );
  }
  if (type === 'shoe') {
    return (
      <mesh ref={meshRef} position={[0, -1, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.3]} />
        <meshStandardMaterial color="#f5e6e0" />
      </mesh>
    );
  }
  if (type === 'bag') {
    return (
      <mesh ref={meshRef} position={[0.8, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
    );
  }
  if (type === 'hat') {
    return (
      <mesh ref={meshRef} position={[0, 1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#ffe066" />
      </mesh>
    );
  }
  // Default: a glowing sphere
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={0.7} />
    </mesh>
  );
};

// Map outfit names to types
const outfitTypeMap = {
  'Floral Dress': 'dress',
  'Shirt': 'shirt',
  'Chinos': 'pants',
  'Sandals': 'shoe',
  'Sun Hat': 'hat',
  'Loafers': 'shoe',
  'Bag': 'bag',
};

const outfitSuggestions = [
  {
    question: 'What should I wear to a summer party?',
    answer: 'A floral dress with sandals and a sun hat would be perfect for a summer party!',
    outfit: [
      { name: 'Floral Dress', image: 'https://cdn.dummyjson.com/product-images/womens-dresses/1.webp' },
      { name: 'Sandals', image: 'https://cdn.dummyjson.com/product-images/womens-shoes/1.webp' },
      { name: 'Sun Hat', image: 'https://cdn.dummyjson.com/product-images/womens-bags/1.webp' }
    ]
  },
  {
    question: 'Suggest a business casual look for men.',
    answer: 'A crisp shirt, chinos, and loafers make a great business casual look.',
    outfit: [
      { name: 'Shirt', image: 'https://cdn.dummyjson.com/product-images/mens-shirts/1.webp' },
      { name: 'Chinos', image: 'https://cdn.dummyjson.com/product-images/mens-shoes/1.webp' },
      { name: 'Loafers', image: 'https://cdn.dummyjson.com/product-images/mens-shoes/2.webp' }
    ]
  }
];

const LiveStyleAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [selectedType, setSelectedType] = useState('dress');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = {
        type: 'bot',
        content: data.response || "I'm here to help you with fashion advice!",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExample = (example) => {
    // Find the first relevant type for the 3D model
    const firstType = outfitTypeMap[example.outfit[0]?.name] || 'dress';
    setSelectedType(firstType);
    setInput(example.question);
    setMessages(prev => [...prev, { type: 'user', content: example.question, timestamp: new Date().toISOString() }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: example.answer, timestamp: new Date().toISOString() }]);
    }, 1000);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Fullscreen 3D Model */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1, 5], fov: 50 }} className="w-full h-full">
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 7]} intensity={1.2} />
          {/* Animated hologram ring */}
          <mesh position={[0, -1.2, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <torusGeometry args={[1.5, 0.07, 16, 100]} />
            <meshStandardMaterial color="#00eaff" emissive="#00eaff" emissiveIntensity={0.7} transparent opacity={0.25} />
          </mesh>
          {/* Main 3D model */}
          <Outfit3DModel type={selectedType} />
          {/* Floating particles */}
          {[...Array(18)].map((_, i) => (
            <mesh key={i} position={[
              Math.sin(i) * 2.5 + Math.cos(i * 2) * 0.7,
              1.2 + Math.sin(i * 1.3) * 0.7,
              Math.cos(i) * 2.5 + Math.sin(i * 2) * 0.7
            ]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#00eaff" transparent opacity={0.18} />
            </mesh>
          ))}
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 pointer-events-none" />
      </div>
      {/* Overlayed Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 mt-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Style Assistant
          </h2>
          <p className="text-xl text-gray-200">
            Get instant fashion advice from our AI stylist
          </p>
        </motion.div>
        <div className="flex gap-4 mb-8">
          {outfitSuggestions.map((ex, idx) => (
            <button key={idx} onClick={() => handleExample(ex)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm">Try Example {idx + 1}</button>
          ))}
        </div>
        {/* Chat Window */}
        <div className="w-full max-w-xl mx-auto">
          <div className="fixed bottom-8 right-8 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <FaRobot className="text-2xl" />
            </motion.button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-24 right-8 w-96 h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden z-50"
              >
                {/* Chat Header */}
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-xl" />
                    <h3 className="font-semibold">Style Assistant</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:text-gray-200 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="h-[calc(100%-8rem)] overflow-y-auto p-4 bg-gray-50"
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask for fashion advice..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LiveStyleAssistant; 