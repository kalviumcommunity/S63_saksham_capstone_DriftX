import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ClassicNeutrals = () => {
  const sections = [
    {
      id: 0,
      title: "LUXURY ESSENTIALS",
      subtitle: "NEW ARRIVALS",
      overlayColor: "rgba(250, 250, 250, 0.3)",
      video: "/videos/lady1.mp4",
      buttonText: "SHOP NOW",
      link: "/collection/luxury",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-900",
      animation: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    },
    {
      id: 1,
      title: "TIMELESS ELEGANCE",
      subtitle: "SIGNATURE COLLECTION",
      overlayColor: "rgba(245, 245, 245, 0.3)",
      video: "/videos/lady3.mp4",
      buttonText: "EXPLORE NOW",
      link: "/collection/timeless",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-900",
      animation: { initial: { x: 100, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    },
    {
      id: 2,
      title: "MINIMAL LUXE",
      subtitle: "PREMIUM ESSENTIALS",
      overlayColor: "rgba(230, 230, 230, 0.3)",
      video: "/videos/lady2.mp4",
      buttonText: "DISCOVER MORE",
      link: "/collection/minimal",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-900",
      animation: { initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 } }
    }
  ];

  return (
    <div className="flex flex-col">
      {sections.map((section, index) => (
        <motion.div 
          key={section.id}
          className="relative w-full h-[33vh] overflow-hidden"
          initial={section.animation.initial}
          animate={section.animation.animate}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.3,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          {/* Background Video */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, delay: index * 0.3 }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
              }}
            >
              <source src={section.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: section.overlayColor }}
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 md:px-12 lg:px-16">
            <motion.p 
              className={`text-[10px] md:text-xs uppercase tracking-widest mb-1 ${section.textColor} font-medium`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.3 }}
            >
              {section.subtitle}
            </motion.p>
            <motion.h2 
              className={`text-2xl md:text-3xl lg:text-4xl font-light mb-3 ${section.textColor} max-w-[300px] leading-tight`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.3 }}
            >
              {section.title}
            </motion.h2>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.3 }}
            >
              <Link
                to={section.link}
                className={`inline-block px-4 py-1.5 text-xs transition-all duration-300 ${section.buttonStyle} hover:scale-105`}
              >
                {section.buttonText}
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator (except for last section) */}
          {index < sections.length - 1 && (
            <motion.div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 6, 0] }}
              transition={{
                opacity: { duration: 0.3, delay: 1.2 + index * 0.3 },
                y: { duration: 1.5, repeat: Infinity }
              }}
            >
              <svg 
                className="w-4 h-4"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ClassicNeutrals; 