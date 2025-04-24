import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './index.css'; // Import Tailwind CSS
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Mens from './pages/Mens';
import Womens from './pages/Womens';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import UpdateProduct from './pages/UpdateProduct';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/edit/:id" element={<UpdateProduct />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
};

export default App;
