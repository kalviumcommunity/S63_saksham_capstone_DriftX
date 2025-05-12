import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Simulated API call - replace with actual API endpoint
    const fetchRecommendations = async () => {
      try {
        // Mock data for now - replace with actual API call
        const mockData = [
          {
            id: 1,
            title: "AI-Selected Premium Dress",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
            category: "Women's Fashion",
            rating: 4.8,
            reviews: 124
          },
          {
            id: 2,
            title: "Smart Casual Collection",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
            category: "Women's Fashion",
            rating: 4.6,
            reviews: 89
          },
          {
            id: 3,
            title: "Trending Summer Outfit",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
            category: "Women's Fashion",
            rating: 4.9,
            reviews: 156
          }
        ];
        setRecommendations(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/fashion-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI-Powered Recommendations
          </h2>
          <p className="text-xl text-gray-200">
            Discover your perfect style with our advanced AI
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <FaHeart className="text-white text-xl" />
                    </button>
                    <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <FaShoppingCart className="text-white text-xl" />
                    </button>
                    <button className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <FaEye className="text-white text-xl" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${item.price}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span className="text-white">{item.rating}</span>
                      <span className="text-gray-400 ml-2">({item.reviews})</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIRecommendations; 