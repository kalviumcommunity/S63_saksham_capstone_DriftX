import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      className="w-12 h-12 rounded-full border-4 border-gray-200"
      style={{
        borderTopColor: '#000',
      }}
      animate={{
        rotate: 360
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default LoadingSpinner; 