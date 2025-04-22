import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import UpdateProduct from './pages/UpdateProduct'; // ✅ Added
import AdminProducts from './pages/AdminProducts'; // ✅ Added for product management
import AddProduct from './pages/AddProduct';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes>
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
              <Route path="/edit/:id" element={<UpdateProduct />} /> {/* ✅ Added */}
              <Route path="/admin/products" element={<AdminProducts />} /> {/* ✅ Added for product management */}
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
