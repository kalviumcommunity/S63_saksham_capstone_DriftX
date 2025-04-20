import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaShoppingBag, FaHeart, FaEdit, FaKey, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import { logout } from '../redux/slices/userSlice';
import './UserProfile.css';

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo } = useSelector((state) => state.user);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  useEffect(() => {
    // Redirect if not logged in
    if (!userInfo) {
      navigate('/login');
      return;
    }
    
    // Initialize form data with user info
    setFormData({
      username: userInfo.username || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      address: userInfo.address || '',
    });
    
    // Set profile image if available
    if (userInfo.avatar) {
      setImagePreview(userInfo.avatar);
    }
    
    // Fetch orders (mock data for now)
    const mockOrders = [
      {
        id: 'ORD-1234',
        date: '2023-04-15',
        total: 129.99,
        status: 'Delivered',
        items: 3
      },
      {
        id: 'ORD-5678',
        date: '2023-03-22',
        total: 79.50,
        status: 'Processing',
        items: 2
      },
      {
        id: 'ORD-9012',
        date: '2023-02-10',
        total: 45.75,
        status: 'Delivered',
        items: 1
      }
    ];
    
    // Fetch wishlist (mock data for now) - clothing items only
    const mockWishlist = [
      {
        id: 1,
        title: 'Men\'s Denim Jacket',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        category: 'Men\'s Clothing'
      },
      {
        id: 2,
        title: 'Women\'s Summer Dress',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80',
        category: 'Women\'s Clothing'
      }
    ];
    
    setOrders(mockOrders);
    setWishlist(mockWishlist);
    setLoading(false);
  }, [userInfo, navigate]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // In a real app, you would upload this file to the server
      // const formData = new FormData();
      // formData.append('avatar', file);
      // uploadProfileImage(formData);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Here you would typically make an API call to update the user profile
    console.log('Updating profile with:', formData);
    
    // For now, just toggle editing mode off
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const handleRemoveFromWishlist = (id) => {
    // Here you would typically make an API call to remove the item from wishlist
    setWishlist(wishlist.filter(item => item.id !== id));
  };
  
  if (loading) {
    return (
      <div className="d-flex justify-center align-items-center" style={{ height: "24rem" }}>
        <motion.div 
          className="spinner-border text-primary"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }
  
  return (
    <motion.div 
      className="container py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        variants={itemVariants}
      >
        <motion.div 
          className="bg-gradient-primary py-6 px-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl font-bold text-white"
            variants={itemVariants}
          >
            My Account
          </motion.h1>
        </motion.div>
        
        <div className="row">
          {/* Sidebar */}
          <motion.div 
            className="col-md-3 bg-gray-50 p-6 border-r border-gray-200"
            variants={itemVariants}
          >
            <motion.div 
              className="d-flex flex-column align-items-center mb-8"
              variants={itemVariants}
            >
              <div className="position-relative">
                <motion.div 
                  className="profile-avatar-container mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {imagePreview ? (
                    <motion.img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="profile-avatar"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <motion.div 
                      className="profile-avatar d-flex align-items-center justify-center"
                      animate={{ 
                        backgroundColor: ["#f3f4f6", "#e5e7eb", "#f3f4f6"],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <FaUser className="text-gray-400 text-4xl" />
                    </motion.div>
                  )}
                  <motion.label 
                    htmlFor="profile-upload" 
                    className="profile-avatar-upload"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaUpload size={14} />
                    <input 
                      id="profile-upload" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none" 
                    />
                  </motion.label>
                </motion.div>
              </div>
              <motion.h2 
                className="profile-username"
                variants={itemVariants}
              >
                {formData.username}
              </motion.h2>
              <motion.p 
                className="profile-email"
                variants={itemVariants}
              >
                {formData.email}
              </motion.p>
            </motion.div>
            
            <motion.nav 
              className="profile-nav"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setActiveTab('profile')}
                className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaUser className="mr-3" />
                Profile Information
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('orders')}
                className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaShoppingBag className="mr-3" />
                My Orders
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('wishlist')}
                className={`profile-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaHeart className="mr-3" />
                Wishlist
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('password')}
                className={`profile-nav-item ${activeTab === 'password' ? 'active' : ''}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaKey className="mr-3" />
                Change Password
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="profile-nav-item logout"
                whileHover={{ x: 5, backgroundColor: "#fee2e2" }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </motion.button>
            </motion.nav>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="col-md-9 profile-content"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInVariants}
                >
                  <motion.div 
                    className="profile-section-header"
                    variants={itemVariants}
                  >
                    <motion.h2 
                      className="profile-section-title"
                      variants={itemVariants}
                    >
                      Profile Information
                    </motion.h2>
                    <motion.button
                      onClick={handleEditToggle}
                      className="profile-edit-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={itemVariants}
                    >
                      <FaEdit className="mr-1" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </motion.button>
                  </motion.div>
                  
                  <motion.form 
                    onSubmit={handleProfileUpdate} 
                    className="profile-form"
                    variants={containerVariants}
                  >
                    <motion.div variants={itemVariants}>
                      <label htmlFor="username" className="profile-form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="profile-form-input"
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="profile-form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="profile-form-input"
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label htmlFor="phone" className="profile-form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="profile-form-input"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="profile-form-full"
                      variants={itemVariants}
                    >
                      <label htmlFor="address" className="profile-form-label">
                        Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="profile-form-textarea"
                      ></textarea>
                    </motion.div>
                    
                    {isEditing && (
                      <motion.div 
                        className="profile-form-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          type="submit"
                          className="btn btn-primary"
                          whileHover={buttonVariants.hover}
                          whileTap={buttonVariants.tap}
                        >
                          Save Changes
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.form>
                </motion.div>
              )}
              
              {/* Orders */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInVariants}
                >
                  <motion.h2 
                    className="profile-section-title mb-6"
                    variants={itemVariants}
                  >
                    My Orders
                  </motion.h2>
                  
                  {orders.length === 0 ? (
                    <motion.div 
                      className="profile-empty"
                      variants={containerVariants}
                    >
                      <motion.div
                        variants={itemVariants}
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0, -5, 0],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <FaShoppingBag className="profile-empty-icon" />
                      </motion.div>
                      <motion.h3 
                        className="profile-empty-title"
                        variants={itemVariants}
                      >
                        No orders yet
                      </motion.h3>
                      <motion.p 
                        className="profile-empty-text"
                        variants={itemVariants}
                      >
                        You haven't placed any orders yet.
                      </motion.p>
                      <motion.div variants={itemVariants}>
                        <Link 
                          to="/" 
                          className="btn btn-primary"
                        >
                          Start Shopping
                        </Link>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="overflow-x-auto"
                      variants={containerVariants}
                    >
                      <table className="profile-orders-table">
                        <thead>
                          <tr>
                            <motion.th variants={itemVariants}>Order ID</motion.th>
                            <motion.th variants={itemVariants}>Date</motion.th>
                            <motion.th variants={itemVariants}>Items</motion.th>
                            <motion.th variants={itemVariants}>Total</motion.th>
                            <motion.th variants={itemVariants}>Status</motion.th>
                            <motion.th variants={itemVariants}><span className="sr-only">View</span></motion.th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <motion.tr 
                              key={order.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ backgroundColor: "#f9fafb" }}
                            >
                              <td className="font-medium">{order.id}</td>
                              <td>{order.date}</td>
                              <td>{order.items}</td>
                              <td>${order.total.toFixed(2)}</td>
                              <td>
                                <motion.span 
                                  className={`profile-order-status ${
                                    order.status === 'Delivered' 
                                      ? 'profile-order-status-delivered' 
                                      : 'profile-order-status-processing'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {order.status}
                                </motion.span>
                              </td>
                              <td className="text-right">
                                <motion.div whileHover={{ scale: 1.1 }}>
                                  <Link to={`/orders/${order.id}`} className="text-primary">
                                    View
                                  </Link>
                                </motion.div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {/* Wishlist */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInVariants}
                >
                  <motion.h2 
                    className="profile-section-title mb-6"
                    variants={itemVariants}
                  >
                    My Wishlist
                  </motion.h2>
                  
                  {wishlist.length === 0 ? (
                    <motion.div 
                      className="profile-empty"
                      variants={containerVariants}
                    >
                      <motion.div
                        variants={itemVariants}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          color: ["#d1d5db", "#ef4444", "#d1d5db"]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <FaHeart className="profile-empty-icon" />
                      </motion.div>
                      <motion.h3 
                        className="profile-empty-title"
                        variants={itemVariants}
                      >
                        Your wishlist is empty
                      </motion.h3>
                      <motion.p 
                        className="profile-empty-text"
                        variants={itemVariants}
                      >
                        Add items to your wishlist to save them for later.
                      </motion.p>
                      <motion.div variants={itemVariants}>
                        <Link 
                          to="/" 
                          className="btn btn-primary"
                        >
                          Explore Products
                        </Link>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="profile-wishlist"
                      variants={containerVariants}
                    >
                      {wishlist.map((item, index) => (
                        <motion.div 
                          key={item.id} 
                          className="profile-wishlist-item"
                          variants={itemVariants}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5 }}
                        >
                          <motion.img 
                            src={item.image} 
                            alt={item.title} 
                            className="profile-wishlist-image"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                          <div className="profile-wishlist-details">
                            <div>
                              <h3 className="profile-wishlist-title">
                                {item.title}
                              </h3>
                              <p className="profile-wishlist-price">${item.price.toFixed(2)}</p>
                              <p className="text-sm text-gray">{item.category}</p>
                            </div>
                            <div className="profile-wishlist-actions">
                              <motion.button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="profile-wishlist-remove"
                                whileHover={{ scale: 1.05, backgroundColor: "#fee2e2" }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Remove
                              </motion.button>
                              <motion.div whileHover={{ scale: 1.05 }}>
                                <Link 
                                  to={`/product/${item.id}`}
                                  className="profile-wishlist-view"
                                >
                                  View Product
                                </Link>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {/* Change Password */}
              {activeTab === 'password' && (
                <motion.div
                  key="password"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInVariants}
                >
                  <motion.h2 
                    className="profile-section-title mb-6"
                    variants={itemVariants}
                  >
                    Change Password
                  </motion.h2>
                  
                  <motion.form 
                    className="profile-form"
                    variants={containerVariants}
                  >
                    <motion.div 
                      className="profile-form-full"
                      variants={itemVariants}
                    >
                      <label htmlFor="current-password" className="profile-form-label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="profile-form-input"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="profile-form-full"
                      variants={itemVariants}
                    >
                      <label htmlFor="new-password" className="profile-form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="profile-form-input"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="profile-form-full"
                      variants={itemVariants}
                    >
                      <label htmlFor="confirm-password" className="profile-form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="profile-form-input"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="profile-form-actions"
                      variants={itemVariants}
                    >
                      <motion.button
                        type="submit"
                        className="btn btn-primary"
                        whileHover={buttonVariants.hover}
                        whileTap={buttonVariants.tap}
                      >
                        Update Password
                      </motion.button>
                    </motion.div>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;