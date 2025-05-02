import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ElegantWhite = () => {
  const sections = [
    {
      id: 1,
      title: "PURE ELEGANCE",
      subtitle: "SIGNATURE WHITE",
      overlayColor: "rgba(255, 255, 255, 0.2)",
      video: "/videos/sameer1.mp4",
      buttonText: "DISCOVER NOW",
      link: "/collection/pure-elegance",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-800"
    },
    {
      id: 2,
      title: "ETHEREAL GRACE",
      subtitle: "WHITE COLLECTION",
      overlayColor: "rgba(255, 255, 255, 0.2)",
      video: "/videos/sameer2.mp4",
      buttonText: "EXPLORE MORE",
      link: "/collection/ethereal",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-800"
    },
    {
      id: 3,
      title: "TIMELESS WHITE",
      subtitle: "PREMIUM SELECTION",
      overlayColor: "rgba(255, 255, 255, 0.2)",
      video: "/videos/sameer.mp4",
      buttonText: "VIEW COLLECTION",
      link: "/collection/timeless-white",
      textColor: "text-gray-900",
      buttonStyle: "bg-black text-white hover:bg-gray-800"
    }
  ];

  return (
    <div className="flex flex-row min-h-screen">
      {sections.map((section, index) => (
        <motion.div 
          key={section.id}
          className="relative w-1/3 h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
              filter: 'brightness(1.1) contrast(1.05)',
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
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-center items-start pl-12">
            <motion.p 
              className={`text-sm uppercase tracking-widest mb-3 ${section.textColor} font-medium`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            >
              {section.subtitle}
            </motion.p>
            <motion.h2 
              className={`text-4xl font-light mb-6 ${section.textColor} max-w-[280px] leading-tight`}
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
                className={`inline-block px-6 py-3 text-sm transition-all duration-300 ${section.buttonStyle} hover:scale-105`}
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

export default ElegantWhite; 