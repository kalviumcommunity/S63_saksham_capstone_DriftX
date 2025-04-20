import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaTshirt, FaRuler } from "react-icons/fa";
import "./ProductCard.css";
import { useState } from "react";

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
      stars.push(<FaStar key={`star-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      className="product-card-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="product-card"
        whileHover={{ y: -8 }}
        onHoverStart={() => setShowOptions(true)}
        onHoverEnd={() => setShowOptions(false)}
      >
        <div className="product-image-container">
          <motion.img 
            src={product.image} 
            alt={product.name || product.title} 
            className="product-image"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <span className="product-category">{product.category}</span>
        </div>
        
        <div className="product-details">
          <h3 className="product-title">{product.name || product.title}</h3>
          
          <div className="product-rating">
            <div className="rating-stars">
              {renderRatingStars(rating.rate)}
            </div>
            <span className="rating-count">({rating.count})</span>
          </div>
          
          <p className="product-description">{description}</p>
          
          <div className="product-price">${product.price?.toFixed(2) || "0.00"}</div>
          
          <motion.button
            className="add-to-cart-btn"
            onClick={() => dispatch(addToCart(product))}
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
            className="product-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Size Options */}
            <div className="product-sizes">
              <div className="product-option-icon">
                <FaRuler />
              </div>
              <div className="size-options">
                {sizes.map(size => (
                  <span key={size} className="size-option">{size}</span>
                ))}
              </div>
            </div>
            
            {/* Color Options */}
            <div className="product-colors">
              {colors.map(color => (
                <span 
                  key={color.name} 
                  className="color-option" 
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
