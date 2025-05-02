import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const ProductShowcase = () => {
  const [positions, setPositions] = useState([0, 1, 2, 3, 4, 5]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const images = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg',
      alt: 'Model in black coat'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg',
      alt: 'Model in casual wear'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg',
      alt: 'Model in denim'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg',
      alt: 'Model in green'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/2923157/pexels-photo-2923157.jpeg',
      alt: 'Model portrait'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
      alt: 'Model in winter wear'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions => {
        const newPositions = [...prevPositions];
        // Move the last grid image to main image position
        const lastIndex = newPositions.pop();
        newPositions.unshift(lastIndex);
        return newPositions;
      });

      setMainImageIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 
            className="text-4xl font-serif mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Use cases
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Image */}
            <motion.div
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImageIndex}
                    src={images[mainImageIndex].url}
                    alt={images[mainImageIndex].alt}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.5 },
                      scale: { duration: 0.7 }
                    }}
                  />
                </AnimatePresence>
              </div>
              <motion.p 
                className="text-center mt-4 mb-6 text-gray-600 px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Create consistent, professional product images across your catalog.
              </motion.p>
            </motion.div>

            {/* Grid Images */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {positions.slice(0, 5).map((imageIndex, gridPosition) => (
                <motion.div
                  key={images[imageIndex].id}
                  className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: gridPosition * 0.1
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.img
                    src={images[imageIndex].url}
                    alt={images[imageIndex].alt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase; 