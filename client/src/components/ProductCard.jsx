import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaTshirt, FaRuler } from "react-icons/fa";
import { useState } from "react";
import ReactGA from 'react-ga4';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  // Generate placeholder rating if not provided
  const rating = product.rating || {
    rate: Math.floor(Math.random() * 5) + 3.5,
    count: Math.floor(Math.random() * 100) + 50
  };

  // Generate placeholder description if not provided
  const description = product.description || 
    "High-quality clothing item perfect for any occasion. Made with premium materials for comfort and durability.";

  // Available sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  // Available colors with their hex codes
  const colors = [
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Green", code: "#008000" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Purple", code: "#800080" }
  ];

  // Render star ratings
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" className="text-amber-400" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} className="text-amber-400" />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col h-full overflow-hidden relative"
        whileHover={{ y: -8 }}
        onHoverStart={() => setShowOptions(true)}
        onHoverEnd={() => setShowOptions(false)}
      >
        <div className="relative h-[220px] mb-4 overflow-hidden rounded-lg bg-gray-50">
          <motion.img 
            src={product.image} 
            alt={product.name || product.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            {product.category}
          </span>
        </div>
        
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
            {product.name || product.title}
          </h3>
          
          <div className="flex items-center mb-3">
            <div className="flex gap-0.5 text-sm">
              {renderRatingStars(rating.rate)}
            </div>
            <span className="text-xs text-gray-500 ml-2">({rating.count})</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="text-xl font-bold text-primary mt-auto mb-4">
            ${product.price?.toFixed(2) || "0.00"}
          </div>
          
          <motion.button
            className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-lg py-3 font-semibold text-sm transition-all duration-300 hover:from-primary-dark hover:to-primary hover:-translate-y-0.5 flex items-center justify-center gap-2"
            onClick={() => {
              dispatch(addToCart(product));
              ReactGA.event({ category: 'Cart', action: 'Added to Cart', label: product.name || product.title });
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaShoppingCart /> Add to Cart
          </motion.button>
        </div>
      </motion.div>
      
      {/* Product Options (Sizes and Colors) */}
      <AnimatePresence>
        {showOptions && (
          <motion.div 
            className="mt-4 bg-white rounded-lg shadow-md p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Size Options */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600">
                <FaRuler />
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <span 
                    key={size} 
                    className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Color Options */}
            <div className="flex gap-2">
              {colors.map(color => (
                <span 
                  key={color.name} 
                  className="w-6 h-6 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all"
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                ></span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;
