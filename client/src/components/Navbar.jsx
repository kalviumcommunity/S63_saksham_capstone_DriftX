import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">DriftX Store</Link>
      <div className="space-x-4">
        <Link to="/login">Login</Link>
        {/* Add links for Register, Cart etc. later */}
      </div>
    </nav>
  );
};

export default Navbar;
