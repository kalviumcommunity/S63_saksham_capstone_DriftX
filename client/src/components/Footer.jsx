import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaTiktok, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcDiscover } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#FAF9F8] pt-16 pb-8">
      {/* Newsletter Section */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h3 className="text-lg mb-3 tracking-wide">JOIN OUR NEWSLETTER</h3>
        <p className="text-sm text-gray-600 mb-6">Be the first to know about new collections and exclusive offers.</p>
        <div className="flex justify-center gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 w-64 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button className="px-6 py-2 bg-black text-white uppercase text-sm tracking-wider hover:bg-gray-900 transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {/* Products */}
        <div>
          <h4 className="text-sm font-medium mb-4 tracking-wide uppercase text-black">Products</h4>
          <ul className="space-y-2">
            <li><Link to="/dress" className="text-sm text-neutral-800 hover:text-black transition-colors">Dress</Link></li>
            <li><Link to="/blazer" className="text-sm text-neutral-800 hover:text-black transition-colors">Blazer</Link></li>
            <li><Link to="/skirt" className="text-sm text-neutral-800 hover:text-black transition-colors">Skirt</Link></li>
            <li><Link to="/trousers" className="text-sm text-neutral-800 hover:text-black transition-colors">Trousers</Link></li>
            <li><Link to="/jumpsuits" className="text-sm text-neutral-800 hover:text-black transition-colors">Jumpsuits</Link></li>
          </ul>
        </div>

        {/* Service */}
        <div>
          <h4 className="text-sm font-medium mb-4 tracking-wide uppercase text-black">Service</h4>
          <ul className="space-y-2">
            <li><Link to="/faq" className="text-sm text-neutral-800 hover:text-black transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="text-sm text-neutral-800 hover:text-black transition-colors">Shipping</Link></li>
            <li><Link to="/contact" className="text-sm text-neutral-800 hover:text-black transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-sm font-medium mb-4 tracking-wide uppercase text-black">Information</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-sm text-neutral-800 hover:text-black transition-colors">About Us</Link></li>
            <li><Link to="/returns" className="text-sm text-neutral-800 hover:text-black transition-colors">Return and Refunds</Link></li>
            <li><Link to="/legal" className="text-sm text-neutral-800 hover:text-black transition-colors">Legal Area</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-sm font-medium mb-4 tracking-wide uppercase text-black">About Us</h4>
          <p className="text-sm text-neutral-800 leading-relaxed">
            We could not have created this store without the help of an amazing source of content and products. Visit our <Link to="/store" className="underline hover:text-black transition-colors text-neutral-800">store page</Link> to find out where all the products used in this demo came from.
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 mb-12">
        <a href="#" className="text-gray-600 hover:text-black transition-colors"><FaFacebookF size={18} /></a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors"><FaTwitter size={18} /></a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors"><FaInstagram size={18} /></a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors"><FaPinterestP size={18} /></a>
        <a href="#" className="text-gray-600 hover:text-black transition-colors"><FaTiktok size={18} /></a>
      </div>

      {/* Payment Methods */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <FaCcVisa size={32} className="text-[#1A1F71]" />
        <FaCcMastercard size={32} className="text-[#EB001B]" />
        <FaCcAmex size={32} className="text-[#006FCF]" />
        <FaCcPaypal size={32} className="text-[#003087]" />
        <FaCcDiscover size={32} className="text-[#FF6000]" />
      </div>

      {/* Brand Name */}
      <div className="text-center">
        <h1 
          className="text-[180px] md:text-[200px] leading-none font-light tracking-tight text-black"
          style={{
            fontFamily: "'Didot', 'Bodoni MT', 'Noto Serif Display', serif",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: '#111',
            textShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 0 #fff',
          }}
        >
          DRIFTX
        </h1>
      </div>
    </footer>
  );
};

export default Footer;