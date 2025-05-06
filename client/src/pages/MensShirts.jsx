import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalf, FaAmazon, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';

const MensShirts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState({
    delivery: [],
    size: [],
    brand: [],
    color: [],
    priceRange: [76, 22800],
    fit: [],
    material: [],
    pattern: [],
    sleeve: [],
    neckline: [],
    occasion: [],
    discount: [],
    pocketType: [],
    features: [],
    closure: [],
    newArrivals: [],
    seller: [],
    style: [],
    cuffStyle: [],
    careInstructions: [],
    availability: []
  });

  // Delivery Options
  const deliveryOptions = ['Get It Today', 'Get It by Tomorrow', 'Get It in 2 Days'];

  // Size Options
  const sizes = ['32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58'];

  // Brand Options
  const brands = [
    'Peter England',
    'Majestic Man',
    'The Indian Garage Co',
    'Allen Solly',
    'Van Heusen',
    'Dennis Lingo',
    'U.S. POLO ASSN.'
  ];

  // Colors with codes
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Grey', code: '#808080' },
    { name: 'Brown', code: '#964B00' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Pink', code: '#FFC0CB' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'Green', code: '#008000' },
    { name: 'Purple', code: '#800080' }
  ];

  // Fit Types
  const fits = [
    'Athletic Fit',
    'Classic Fit',
    'Fitted',
    'Loose Fit',
    'Modern Fit',
    'Oversized Fit',
    'Regular Fit',
    'Relaxed Fit',
    'Skinny Fit',
    'Slim Fit',
    'Tailored Fit'
  ];

  // Materials
  const materials = [
    'Art Silk',
    'Chiffon',
    'Corduroy',
    'Cotton',
    'Crepe',
    'Denim',
    'Down',
    'Fleece',
    'Georgette',
    'Leather',
    'Linen',
    'Modal',
    'Net',
    'Rayon',
    'Satin',
    'Silk',
    'Synthetic',
    'Velvet',
    'Wool'
  ];

  // Patterns
  const patterns = [
    'Animal print',
    'Argyle',
    'Camouflage',
    'Checkered',
    'Chevron',
    'Floral',
    'Houndstooth',
    'Letter print',
    'Paisley',
    'Plaid',
    'Polka dots',
    'Solid',
    'Stars',
    'Striped'
  ];

  // Sleeve Types
  const sleeves = ['Sleeveless', 'Short Sleeve', 'Half Sleeve', '3/4 Sleeve', 'Long Sleeve'];

  // Necklines
  const necklines = [
    'Asymmetric Neck',
    'Boat Neck',
    'Choker Neck',
    'Collared Neck',
    'Cowl Neck',
    'Crew Neck',
    'Halter Neck',
    'Henley Neck',
    'High Neck',
    'Hooded Neck',
    'Jewel Neck'
  ];

  // Occasions
  const occasions = [
    'Anniversary',
    'Baby Shower',
    'Bachelor Party',
    'Bachelorette Party',
    'Baptism',
    'Birthday',
    'Bridal Shower'
  ];

  // Pocket Types
  const pocketTypes = [
    'Cargo Pocket',
    'Coin Pocket',
    'Flap Pocket',
    'Jetted Pocket',
    'Kangaroo Pocket',
    'Patch Pocket',
    'Round Pocket',
    'Slant Pocket',
    'Slit Pocket',
    'Straight Pocket',
    'Welt Pocket'
  ];

  // Features
  const features = [
    'Breathable',
    'Lightweight',
    'Moisture Wicking',
    'Quick Dry',
    'Sun Protection',
    'Absorbent',
    'Adjustable'
  ];

  // Closure Types
  const closures = [
    'Button',
    'Pull On',
    'Snap',
    'Zipper',
    'Buckle',
    'Double Ring',
    'Drawstring'
  ];

  // Care Instructions
  const careInstructions = [
    'Dry Clean Only',
    'Hand Wash Only',
    'Machine Wash'
  ];

  // Discount Ranges
  const discounts = [
    '10% Off or more',
    '25% Off or more',
    '35% Off or more',
    '50% Off or more',
    '60% Off or more',
    '70% Off or more'
  ];

  // Style Options
  const styles = [
    'Business Casual',
    'Casual',
    'Comfort',
    'Evening',
    'Formal'
  ];

  // Cuff Styles
  const cuffStyles = [
    'Angle Cut Cuff',
    'Barrel Cuff',
    'Double Cuff',
    'French Cuff',
    'Ribbed Cuff',
    'Round Cut Cuff',
    'Single Cuff'
  ];

  // Sort Options
  const sortOptions = [
    'Featured',
    'Price: Low to High',
    'Price: High to Low',
    'Avg. Customer Review',
    'Newest Arrivals'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sample products data for Men's Shirts
  const sampleProducts = [
    {
      _id: "ms001",
      name: "Premium Cotton Oxford Shirt",
      category: "Men",
      subCategory: "Shirts",
      price: 79.99,
      mrp: 99.99,
      images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"],
      rating: 4.8,
      reviews: [
        { user: "John D.", comment: "Great quality and fit!", rating: 5 },
        { user: "Mike S.", comment: "Very comfortable material", rating: 5 },
        { user: "David R.", comment: "Slightly large, but good quality", rating: 4 }
      ],
      description: "A premium cotton oxford shirt perfect for any formal or semi-formal occasion. Features a classic fit with button-down collar.",
      isPrime: true,
      isBestSeller: true,
      discount: 20,
      deliveryDate: "Get it by Tomorrow"
    },
    {
      _id: "ms002",
      name: "Slim Fit Stretch Dress Shirt",
      category: "Men",
      subCategory: "Shirts",
      price: 59.99,
      mrp: 79.99,
      images: ["https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"],
      rating: 4.6,
      reviews: [
        { user: "Robert J.", comment: "Perfect slim fit, great for office wear", rating: 5 },
        { user: "Thomas K.", comment: "Good quality but wrinkles easily", rating: 4 }
      ],
      description: "A modern slim fit dress shirt with stretch fabric for comfort. Features a spread collar and convertible cuffs.",
      isPrime: true,
      discount: 25,
      deliveryDate: "Get it by Tomorrow"
    },
    {
      _id: "ms003",
      name: "Luxury Linen Blend Casual Shirt",
      category: "Men",
      subCategory: "Shirts",
      price: 89.99,
      mrp: 119.99,
      images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
      rating: 4.7,
      reviews: [
        { user: "James B.", comment: "Perfect for summer, breathable fabric", rating: 5 },
        { user: "William P.", comment: "Excellent quality, runs slightly large", rating: 4 },
        { user: "Charles M.", comment: "Great shirt, worth the price", rating: 5 }
      ],
      description: "A luxury linen blend shirt perfect for casual summer wear. Features a relaxed fit with button-down collar and chest pocket.",
      isPrime: true,
      discount: 25,
      deliveryDate: "Get it in 2 Days"
    }
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      // Ensure data is an array before filtering
      let mensShirts = Array.isArray(data) 
        ? data.filter(product => 
            product.category === 'Men' && 
            product.subCategory === 'Shirts'
          )
        : [];
      
      // If no products found from API, use sample products
      if (mensShirts.length === 0) {
        mensShirts = sampleProducts;
      }
      
      setProducts(mensShirts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use sample products on error
      setProducts(sampleProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const calculateDiscount = (price, mrp) => {
    if (!mrp || !price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  const FilterSection = ({ title, items, type, isColor = false, isExpandable = true }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayItems = isExpanded ? items : items.slice(0, 5);

    return (
      <div className="mb-6 border-b pb-4">
        <h3 className="font-semibold mb-2 text-sm text-black">{title}</h3>
        <div className="space-y-2">
          {displayItems.map((item, index) => (
            <label key={index} className="flex items-center space-x-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={filters[type].includes(isColor ? item.name : item)}
                onChange={() => handleFilterChange(type, isColor ? item.name : item)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              {isColor ? (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: item.code }}
                  />
                  <span className="text-black">{item.name}</span>
                </div>
              ) : (
                <span className="text-black">{item}</span>
              )}
            </label>
          ))}
        </div>
        {isExpandable && items.length > 5 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-black hover:text-blue-800 text-sm mt-2"
          >
            {isExpanded ? 'See Less' : `See ${items.length - 5} more`}
          </button>
        )}
      </div>
    );
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }
    return stars;
  };

  const handleSort = (option) => {
    setSortBy(option);
    setShowSortDropdown(false);
    
    const sortedProducts = [...products];
    switch (option) {
      case 'Price: Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Avg. Customer Review':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'Newest Arrivals':
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Featured sorting - could be based on a combination of factors
        sortedProducts.sort((a, b) => b.rating * b.reviews.length - a.rating * a.reviews.length);
    }
    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1480px] mx-auto px-4 py-4">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="text-sm text-gray-700">
            1-{products.length} of over 40,000 results for "<span className="text-orange-700">shirts</span>"
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded border hover:bg-gray-200 text-sm"
            >
              <span>Sort by: {sortBy}</span>
              <FaChevronDown className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSort(option)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="space-y-1">
              <FilterSection title="Delivery Day" items={deliveryOptions} type="delivery" isExpandable={false} />
              <FilterSection title="Men's Shirt Size" items={sizes} type="size" />
              <FilterSection title="Brands" items={brands} type="brand" />
              <FilterSection title="Color" items={colors} type="color" isColor={true} />
              <FilterSection title="Fit Type" items={fits} type="fit" />
              <FilterSection title="Material" items={materials} type="material" />
              <FilterSection title="Pattern" items={patterns} type="pattern" />
              <FilterSection title="Sleeve Length" items={sleeves} type="sleeve" />
              <FilterSection title="Neckline" items={necklines} type="neckline" />
              <FilterSection title="Occasion" items={occasions} type="occasion" />
              <FilterSection title="Pocket Type" items={pocketTypes} type="pocketType" />
              <FilterSection title="Features" items={features} type="features" />
              <FilterSection title="Closure Type" items={closures} type="closure" />
              <FilterSection title="Care Instructions" items={careInstructions} type="careInstructions" />
              <FilterSection title="Discount" items={discounts} type="discount" />
              <FilterSection title="Style" items={styles} type="style" />
              <FilterSection title="Cuff Style" items={cuffStyles} type="cuffStyle" />

              {/* Price Range */}
              <div className="mb-6 border-b pb-4">
                <h3 className="font-semibold mb-2 text-sm text-black">Price</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span>₹</span>
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                    }))}
                    className="w-20 p-1 border rounded"
                  />
                  <span>to</span>
                  <span>₹</span>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-20 p-1 border rounded"
                  />
                  <button className="ml-2 px-3 py-1 border rounded hover:bg-gray-100">Go</button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 8].map((_, index) => (
                  <div key={index} className="animate-pulse bg-white p-4 border rounded">
                    <div className="bg-gray-200 h-60 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link to={`/product/${product._id}`} key={product._id} className="block">
                    <div className="border rounded p-4 hover:shadow transition-shadow bg-white">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-60 object-cover mb-4"
                      />
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                        <div className="flex items-center">
                          <div className="flex items-center text-sm">
                            {renderStarRating(product.rating)}
                            <span className="ml-1 text-blue-500">({product.reviews.length})</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">₹{product.price}</span>
                          {product.mrp && (
                            <>
                              <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
                              <span className="text-sm text-green-600">
                                ({calculateDiscount(product.price, product.mrp)}% off)
                              </span>
                            </>
                          )}
                        </div>
                        {product.isPrime && (
                          <div className="flex items-center space-x-1">
                            <FaAmazon className="text-blue-500" />
                            <span className="text-xs">FREE Delivery by Amazon</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensShirts; 