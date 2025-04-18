import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left - Brand */}
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">DriftX</Link>
        </div>

        {/* Center - Search Bar */}
        <div className="w-full max-w-md mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Right - Links & Cart */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-indigo-600">Register</Link>
          
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
