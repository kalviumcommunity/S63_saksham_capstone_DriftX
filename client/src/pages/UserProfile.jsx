import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaEdit, FaKey, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import { logout } from '../redux/slices/userSlice';

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
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-primary py-6 px-8">
          <h1 className="text-2xl font-bold text-white">My Account</h1>
        </div>
        
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-gray-50 p-6 border-r border-gray-200">
            <div className="d-flex flex-column align-items-center mb-8">
              <div className="position-relative">
                <div className="profile-avatar-container mb-2">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="profile-avatar"
                    />
                  ) : (
                    <div className="profile-avatar d-flex align-items-center justify-center">
                      <FaUser className="text-gray-400 text-4xl" />
                    </div>
                  )}
                  <label 
                    htmlFor="profile-upload" 
                    className="profile-avatar-upload"
                  >
                    <FaUpload size={14} />
                    <input 
                      id="profile-upload" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none" 
                    />
                  </label>
                </div>
              </div>
              <h2 className="profile-username">{formData.username}</h2>
              <p className="profile-email">{formData.email}</p>
            </div>
            
            <nav className="profile-nav">
              <button
                onClick={() => setActiveTab('profile')}
                className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              >
                <FaUser className="mr-3" />
                Profile Information
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              >
                <FaShoppingBag className="mr-3" />
                My Orders
              </button>
              
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`profile-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              >
                <FaHeart className="mr-3" />
                Wishlist
              </button>
              
              <button
                onClick={() => setActiveTab('password')}
                className={`profile-nav-item ${activeTab === 'password' ? 'active' : ''}`}
              >
                <FaKey className="mr-3" />
                Change Password
              </button>
              
              <button
                onClick={handleLogout}
                className="profile-nav-item logout"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="col-md-9 profile-content">
            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div>
                <div className="profile-section-header">
                  <h2 className="profile-section-title">Profile Information</h2>
                  <button
                    onClick={handleEditToggle}
                    className="profile-edit-button"
                  >
                    <FaEdit className="mr-1" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div>
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
                  </div>
                  
                  <div>
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
                  </div>
                  
                  <div>
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
                  </div>
                  
                  <div className="profile-form-full">
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
                  </div>
                  
                  {isEditing && (
                    <div className="profile-form-actions">
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}
            
            {/* Orders */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="profile-section-title mb-6">My Orders</h2>
                
                {orders.length === 0 ? (
                  <div className="profile-empty">
                    <FaShoppingBag className="profile-empty-icon" />
                    <h3 className="profile-empty-title">No orders yet</h3>
                    <p className="profile-empty-text">You haven't placed any orders yet.</p>
                    <Link 
                      to="/" 
                      className="btn btn-primary"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="profile-orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th><span className="sr-only">View</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="font-medium">{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.items}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                              <span className={`profile-order-status ${
                                order.status === 'Delivered' 
                                  ? 'profile-order-status-delivered' 
                                  : 'profile-order-status-processing'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <Link to={`/orders/${order.id}`} className="text-primary">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="profile-section-title mb-6">My Wishlist</h2>
                
                {wishlist.length === 0 ? (
                  <div className="profile-empty">
                    <FaHeart className="profile-empty-icon" />
                    <h3 className="profile-empty-title">Your wishlist is empty</h3>
                    <p className="profile-empty-text">Add items to your wishlist to save them for later.</p>
                    <Link 
                      to="/" 
                      className="btn btn-primary"
                    >
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="profile-wishlist">
                    {wishlist.map((item) => (
                      <div key={item.id} className="profile-wishlist-item">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="profile-wishlist-image"
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
                            <button
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="profile-wishlist-remove"
                            >
                              Remove
                            </button>
                            <Link 
                              to={`/product/${item.id}`}
                              className="profile-wishlist-view"
                            >
                              View Product
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Change Password */}
            {activeTab === 'password' && (
              <div>
                <h2 className="profile-section-title mb-6">Change Password</h2>
                
                <form className="profile-form">
                  <div className="profile-form-full">
                    <label htmlFor="current-password" className="profile-form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="profile-form-input"
                    />
                  </div>
                  
                  <div className="profile-form-full">
                    <label htmlFor="new-password" className="profile-form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="profile-form-input"
                    />
                  </div>
                  
                  <div className="profile-form-full">
                    <label htmlFor="confirm-password" className="profile-form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="profile-form-input"
                    />
                  </div>
                  
                  <div className="profile-form-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;