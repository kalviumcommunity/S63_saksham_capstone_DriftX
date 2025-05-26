import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './index.css'; // Import Tailwind CSS
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Mens from './pages/Mens';
import MensShirts from './pages/MensShirts';
import MensPants from './pages/MensPants';
import MensShoes from './pages/MensShoes';
import MensAccessories from './pages/MensAccessories';
import ModernOuterwear from './pages/ModernOuterwear';
import ClassicNeutrals from './pages/ClassicNeutrals';
import Womens from './pages/Womens';
import WomensShirts from './pages/WomensShirts';
import WomensPants from './pages/WomensPants';
import WomensAccessories from './pages/WomensAccessories';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Contact from './pages/Contact';
import UpdateProduct from './pages/UpdateProduct';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import ElegantWhite from './pages/ElegantWhite';
import OfficeDress from './pages/OfficeDress';
import SkirtLength from './pages/SkirtLength';
import BlazerStyle from './pages/BlazerStyle';
import BlogRoutes from './routes/BlogRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import OTPLogin from './components/OTPLogin';
import { useSpring, animated } from 'react-spring';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0f172a]">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/office-dress" element={
            <PageTransition>
              <OfficeDress />
            </PageTransition>
          } />
          <Route path="/blog/*" element={<BlogRoutes />} />
          <Route path="/skirt-length" element={
            <PageTransition>
              <SkirtLength />
            </PageTransition>
          } />
          <Route path="/blazer-style" element={
            <PageTransition>
              <BlazerStyle />
            </PageTransition>
          } />
          <Route path="/classic-neutrals" element={
            <PageTransition>
              <ClassicNeutrals />
            </PageTransition>
          } />
          <Route path="/modern-outerwear" element={
            <PageTransition>
              <ModernOuterwear />
            </PageTransition>
          } />
          <Route path="/elegant-white" element={
            <PageTransition>
              <ElegantWhite />
            </PageTransition>
          } />
          <Route path="/mens" element={
            <PageTransition>
              <Mens />
            </PageTransition>
          } />
          <Route path="/mens/shirts" element={
            <PageTransition>
              <MensShirts />
            </PageTransition>
          } />
          <Route path="/mens/pants" element={
            <PageTransition>
              <MensPants />
            </PageTransition>
          } />
          <Route path="/mens/shoes" element={
            <PageTransition>
              <MensShoes />
            </PageTransition>
          } />
          <Route path="/mens/accessories" element={
            <PageTransition>
              <MensAccessories />
            </PageTransition>
          } />
          <Route path="/womens" element={
            <PageTransition>
              <Womens />
            </PageTransition>
          } />
          <Route path="/womens/shirts" element={
            <PageTransition>
              <WomensShirts />
            </PageTransition>
          } />
          <Route path="/womens/pants" element={
            <PageTransition>
              <WomensPants />
            </PageTransition>
          } />
          <Route path="/womens/accessories" element={
            <PageTransition>
              <WomensAccessories />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          <Route path="/cart" element={
            <PageTransition>
              <Cart />
            </PageTransition>
          } />
          <Route path="/checkout" element={
            <PageTransition>
              <Checkout />
            </PageTransition>
          } />
          <Route path="/order-confirmation" element={
            <PageTransition>
              <OrderConfirmation />
            </PageTransition>
          } />
          <Route path="/product/:id" element={
            <PageTransition>
              <ProductDetails />
            </PageTransition>
          } />
          <Route path="/profile" element={
            <PageTransition>
              <UserProfile />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <About />
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <Contact />
            </PageTransition>
          } />
          <Route path="/edit/:id" element={
            <PageTransition>
              <UpdateProduct />
            </PageTransition>
          } />
          <Route path="/admin/products" element={
            <PageTransition>
              <AdminProducts />
            </PageTransition>
          } />
          <Route path="/add-product" element={
            <PageTransition>
              <AddProduct />
            </PageTransition>
          } />
          <Route path="/otp-login" element={
            <PageTransition>
              <OTPLogin />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
