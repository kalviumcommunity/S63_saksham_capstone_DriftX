import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalf, FaAmazon, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/api';

const WomensAccessories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Featured');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filters, setFilters] = useState({
    delivery: [],
    category: [],
    brand: [],
    jewelryMaterial: [],
    metalType: [],
    stoneType: [],
    chainType: [],
    color: [],
    priceRange: [25, 1614200],
    jewelryType: [],
    necklaceType: [],
    stoneShape: [],
    numberStones: [],
    jewelryFashionBrands: [],
    discount: [],
    availability: []
  });

  // Delivery Options
  const deliveryOptions = ['Get It Today', 'Get It by Tomorrow', 'Get It in 2 Days'];

  // Categories
  const categories = [
    'Jewelry',
    'Handbags',
    'Watches',
    'Sunglasses',
    'Scarves & Wraps',
    'Hair Accessories',
    'Belts',
    'Wallets'
  ];

  // Brands
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

  // Jewelry Material
  const jewelryMaterials = [
    'Gold',
    'Silver',
    'Platinum',
    'Stainless Steel',
    'Brass',
    'Copper',
    'Leather',
    'Fabric',
    'Plastic',
    'Pearl',
    'Crystal',
    'Gemstone'
  ];

  // Metal Types
  const metalTypes = [
    'Yellow Gold',
    'White Gold',
    'Rose Gold',
    'Sterling Silver',
    'Platinum',
    'Stainless Steel',
    'Titanium',
    'Brass',
    'Copper',
    'Alloy'
  ];

  // Stone Types
  const stoneTypes = [
    'Diamond',
    'Ruby',
    'Sapphire',
    'Emerald',
    'Pearl',
    'Amethyst',
    'Topaz',
    'Opal',
    'Garnet',
    'Citrine',
    'Aquamarine',
    'Turquoise',
    'Cubic Zirconia',
    'Crystal'
  ];

  // Chain Types
  const chainTypes = [
    'Cable',
    'Rope',
    'Box',
    'Snake',
    'Figaro',
    'Curb',
    'Wheat',
    'Bead',
    'Singapore',
    'Herringbone',
    'Omega',
    'Rolo'
  ];

  // Colors
  const colors = [
    { name: 'Gold', code: '#FFD700' },
    { name: 'Silver', code: '#C0C0C0' },
    { name: 'Rose Gold', code: '#B76E79' },
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Pink', code: '#FFC0CB' },
    { name: 'Green', code: '#008000' },
    { name: 'Purple', code: '#800080' },
    { name: 'Brown', code: '#964B00' },
    { name: 'Multi', code: 'linear-gradient(45deg, red, blue, green)' }
  ];

  // Jewelry Types
  const jewelryTypes = [
    'Necklaces',
    'Earrings',
    'Bracelets',
    'Rings',
    'Anklets',
    'Brooches',
    'Pendants',
    'Sets'
  ];

  // Necklace Types
  const necklaceTypes = [
    'Choker',
    'Pendant',
    'Chain',
    'Lariat',
    'Bib',
    'Collar',
    'Statement',
    'Layered'
  ];

  // Stone Shapes
  const stoneShapes = [
    'Round',
    'Princess',
    'Oval',
    'Marquise',
    'Pear',
    'Cushion',
    'Emerald',
    'Asscher',
    'Heart',
    'Radiant',
    'Baguette',
    'Trillion'
  ];

  // Number of Stones
  const numberStones = [
    'Single Stone',
    '2 Stones',
    '3 Stones',
    '4-10 Stones',
    '10+ Stones'
  ];

  // Jewelry Fashion Brands
  const jewelryFashionBrands = [
    'Luxury Brands',
    'Designer Brands',
    'Fashion Brands',
    'Handcrafted'
  ];

  // Discounts
  const discounts = [
    '10% Off or more',
    '25% Off or more',
    '35% Off or more',
    '50% Off or more',
    '60% Off or more',
    '70% Off or more'
  ];

  // Sort options
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Avg. Customer Review', 'Newest Arrivals'];

  // Sample products data for Women's Accessories
  const sampleProducts = [
    {
      _id: "wa001",
      name: "Elegant Pearl Necklace",
      category: "Women",
      subCategory: "Accessories",
      price: 79.99,
      mrp: 129.99,
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"],
      rating: 4.8,
      reviews: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }, { id: 35 }, { id: 36 }, { id: 37 }, { id: 38 }, { id: 39 }, { id: 40 }, { id: 41 }, { id: 42 }, { id: 43 }, { id: 44 }, { id: 45 }, { id: 46 }, { id: 47 }, { id: 48 }, { id: 49 }, { id: 50 }, { id: 51 }, { id: 52 }, { id: 53 }, { id: 54 }, { id: 55 }, { id: 56 }, { id: 57 }, { id: 58 }, { id: 59 }, { id: 60 }, { id: 61 }, { id: 62 }, { id: 63 }, { id: 64 }, { id: 65 }, { id: 66 }, { id: 67 }, { id: 68 }, { id: 69 }, { id: 70 }, { id: 71 }, { id: 72 }, { id: 73 }, { id: 74 }, { id: 75 }, { id: 76 }, { id: 77 }, { id: 78 }, { id: 79 }, { id: 80 }, { id: 81 }, { id: 82 }, { id: 83 }, { id: 84 }, { id: 85 }, { id: 86 }, { id: 87 }, { id: 88 }, { id: 89 }, { id: 90 }, { id: 91 }, { id: 92 }, { id: 93 }, { id: 94 }, { id: 95 }, { id: 96 }, { id: 97 }, { id: 98 }, { id: 99 }, { id: 100 }, { id: 101 }, { id: 102 }, { id: 103 }, { id: 104 }, { id: 105 }, { id: 106 }, { id: 107 }, { id: 108 }, { id: 109 }, { id: 110 }, { id: 111 }, { id: 112 }, { id: 113 }, { id: 114 }, { id: 115 }, { id: 116 }, { id: 117 }, { id: 118 }, { id: 119 }, { id: 120 }],
      description: "Elegant pearl necklace with sterling silver clasp. Perfect for special occasions and formal events.",
      prime: true,
      discount: 38
    },
    {
      _id: "wa002",
      name: "Designer Leather Handbag",
      category: "Women",
      subCategory: "Accessories",
      price: 149.99,
      mrp: 249.99,
      images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"],
      rating: 4.7,
      reviews: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }, { id: 35 }, { id: 36 }, { id: 37 }, { id: 38 }, { id: 39 }, { id: 40 }, { id: 41 }, { id: 42 }, { id: 43 }, { id: 44 }, { id: 45 }, { id: 46 }, { id: 47 }, { id: 48 }, { id: 49 }, { id: 50 }, { id: 51 }, { id: 52 }, { id: 53 }, { id: 54 }, { id: 55 }, { id: 56 }, { id: 57 }, { id: 58 }, { id: 59 }, { id: 60 }, { id: 61 }, { id: 62 }, { id: 63 }, { id: 64 }, { id: 65 }, { id: 66 }, { id: 67 }, { id: 68 }, { id: 69 }, { id: 70 }, { id: 71 }, { id: 72 }, { id: 73 }, { id: 74 }, { id: 75 }, { id: 76 }, { id: 77 }, { id: 78 }, { id: 79 }, { id: 80 }, { id: 81 }, { id: 82 }, { id: 83 }, { id: 84 }, { id: 85 }],
      description: "Designer leather handbag with multiple compartments and adjustable strap. Perfect for everyday use and special occasions.",
      prime: true,
      discount: 40
    },
    {
      _id: "wa003",
      name: "Luxury Sunglasses",
      category: "Women",
      subCategory: "Accessories",
      price: 99.99,
      mrp: 159.99,
      images: ["https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"],
      rating: 4.6,
      reviews: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }, { id: 35 }, { id: 36 }, { id: 37 }, { id: 38 }, { id: 39 }, { id: 40 }, { id: 41 }, { id: 42 }, { id: 43 }, { id: 44 }, { id: 45 }, { id: 46 }, { id: 47 }, { id: 48 }, { id: 49 }, { id: 50 }, { id: 51 }, { id: 52 }, { id: 53 }, { id: 54 }, { id: 55 }, { id: 56 }, { id: 57 }, { id: 58 }, { id: 59 }, { id: 60 }, { id: 61 }, { id: 62 }, { id: 63 }, { id: 64 }, { id: 65 }],
      description: "Luxury sunglasses with UV protection and polarized lenses. Stylish design with durable frame.",
      prime: true,
      discount: 38
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        if (data && data.length > 0) {
          // Filter for women's accessories
          const womensAccessories = data.filter(
            product => 
              product.category?.toLowerCase().includes('women') && 
              product.subCategory?.toLowerCase().includes('accessor')
          );
          
          if (womensAccessories.length > 0) {
            setProducts(womensAccessories);
          } else {
            // Use sample products if no women's accessories are found
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

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const handleSort = (option) => {
    setSortBy(option);
    setShowSortDropdown(false);
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

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300" />);
    }

    return <div className="flex">{stars}</div>;
  };

  const calculateDiscount = (price, mrp) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  // Filter Section Component
  const FilterSection = ({ title, items, type, isColor = false, isExpandable = true }) => {
    const [isExpanded, setIsExpanded] = useState(!isExpandable);

    return (
      <div className="border-b pb-4">
        <div 
          className="flex justify-between items-center cursor-pointer py-2"
          onClick={() => isExpandable && setIsExpanded(!isExpanded)}
        >
          <h3 className="font-medium text-sm">{title}</h3>
          {isExpandable && (
            <FaChevronDown className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          )}
        </div>
        
        {isExpanded && (
          <div className="space-y-2 mt-2">
            {isColor ? (
              <div className="grid grid-cols-4 gap-2">
                {items.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleFilterChange(type, color.name)}
                    className={`w-6 h-6 rounded-full border-2 ${
                      filters[type].includes(color.name) ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    style={{
                      background: color.code,
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {items.map((item) => (
                  <label key={item} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters[type].includes(item)}
                      onChange={() => handleFilterChange(type, item)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1480px] mx-auto px-4 py-4">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="text-sm text-gray-700">
            <span className="text-orange-700">Women's Accessories</span>
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
              <FilterSection title="Category" items={categories} type="category" />
              <FilterSection title="Jewellery Fashion Brands" items={jewelryFashionBrands} type="jewelryFashionBrands" />
              <FilterSection title="Brands" items={brands} type="brand" />
              <FilterSection title="Jewellery Material" items={jewelryMaterials} type="jewelryMaterial" />
              <FilterSection title="Metal Type" items={metalTypes} type="metalType" />
              <FilterSection title="Stone Type" items={stoneTypes} type="stoneType" />
              <FilterSection title="Chain Type" items={chainTypes} type="chainType" />
              <FilterSection title="Color" items={colors} type="color" isColor={true} />
              <FilterSection title="Jewellery Type" items={jewelryTypes} type="jewelryType" />
              <FilterSection title="Necklace Type" items={necklaceTypes} type="necklaceType" />
              <FilterSection title="Stone Shape" items={stoneShapes} type="stoneShape" />
              <FilterSection title="Number of Stones" items={numberStones} type="numberStones" />
              <FilterSection title="Discount" items={discounts} type="discount" />
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
                        {product.prime && (
                          <div className="flex items-center space-x-1">
                            <FaAmazon className="text-blue-500" />
                            <span className="text-xs text-blue-500">prime</span>
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

export default WomensAccessories;