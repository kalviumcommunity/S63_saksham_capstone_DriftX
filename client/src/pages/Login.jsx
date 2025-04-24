import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebookF, FaExclamationCircle } from 'react-icons/fa';
import { loginUser } from '../redux/slices/userSlice';

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
    <div className="min-h-screen bg-background-alt flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-[70px] -top-[150px] -left-[150px] z-0"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-[70px] -bottom-[150px] -right-[150px] z-0"></div>
      
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">DriftX</Link>
          <h1 className="text-2xl font-bold text-text-primary mt-6 mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Sign in to your account to continue</p>
        </motion.div>
        
        <motion.form 
          className="space-y-6" 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {error && (
            <motion.div 
              className="bg-error/10 text-error p-3 rounded-md flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaExclamationCircle />
              <span>{error}</span>
            </motion.div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-3 rounded-md border ${formErrors.email ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'} outline-none transition-all`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <motion.p 
                className="mt-1 text-sm text-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formErrors.email}
              </motion.p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full px-4 py-3 rounded-md border ${formErrors.password ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'} outline-none transition-all`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <motion.p 
                className="mt-1 text-sm text-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formErrors.password}
              </motion.p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="h-4 w-4 text-primary border-border rounded focus:ring-primary/20"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-text-secondary">Remember me</label>
            </div>
            
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark transition-colors">
              Forgot Password?
            </Link>
          </div>
          
          <motion.button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-md hover:-translate-y-1 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            disabled={loading}
            whileHover={{ y: -4 }}
            whileTap={{ y: 0 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text-secondary">OR</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.button 
              type="button" 
              className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-background-alt transition-all"
              onClick={handleGoogleLogin}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaGoogle className="text-[#DB4437]" />
              <span className="text-text-primary">Google</span>
            </motion.button>
            
            <motion.button 
              type="button" 
              className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-background-alt transition-all"
              onClick={handleFacebookLogin}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <FaFacebookF className="text-[#4267B2]" />
              <span className="text-text-primary">Facebook</span>
            </motion.button>
          </div>
          
          <motion.p className="text-center text-text-secondary" variants={itemVariants}>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dark transition-colors">
              Sign Up
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
