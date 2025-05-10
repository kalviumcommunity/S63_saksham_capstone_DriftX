import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  FaUser, FaShoppingBag, FaHeart, FaEdit, FaKey, FaSignOutAlt, 
  FaUpload, FaEnvelope, FaPhone, FaCamera, FaBell, FaGift, 
  FaCog, FaHistory, FaTag, FaPalette, FaCheckCircle, FaSpinner,
  FaMapMarkerAlt, FaBirthdayCake, FaUserTag, FaMoon, FaSun,
  FaExclamationCircle, FaTrophy, FaChartLine, FaShieldAlt,
  FaCreditCard, FaBox, FaComments, FaMedal, FaGem
} from 'react-icons/fa';
import { logout, updateUser } from '../redux/slices/userSlice';
import { format } from 'date-fns';

const MotionCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, perspective: 1000 }}
      drag
      dragElastic={0.1}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={{ cursor: "grabbing" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const formatDate = (dateString) => {
  try {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Not specified';
    return format(date, 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Not specified';
  }
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [imagePreview, setImagePreview] = useState(null);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    interests: [],
    bio: ''
  });
  const [personalStats, setPersonalStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    reviewsGiven: 0,
    pointsEarned: 0
  });
  const [notifications, setNotifications] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    newsletter: true,
    language: 'English'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState(null);

  const { userInfo } = useSelector((state) => state.user);

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  const notificationVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const dealVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  const statsData = [
    { label: 'Orders', value: '12' },
    { label: 'Wishlist', value: '5' },
    { label: 'Reviews', value: '8' },
    { label: 'Points', value: '350' }
  ];
  
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!userInfo) {
          navigate('/login');
          return;
        }

        setUserDetails({
          fullName: userInfo.name || userInfo.username || userInfo.email || '',
          username: userInfo.username || '',
          email: userInfo.email || '',
          phone: userInfo.phone || '',
          address: userInfo.address || '',
          birthday: userInfo.birthday || '',
          interests: userInfo.interests || [],
          bio: userInfo.bio || '',
        });

        // Optionally, you can fetch stats from backend if you want real data
        setPersonalStats({
          totalOrders: userInfo.totalOrders || 0,
          totalSpent: userInfo.totalSpent || 0,
          reviewsGiven: userInfo.reviewsGiven || 0,
          pointsEarned: userInfo.pointsEarned || 0,
        });

        setNotifications([
          { id: 1, type: 'order', message: 'Your order #123 has been shipped!', time: '2h ago' },
          { id: 2, type: 'deal', message: 'New summer collection is live!', time: '5h ago' },
          { id: 3, type: 'activity', message: 'Your review was appreciated', time: '1d ago' }
        ]);

        setDeals([
          { id: 1, title: 'Summer Sale', discount: '30% OFF', endDate: '2024-03-15', category: 'All Items' },
          { id: 2, title: 'Flash Deal', discount: '50% OFF', endDate: '2024-03-10', category: 'Accessories' }
        ]);

        setActivities([
          { id: 1, type: 'purchase', details: 'Bought Denim Jacket', date: '2024-03-01' },
          { id: 2, type: 'review', details: 'Reviewed White Sneakers', date: '2024-02-28' }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading profile data:', error);
        setError('Failed to load profile data. Please try again.');
        setIsLoading(false);
      }
    };

    loadData();
  }, [userInfo, navigate]);
  
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        username: userInfo.username || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        birthday: userInfo.birthday || '',
        role: userInfo.role || 'user',
        profileImage: userInfo.profileImage || '',
      });
      setImagePreview(userInfo.profileImage || null);
    }
  }, [userInfo]);
  
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
  
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormImage(null);
    if (!isEditing && userInfo) {
      setFormData({
        name: userInfo.name || '',
        username: userInfo.username || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: userInfo.address || '',
        birthday: userInfo.birthday || '',
        role: userInfo.role || 'user',
        profileImage: userInfo.profileImage || '',
      });
      setImagePreview(userInfo.profileImage || null);
    }
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    let payload;
    if (formImage) {
      payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      payload.append('avatar', formImage);
    } else {
      payload = { ...formData };
    }
    await dispatch(updateUser(payload));
    setIsEditing(false);
  };
  
  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const handleRemoveFromWishlist = (id) => {
    // Here you would typically make an API call to remove the item from wishlist
    setWishlist(wishlist.filter(item => item.id !== id));
  };
  
  const renderNotifications = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          variants={notificationVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
        >
          <div className="text-primary text-xl">
            {notification.type === 'order' && <FaShoppingBag />}
            {notification.type === 'deal' && <FaTag />}
            {notification.type === 'activity' && <FaHistory />}
          </div>
          <div className="flex-1">
            <p className="text-gray-800">{notification.message}</p>
            <p className="text-sm text-gray-500">{notification.time}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderDeals = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {deals.map((deal) => (
        <motion.div
          key={deal.id}
          variants={dealVariants}
          whileHover="hover"
          className="bg-gradient-to-r from-primary to-primary-dark p-6 rounded-xl text-white"
        >
          <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
          <p className="text-4xl font-bold text-yellow-300 mb-4">{deal.discount}</p>
          <p className="text-primary-100">Valid until {format(new Date(deal.endDate), 'MMM dd, yyyy')}</p>
          <p className="text-sm mt-2">Category: {deal.category}</p>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderActivities = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          variants={cardVariants}
          whileHover="hover"
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4">
            <div className="text-primary text-xl">
              {activity.type === 'purchase' && <FaShoppingBag />}
              {activity.type === 'review' && <FaCheckCircle />}
            </div>
            <div>
              <p className="text-gray-800">{activity.details}</p>
              <p className="text-sm text-gray-500">{format(new Date(activity.date), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderPreferences = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={cardVariants} className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaPalette className="mr-2 text-primary" /> Theme Preferences
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            className={`p-4 rounded-lg ${preferences.theme === 'light' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => setPreferences({...preferences, theme: 'light'})}
          >
            Light Mode
          </button>
          <button 
            className={`p-4 rounded-lg ${preferences.theme === 'dark' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => setPreferences({...preferences, theme: 'dark'})}
          >
            Dark Mode
          </button>
        </div>
      </motion.div>

      <motion.div variants={cardVariants} className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FaBell className="mr-2 text-primary" /> Notification Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={preferences.notifications}
              onChange={(e) => setPreferences({...preferences, notifications: e.target.checked})}
              className="form-checkbox h-5 w-5 text-primary rounded"
            />
            <span>Push Notifications</span>
          </label>
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={preferences.newsletter}
              onChange={(e) => setPreferences({...preferences, newsletter: e.target.checked})}
              className="form-checkbox h-5 w-5 text-primary rounded"
            />
            <span>Email Newsletter</span>
          </label>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderProfileInfo = () => (
    <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Personal Information Card */}
      <motion.div 
        className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center text-black">
            <FaUser className="mr-2 text-primary" /> Personal Information
          </h3>
          {!isEditing && (
            <button type="button" onClick={handleEditToggle} className="text-primary flex items-center gap-1 hover:underline">
              <FaEdit /> Edit
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaUserTag className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                {isEditing ? (
                  <input name="name" value={formData.name} onChange={handleFormInputChange} className="font-medium text-black bg-white border rounded px-2 py-1 w-full" />
                ) : (
                  <p className="font-medium text-black">{userInfo?.name}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaEnvelope className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                {isEditing ? (
                  <input name="email" value={formData.email} onChange={handleFormInputChange} className="font-medium text-black bg-white border rounded px-2 py-1 w-full" />
                ) : (
                  <p className="font-medium text-black">{userInfo?.email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaPhone className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                {isEditing ? (
                  <input name="phone" value={formData.phone} onChange={handleFormInputChange} className="font-medium text-black bg-white border rounded px-2 py-1 w-full" />
                ) : (
                  <p className="font-medium text-black">{userInfo?.phone}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                {isEditing ? (
                  <input name="address" value={formData.address} onChange={handleFormInputChange} className="font-medium text-black bg-white border rounded px-2 py-1 w-full" />
                ) : (
                  <p className="font-medium text-black">{userInfo?.address}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaBirthdayCake className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Birthday</p>
                {isEditing ? (
                  <input type="date" name="birthday" value={formData.birthday ? formData.birthday.slice(0,10) : ''} onChange={handleFormInputChange} className="font-medium text-black bg-white border rounded px-2 py-1 w-full" />
                ) : (
                  <p className="font-medium text-black">{formatDate(userInfo?.birthday)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FaGem className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-600">Member Status</p>
                {isEditing ? (
                  <select name="role" value={formData.role} onChange={handleFormInputChange} className="font-medium text-black bg-white border rounded px-2 py-1 w-full">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <p className="font-medium text-black">{userInfo?.role === 'admin' ? 'Admin' : 'Premium Member'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Profile Image Upload */}
        <div className="flex items-center mt-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary mr-4">
            <img src={imagePreview || userInfo?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || userInfo?.name || '')}&background=random`} alt="Profile" className="w-full h-full object-cover" />
            {isEditing && (
              <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                <FaCamera className="text-white text-2xl" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFormImageChange} />
              </label>
            )}
          </div>
          {isEditing && (
            <span className="text-gray-500">Click to change photo</span>
          )}
        </div>
        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Save</button>
            <button type="button" className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400" onClick={handleEditToggle}>Cancel</button>
          </div>
        )}
      </motion.div>

      {/* Stats Overview Card */}
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-black">
          <FaChartLine className="mr-2 text-primary" /> Activity Overview
        </h3>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Orders Placed</p>
                <p className="text-2xl font-bold text-black">{personalStats.totalOrders}</p>
              </div>
              <FaBox className="text-primary text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-black">${personalStats.totalSpent}</p>
              </div>
              <FaCreditCard className="text-primary text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviews</p>
                <p className="text-2xl font-bold text-black">{personalStats.reviewsGiven}</p>
              </div>
              <FaComments className="text-primary text-2xl" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reward Points</p>
                <p className="text-2xl font-bold text-black">{personalStats.pointsEarned}</p>
              </div>
              <FaTrophy className="text-primary text-2xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-black">
          <FaHistory className="mr-2 text-primary" /> Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <motion.div 
              key={activity.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              whileHover={{ x: 10 }}
            >
              <div className={`p-3 rounded-full ${
                activity.type === 'purchase' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {activity.type === 'purchase' ? <FaShoppingBag /> : <FaCheckCircle />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-black">{activity.details}</p>
                <p className="text-sm text-gray-600">{formatDate(activity.date)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Preferences Card */}
      <motion.div 
        className="bg-white rounded-2xl shadow-xl p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center text-black">
          <FaCog className="mr-2 text-primary" /> Preferences
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaMoon className="text-primary" />
              <span className="text-black">Dark Mode</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-6 rounded-full relative ${
                preferences.theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setPreferences(prev => ({
                ...prev,
                theme: prev.theme === 'light' ? 'dark' : 'light'
              }))}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
                animate={{ x: preferences.theme === 'dark' ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaBell className="text-primary" />
              <span className="text-black">Notifications</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-6 rounded-full relative ${
                preferences.notifications ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setPreferences(prev => ({
                ...prev,
                notifications: !prev.notifications
              }))}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"
                animate={{ x: preferences.notifications ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-primary" />
              <span className="text-black">Two-Factor Auth</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              onClick={() => {/* Add 2FA setup logic */}}
            >
              Setup
            </motion.button>
          </div>
        </div>
      </motion.div>
    </form>
  );
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-primary text-4xl"
        >
          <FaSpinner className="text-white" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md mx-4">
          <FaExclamationCircle className="text-red-500 text-4xl mb-4 mx-auto" />
          <p className="text-gray-800 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Profile Header */}
          <motion.div 
            variants={cardVariants}
            className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            <div className="relative h-64">
              <motion.div 
                className="absolute bottom-8 left-8 flex items-end space-x-6"
                variants={cardVariants}
              >
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
                    <img
                      src={userInfo?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(userDetails.fullName)}&background=random`}
                      alt={userDetails.fullName}
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => {/* Add image upload logic */}}
                    >
                      <FaCamera className="text-white text-2xl" />
                    </motion.div>
                  </div>
                </motion.div>
                <div>
                  <motion.h1 
                    className="text-4xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {userDetails.fullName}
                  </motion.h1>
                  <motion.p 
                    className="text-primary-100 flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FaMedal className="text-yellow-400" />
                    <span>Premium Member since {formatDate(userInfo?.createdAt)}</span>
                  </motion.p>
                </div>
              </motion.div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-8 py-4">
              <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
                {['profile', 'activities', 'notifications', 'deals', 'preferences'].map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-lg capitalize whitespace-nowrap flex-shrink-0 font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-white text-primary shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && renderProfileInfo()}
              {activeTab === 'activities' && renderActivities()}
              {activeTab === 'notifications' && renderNotifications()}
              {activeTab === 'deals' && renderDeals()}
              {activeTab === 'preferences' && renderPreferences()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;