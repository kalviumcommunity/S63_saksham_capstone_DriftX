import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
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
import PageTransition from './components/PageTransition';

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
    <div className="min-h-screen bg-[#2D2D2D]">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/mens" element={
            <PageTransition>
              <Mens />
            </PageTransition>
          } />
          <Route path="/womens" element={
            <PageTransition>
              <Womens />
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
