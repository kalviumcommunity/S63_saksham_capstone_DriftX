import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaShoppingCart, 
  FaHeart, 
  FaRegHeart, 
  FaMinus, 
  FaPlus, 
  FaShippingFast, 
  FaExchangeAlt, 
  FaShieldAlt 
} from 'react-icons/fa';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';

// Sample clothing product data
const menClothingProducts = [
  {
    _id: 'm1',
    title: "Men's Casual Denim Jacket",
    price: 79.99,
    description: "A stylish denim jacket perfect for casual outings. Made with premium quality denim that's both durable and comfortable. Features multiple pockets and adjustable cuffs.",
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: { rate: 4.5, count: 120 },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Black", "Light Blue"],
    material: "100% Cotton Denim",
    inStock: true
  },
  {
    _id: 'm2',
    title: "Men's Slim Fit Dress Shirt",
    price: 49.99,
    description: "A classic dress shirt with a modern slim fit. Perfect for formal occasions or business wear. Features a spread collar and button cuffs.",
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    rating: { rate: 4.3, count: 85 },
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue", "Black", "Pink"],
    material: "Cotton Blend",
    inStock: true
  },
  {
    _id: 'm3',
    title: "Men's Casual Chino Pants",
    price: 59.99,
    description: "Comfortable and versatile chino pants suitable for casual and semi-formal occasions. Features a straight leg fit and flat front design.",
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    rating: { rate: 4.1, count: 76 },
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Olive", "Black"],
    material: "98% Cotton, 2% Elastane",
    inStock: true
  },
  {
    _id: 'm4',
    title: "Men's Classic Polo Shirt",
    price: 34.99,
    description: "A timeless polo shirt made from soft, breathable cotton. Features a ribbed collar and cuffs, and a two-button placket.",
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=671&q=80",
    rating: { rate: 4.7, count: 142 },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Black", "Red", "Green"],
    material: "100% Cotton Pique",
    inStock: true
  }
];

const womenClothingProducts = [
  {
    _id: 'w1',
    title: "Women's Summer Floral Dress",
    price: 69.99,
    description: "A beautiful floral dress perfect for summer days. Features a flattering A-line silhouette and adjustable straps.",
    category: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
    rating: { rate: 4.6, count: 135 },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Print", "Blue Floral", "Pink Floral"],
    material: "100% Rayon",
    inStock: true
  },
  {
    _id: 'w2',
    title: "Women's High-Waisted Jeans",
    price: 59.99,
    description: "Stylish high-waisted jeans with a slim fit. Features a five-pocket design and a button and zip fly closure.",
    category: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: { rate: 4.4, count: 98 },
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Blue", "Black", "Light Wash"],
    material: "98% Cotton, 2% Elastane",
    inStock: true
  },
  {
    _id: 'w3',
    title: "Women's Casual Blouse",
    price: 39.99,
    description: "A versatile blouse that can be dressed up or down. Features a relaxed fit and button-up front.",
    category: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: { rate: 4.2, count: 87 },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Pink", "Blue"],
    material: "100% Polyester",
    inStock: true
  },
  {
    _id: 'w4',
    title: "Women's Knit Sweater",
    price: 49.99,
    description: "A cozy knit sweater perfect for cooler weather. Features a relaxed fit and ribbed cuffs and hem.",
    category: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    rating: { rate: 4.5, count: 112 },
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Black", "Burgundy"],
    material: "60% Cotton, 40% Acrylic",
    inStock: true
  }
];

// Combine all products
const allProducts = [...menClothingProducts, ...womenClothingProducts];

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [inWishlist, setInWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Fetch product data
  useEffect(() => {
    // Simulate API call
    const fetchProduct = () => {
      setLoading(true);
      
      // Find product by ID
      const foundProduct = allProducts.find(p => p._id === id);
      
      if (foundProduct) {
        // Create image gallery from main image
        foundProduct.images = [
          foundProduct.image,
          // Add additional images (in a real app, these would come from the API)
          `https://source.unsplash.com/random/600x800/?${foundProduct.category.toLowerCase().replace("'s", "").replace(" ", "-")}`,
          `https://source.unsplash.com/random/600x800/?${foundProduct.category.toLowerCase().replace("'s", "").replace(" ", "-")}-fashion`,
          `https://source.unsplash.com/random/600x800/?${foundProduct.category.toLowerCase().replace("'s", "").replace(" ", "-")}-style`
        ];
        
        setProduct(foundProduct);
        
        // Get related products (same category but different ID)
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p._id !== foundProduct._id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
  // Handle quantity change
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  // Add to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };
  
  // Toggle wishlist
  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };
  
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
  
  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container text-center py-5">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="product-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="product-details">
          {/* Product Image Gallery */}
          <motion.div 
            className="product-image-gallery"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="main-image-container">
              <motion.img 
                src={product.images[selectedImage]} 
                alt={product.title} 
                className="main-image"
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <motion.div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image} alt={`${product.title} - View ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <motion.div 
            className="product-info"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="product-category">{product.category}</span>
            <h1 className="product-title" style={{ color: '#111' }}>{product.title}</h1>
            
            <div className="product-rating">
              <div className="rating-stars">
                {renderRatingStars(product.rating.rate)}
              </div>
              <span className="rating-count">({product.rating.count} reviews)</span>
            </div>
            
            <div className="product-price">${product.price.toFixed(2)}</div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label" style={{ color: '#111' }}>Availability:</span>
                <span className="meta-value">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              
              {product.sizes && (
                <div className="meta-item">
                  <span className="meta-label" style={{ color: '#111' }}>Sizes:</span>
                  <span className="meta-value">{product.sizes.join(', ')}</span>
                </div>
              )}
              
              {product.colors && (
                <div className="meta-item">
                  <span className="meta-label" style={{ color: '#111' }}>Colors:</span>
                  <span className="meta-value">{product.colors.join(', ')}</span>
                </div>
              )}
              
              {product.material && (
                <div className="meta-item">
                  <span className="meta-label" style={{ color: '#111' }}>Material:</span>
                  <span className="meta-value">{product.material}</span>
                </div>
              )}
            </div>
            
            <div className="product-actions">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <input 
                  type="text" 
                  className="quantity-input" 
                  value={quantity} 
                  readOnly 
                />
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <FaPlus />
                </button>
              </div>
              
              <motion.button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
              
              <motion.button 
                className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                onClick={toggleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {inWishlist ? <FaHeart /> : <FaRegHeart />}
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Product Tabs */}
        <motion.div 
          className="product-tabs"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.rating.count})
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className="tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'description' && (
                <div>
                  <p>{product.description}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
                  <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
                  
                  <div className="row my-4">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <FaShippingFast className="text-primary" style={{ fontSize: '2rem', marginRight: '1rem' }} />
                        <div>
                          <h4 className="mb-1">Free Shipping</h4>
                          <p className="mb-0">On orders over $50</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <FaExchangeAlt className="text-primary" style={{ fontSize: '2rem', marginRight: '1rem' }} />
                        <div>
                          <h4 className="mb-1">Easy Returns</h4>
                          <p className="mb-0">30-day return policy</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <FaShieldAlt className="text-primary" style={{ fontSize: '2rem', marginRight: '1rem' }} />
                        <div>
                          <h4 className="mb-1">Secure Shopping</h4>
                          <p className="mb-0">Your data is protected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><strong>Material</strong></td>
                        <td>{product.material || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Available Sizes</strong></td>
                        <td>{product.sizes ? product.sizes.join(', ') : 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Available Colors</strong></td>
                        <td>{product.colors ? product.colors.join(', ') : 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Category</strong></td>
                        <td>{product.category}</td>
                      </tr>
                      <tr>
                        <td><strong>Care Instructions</strong></td>
                        <td>Machine wash cold, tumble dry low</td>
                      </tr>
                      <tr>
                        <td><strong>Country of Origin</strong></td>
                        <td>Imported</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <div className="d-flex align-items-center mb-4">
                    <div className="rating-stars" style={{ fontSize: '1.5rem' }}>
                      {renderRatingStars(product.rating.rate)}
                    </div>
                    <div className="ms-3">
                      <h3 className="mb-0">{product.rating.rate.toFixed(1)} out of 5</h3>
                      <p className="mb-0">Based on {product.rating.count} reviews</p>
                    </div>
                  </div>
                  
                  <div className="review-list">
                    <p>Customer reviews will be displayed here.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Related Products */}
        <motion.div 
          className="related-products"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="related-products-title">Related Products</h2>
          
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;