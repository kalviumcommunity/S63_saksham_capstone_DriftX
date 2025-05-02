import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalf, FaAmazon, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';

const WomensPants = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState({
    delivery: [],
    size: [],
    brand: [],
    color: [],
    priceRange: [78, 32500],
    fit: [],
    material: [],
    pattern: [],
    style: [],
    occasion: [],
    discount: []
  });

  // Delivery Options
  const deliveryOptions = ['Get It Today', 'Get It by Tomorrow', 'Get It in 2 Days'];

  // Size Options (Waist sizes)
  const sizes = ['24', '26', '28', '30', '32', '34', '36', '38', '40', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Brand Options
  const brands = [
    'Zara',
    'H&M',
    'Mango',
    'Forever 21',
    'Vero Moda',
    'Only',
    'Marks & Spencer',
    'AND'
  ];

  // Colors with codes
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'Navy', code: '#000080' },
    { name: 'Grey', code: '#808080' },
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Brown', code: '#964B00' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Pink', code: '#FFC0CB' }
  ];

  // Fit Types
  const fits = [
    'Skinny Fit',
    'Slim Fit',
    'Regular Fit',
    'Relaxed Fit',
    'Boyfriend Fit',
    'Wide Leg',
    'Bootcut',
    'Straight Fit'
  ];

  // Materials
  const materials = [
    'Cotton',
    'Denim',
    'Polyester',
    'Rayon',
    'Spandex',
    'Linen',
    'Corduroy',
    'Leather'
  ];

  // Patterns
  const patterns = [
    'Solid',
    'Striped',
    'Checkered',
    'Printed',
    'Embroidered',
    'Distressed',
    'Ripped',
    'Patchwork'
  ];

  // Styles
  const styles = [
    'Casual',
    'Formal',
    'Party Wear',
    'Business Casual',
    'Athleisure',
    'Streetwear',
    'Bohemian',
    'Vintage'
  ];

  // Occasions
  const occasions = [
    'Casual',
    'Formal',
    'Party',
    'Business',
    'Beach',
    'Workout',
    'Travel',
    'Everyday'
  ];

  // Sample products data for Women's Pants
  const sampleProducts = [
    {
      _id: "wp001",
      name: "High-Waisted Skinny Jeans",
      category: "Women",
      subCategory: "Pants",
      price: 49.99,
      mrp: 69.99,
      image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.7,
      reviews: 183,
      description: "Classic high-waisted skinny jeans with a comfortable stretch. Perfect for everyday wear.",
      isPrime: true,
      isBestSeller: true,
      discount: 29,
      deliveryDate: "Get it by Tomorrow"
    },
    {
      _id: "wp002",
      name: "Wide Leg Palazzo Pants",
      category: "Women",
      subCategory: "Pants",
      price: 39.99,
      mrp: 59.99,
      image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.5,
      reviews: 142,
      description: "Flowy wide leg palazzo pants with an elastic waistband. Perfect for a comfortable yet stylish look.",
      isPrime: true,
      discount: 33,
      deliveryDate: "Get it by Tomorrow"
    },
    {
      _id: "wp003",
      name: "Formal Straight Leg Trousers",
      category: "Women",
      subCategory: "Pants",
      price: 59.99,
      mrp: 79.99,
      image: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: 4.6,
      reviews: 98,
      description: "Elegant straight leg trousers with a tailored fit. Perfect for formal and business occasions.",
      isPrime: true,
      discount: 25,
      deliveryDate: "Get it in 2 Days"
    }
  ];

  // Initialize with sample products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        if (data && data.length > 0) {
          // Filter for women's pants
          const womensPants = data.filter(
            product => 
              product.category?.toLowerCase().includes('women') && 
              product.subCategory?.toLowerCase().includes('pant')
          );
          
          if (womensPants.length > 0) {
            setProducts(womensPants);
          } else {
            // Use sample products if no women's pants are found
            setProducts(sampleProducts);
          }
        } else {
          // Use sample products if API returns empty array
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use sample products if API call fails
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const calculateDiscount = (price, mrp) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  const FilterSection = ({ title, items, type, isColor = false, isExpandable = true }) => {
    const [isExpanded, setIsExpanded] = useState(!isExpandable);

    return (
      <div className="mb-4">
        <div 
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => isExpandable && setIsExpanded(!isExpanded)}
        >
          <h3 className="font-medium text-sm">{title}</h3>
          {isExpandable && (
            <FaChevronDown className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          )}
        </div>
        {isExpanded && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${type}-${index}`}
                  checked={filters[type].includes(isColor ? item.name : item)}
                  onChange={() => handleFilterChange(type, isColor ? item.name : item)}
                  className="mr-2"
                />
                <label htmlFor={`${type}-${index}`} className="text-sm flex items-center">
                  {isColor && (
                    <span 
                      className="w-4 h-4 rounded-full inline-block mr-2" 
                      style={{ backgroundColor: item.code, border: item.name === 'White' ? '1px solid #ddd' : 'none' }}
                    />
                  )}
                  {isColor ? item.name : item}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-[#FFA41C] text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-[#FFA41C] text-sm" />);
    }
    return stars;
  };

  const handleSort = (option) => {
    setSortBy(option);
    setShowSortDropdown(false);
  };

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <div className="max-w-[1500px] mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded">
              <FilterSection title="Delivery Day" items={deliveryOptions} type="delivery" />
              <FilterSection title="Size" items={sizes} type="size" />
              <FilterSection title="Brand" items={brands} type="brand" />
              <FilterSection title="Color" items={colors} type="color" isColor={true} />
              <FilterSection title="Fit Type" items={fits} type="fit" />
              <FilterSection title="Material" items={materials} type="material" />
              <FilterSection title="Pattern" items={patterns} type="pattern" />
              <FilterSection title="Style" items={styles} type="style" />
              <FilterSection title="Occasion" items={occasions} type="occasion" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white p-4 mb-4 flex justify-between items-center">
              <div className="text-sm text-[#565959]">
                <span>1-{products.length} of over 50,000 results for</span>
                <span className="ml-2 font-bold text-[#C45500]">"women's pants"</span>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-sm border rounded px-3 py-1.5"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  Sort by: {sortBy}
                  <FaChevronDown className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border rounded shadow-lg z-10">
                    {['Featured', 'Price: Low to High', 'Price: High to Low', 'Avg. Customer Review', 'Newest Arrivals'].map((option) => (
                      <div
                        key={option}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSort(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4"
                  >
                    <Link to={`/product/${product._id}`} className="block">
                      <div className="relative pt-[100%] mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-contain hover:opacity-90"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                          }}
                        />
                        {product.isBestSeller && (
                          <div className="absolute top-2 left-2 bg-[#E67A00] text-white text-xs px-2 py-1">
                            Best Seller
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-sm text-[#0F1111] hover:text-[#C45500] line-clamp-2 min-h-[40px]">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                          {renderStarRating(product.rating)}
                        </div>
                        <span className="text-sm text-[#007185] hover:text-[#C45500]">
                          {product.reviews.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="mb-1">
                        <span className="text-xs align-top">₹</span>
                        <span className="text-xl font-medium">{product.price}</span>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-[#565959]">M.R.P.:</span>
                          <span className="text-[#565959] line-through">₹{product.mrp}</span>
                          <span className="text-[#CC0C39]">({product.discount}% off)</span>
                        </div>
                      </div>
                      
                      {product.isPrime && (
                        <div className="flex items-center gap-1">
                          <img 
                            src="https://m.media-amazon.com/images/G/31/marketing/prime/badge/icon-prime-blue._CB633810007_.png"
                            alt="Prime"
                            className="h-[18px]"
                          />
                          <span className="text-sm text-[#565959]">{product.deliveryDate}</span>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomensPants;