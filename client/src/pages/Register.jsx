import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaUpload, 
  FaExclamationCircle, 
  FaCheck 
} from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error if there was one
      if (formErrors.image) {
        setFormErrors({
          ...formErrors,
          image: ''
        });
      }
    }
  };
  
  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setUploading(true);
        
        const data = new FormData();
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        
        if (image) {
          data.append('avatar', image);
        }
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real app, you would make an actual API call:
        // const res = await fetch('http://localhost:5000/api/users/register', {
        //   method: 'POST',
        //   body: data,
        // });
        // const result = await res.json();
        
        setUploading(false);
        setSubmitSuccess(true);
        
        // Redirect to login after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
      } catch (err) {
        setUploading(false);
        console.error('Registration error:', err);
        setFormErrors({
          ...formErrors,
          submit: 'Registration failed. Please try again.'
        });
      }
    }
  };
  
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
      transition: { duration: 0.5 }
    }
  };
  
  // Success screen
  if (submitSuccess) {
    return (
      <div className="register-container">
        <motion.div 
          className="register-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '3rem' 
          }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            style={{ 
              backgroundColor: '#10b981', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <FaCheck style={{ color: 'white', fontSize: '2rem' }} />
          </motion.div>
          
          <h2 className="register-title">Registration Successful!</h2>
          <p className="register-subtitle" style={{ marginBottom: '2rem' }}>
            Your account has been created successfully. Redirecting to login...
          </p>
          
          <Link to="/login" className="register-button">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="register-container">
      <div className="register-decoration decoration-1"></div>
      <div className="register-decoration decoration-2"></div>
      
      <motion.div 
        className="register-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="register-header" variants={itemVariants}>
          <Link to="/" className="register-logo">DriftX</Link>
          <h1 className="register-title">Create an Account</h1>
          <p className="register-subtitle">Join DriftX for exclusive offers and a personalized shopping experience</p>
        </motion.div>
        
        <motion.form 
          className="register-form" 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {formErrors.submit && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaExclamationCircle />
              <span>{formErrors.submit}</span>
            </motion.div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {formErrors.firstName && (
                <motion.p 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formErrors.firstName}
                </motion.p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && (
                <motion.p 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formErrors.lastName}
                </motion.p>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-input ${formErrors.username ? 'error' : ''}`}
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.username && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formErrors.username}
              </motion.p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${formErrors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formErrors.email}
              </motion.p>
            )}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${formErrors.password ? 'error' : ''}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <motion.p 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formErrors.password}
                </motion.p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${formErrors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <motion.p 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formErrors.confirmPassword}
                </motion.p>
              )}
            </div>
          </div>
          
          <div className="file-input-container">
            {imagePreview && (
              <motion.img 
                src={imagePreview} 
                alt="Avatar Preview" 
                className="avatar-preview"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
            )}
            
            <motion.label 
              htmlFor="avatar" 
              className="file-input-label"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaUpload className="file-icon" />
              <span className="file-text">
                {image ? 'Change Profile Picture' : 'Upload Profile Picture'}
              </span>
              {image && <span className="file-name">{image.name}</span>}
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </motion.label>
            
            {formErrors.image && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formErrors.image}
              </motion.p>
            )}
          </div>
          
          <div className="terms-checkbox">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              className="checkbox-input"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <div>
              <label htmlFor="agreeToTerms" className="terms-text">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
              {formErrors.agreeToTerms && (
                <motion.p 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {formErrors.agreeToTerms}
                </motion.p>
              )}
            </div>
          </div>
          
          <motion.button 
            type="submit" 
            className="register-button"
            disabled={uploading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {uploading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
          
          <motion.p className="login-link" variants={itemVariants}>
            Already have an account? <Link to="/login">Sign In</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
