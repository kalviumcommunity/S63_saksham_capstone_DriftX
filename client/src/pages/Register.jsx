import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaUpload, 
  FaExclamationCircle, 
  FaCheck 
} from 'react-icons/fa';

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
      <div className="min-h-screen bg-background-alt flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div 
          className="max-w-md w-full bg-white rounded-xl shadow-xl p-12 flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="bg-emerald-500 rounded-full w-20 h-20 flex items-center justify-center mb-6"
          >
            <FaCheck className="text-white text-3xl" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 text-center mb-8">
            Your account has been created successfully. Redirecting to login...
          </p>
          
          <Link to="/login" className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition duration-200 text-center">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background-alt flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      
      <motion.div 
        className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <Link to="/" className="text-4xl font-bold text-primary hover:text-primary-dark transition-colors">DriftX</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-6">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join DriftX for exclusive offers and a personalized shopping experience</p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                placeholder="John"
              />
              {formErrors.firstName && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {formErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                placeholder="Doe"
              />
              {formErrors.lastName && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full rounded-lg border ${
                  formErrors.username ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 pl-10 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                placeholder="johndoe"
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {formErrors.username && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" />
                {formErrors.username}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
              placeholder="john@example.com"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" />
                {formErrors.email}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                placeholder="••••••••"
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {formErrors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                placeholder="••••••••"
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="text-3xl text-gray-400" />
                )}
              </div>
              <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="flex items-center space-x-2">
                  <FaUpload className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Upload Photo</span>
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
              I agree to the <Link to="/terms" className="text-primary hover:text-primary-dark">Terms and Conditions</Link>
            </label>
          </div>
          {formErrors.agreeToTerms && (
            <p className="text-sm text-red-500 flex items-center">
              <FaExclamationCircle className="mr-1" />
              {formErrors.agreeToTerms}
            </p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Create Account'
            )}
          </button>

          {formErrors.submit && (
            <p className="text-sm text-red-500 text-center flex items-center justify-center">
              <FaExclamationCircle className="mr-1" />
              {formErrors.submit}
            </p>
          )}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
              Sign in
            </Link>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
