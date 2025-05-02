import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const InclusivityShowcase = () => {
  const containerRef = useRef(null);
  
  const models = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg',
      alt: 'Model in black dress',
      outfit: 'Black Sleeveless Dress'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg',
      alt: 'Model in formal suit',
      outfit: 'Classic Black Suit'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2896840/pexels-photo-2896840.jpeg',
      alt: 'Model in hoodie',
      outfit: 'Black Hoodie Set'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg',
      alt: 'Model in business attire',
      outfit: 'Professional Suit'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/2922301/pexels-photo-2922301.jpeg',
      alt: 'Model in casual wear',
      outfit: 'Casual Black T-Shirt'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/2923157/pexels-photo-2923157.jpeg',
      alt: 'Model in blazer',
      outfit: 'Black Blazer Set'
    }
  ];

  // Duplicate models for seamless loop
  const duplicatedModels = [...models, ...models];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-serif text-center mb-8"
        >
          Inclusivity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-600 text-center max-w-2xl mx-auto text-lg"
        >
          Fashion that celebrates every individual's unique style and personality
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
        >
          {duplicatedModels.map((model, index) => (
            <motion.div
              key={`${model.id}-${index}`}
              className="flex-shrink-0 relative group"
              whileHover={{ scale: 1.05, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-[300px] h-[300px] overflow-hidden rotate-45 bg-white shadow-lg"
                   style={{
                     clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                   }}>
                <div className="w-[424px] h-[424px] -rotate-45 -translate-x-[62px] -translate-y-[62px]">
                  <img
                    src={model.image}
                    alt={model.alt}
                    className="w-full h-full object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transform: 'rotate(45deg)' }}
                  >
                    <div className="absolute bottom-12 left-0 right-0 text-center rotate-[-45deg]">
                      <p className="text-white text-lg font-medium drop-shadow-lg">
                        {model.outfit}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clone for seamless loop */}
        <motion.div
          className="flex gap-8 px-4 absolute top-0"
          animate={{
            x: [1920, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
        >
          {duplicatedModels.map((model, index) => (
            <motion.div
              key={`clone-${model.id}-${index}`}
              className="flex-shrink-0 relative group"
              whileHover={{ scale: 1.05, rotate: 45 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-[300px] h-[300px] overflow-hidden rotate-45 bg-white shadow-lg"
                   style={{
                     clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                   }}>
                <div className="w-[424px] h-[424px] -rotate-45 -translate-x-[62px] -translate-y-[62px]">
                  <img
                    src={model.image}
                    alt={model.alt}
                    className="w-full h-full object-cover"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transform: 'rotate(45deg)' }}
                  >
                    <div className="absolute bottom-12 left-0 right-0 text-center rotate-[-45deg]">
                      <p className="text-white text-lg font-medium drop-shadow-lg">
                        {model.outfit}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InclusivityShowcase; 