import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebookF, FaExclamationCircle } from 'react-icons/fa';
import { loginUser } from '../redux/slices/userSlice';
import './Login.css';

const Login = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);

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

  // Form validation
  const validateForm = () => {
    const errors = {};
    
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
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(loginUser({ 
        email: formData.email, 
        password: formData.password 
      }));
    }
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google login logic
  };
  
  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
    // Implement Facebook login logic
  };

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

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

  return (
    <div className="login-container">
      <div className="login-decoration decoration-1"></div>
      <div className="login-decoration decoration-2"></div>
      
      <motion.div 
        className="login-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="login-header" variants={itemVariants}>
          <Link to="/" className="login-logo">DriftX</Link>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account to continue</p>
        </motion.div>
        
        <motion.form 
          className="login-form" 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaExclamationCircle />
              <span>{error}</span>
            </motion.div>
          )}
          
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
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${formErrors.password ? 'error' : ''}`}
              placeholder="Enter your password"
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
          
          <div className="form-footer">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="checkbox-input"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
            </div>
            
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          
          <motion.button 
            type="submit" 
            className="login-button"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
          
          <div className="login-divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>
          
          <div className="social-login">
            <motion.button 
              type="button" 
              className="social-button"
              onClick={handleGoogleLogin}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaGoogle className="social-icon" style={{ color: '#DB4437' }} />
              <span>Google</span>
            </motion.button>
            
            <motion.button 
              type="button" 
              className="social-button"
              onClick={handleFacebookLogin}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <FaFacebookF className="social-icon" style={{ color: '#4267B2' }} />
              <span>Facebook</span>
            </motion.button>
          </div>
          
          <motion.p className="register-link" variants={itemVariants}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
