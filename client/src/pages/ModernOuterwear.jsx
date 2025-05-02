import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ModernOuterwear = () => {
  const sections = [
    {
      id: 1,
      title: "COSY & COMFORT",
      subtitle: "MOST-LOVED COLLECTIONS",
      overlayColor: "rgba(245, 230, 224, 0.7)",
      video: "/videos/women1.mp4",
      buttonText: "DISCOVER NOW",
      link: "/collection/cosy",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-900"
    },
    {
      id: 2,
      title: "STAY REAL",
      subtitle: "URBAN COLLECTION",
      overlayColor: "rgba(0, 0, 0, 0.4)",
      video: "/videos/women2.mp4",
      buttonText: "SHOP NOW",
      link: "/collection/urban",
      textColor: "text-white",
      buttonStyle: "bg-white text-black hover:bg-gray-100"
    },
    {
      id: 3,
      title: "MODERN EDGE",
      subtitle: "CONTEMPORARY STYLES",
      overlayColor: "rgba(45, 45, 45, 0.6)",
      video: "/videos/women3.mp4",
      buttonText: "EXPLORE",
      link: "/collection/modern",
      textColor: "text-white",
      buttonStyle: "bg-white text-black hover:bg-gray-100"
    },
    {
      id: 4,
      title: "ELEGANT VIBES",
      subtitle: "PREMIUM SELECTION",
      overlayColor: "rgba(200, 200, 200, 0.5)",
      video: "/videos/women4.mp4",
      buttonText: "VIEW MORE",
      link: "/collection/elegant",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-900"
    },
    {
      id: 5,
      title: "STREET STYLE",
      subtitle: "TRENDING NOW",
      overlayColor: "rgba(0, 0, 0, 0.5)",
      video: "/videos/women5.mp4",
      buttonText: "GET THE LOOK",
      link: "/collection/street",
      textColor: "text-white",
      buttonStyle: "bg-white text-black hover:bg-gray-100"
    }
  ];

  return (
    <div className="flex flex-row min-h-screen">
      {sections.map((section, index) => (
        <motion.div 
          key={section.id}
          className="relative w-1/5 h-screen"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: 'brightness(1.1) contrast(1.1)',
            }}
          >
            <source src={section.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: section.overlayColor }}
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-10 p-6 flex flex-col justify-center items-center text-center">
            <motion.p 
              className={`text-xs uppercase tracking-widest mb-2 ${section.textColor} font-medium`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              {section.subtitle}
            </motion.p>
            <motion.h2 
              className={`text-2xl font-light mb-4 ${section.textColor}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
            >
              {section.title}
            </motion.h2>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
            >
              <Link
                to={section.link}
                className={`inline-block px-4 py-2 text-sm transition-all duration-300 shadow-lg ${section.buttonStyle} hover:scale-105`}
              >
                {section.buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ModernOuterwear; 