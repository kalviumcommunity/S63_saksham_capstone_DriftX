import React from 'react';

const MensShoes = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Men's Shoes</h1>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sample Product Cards - You can map through actual product data */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
              alt="Men's Running Shoe"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Running Shoes</h3>
              <p className="text-gray-600 mt-1">High-performance running shoes</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-900 font-bold">$129.99</span>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772" 
              alt="Men's Casual Shoe"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Casual Sneakers</h3>
              <p className="text-gray-600 mt-1">Comfortable daily wear</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-900 font-bold">$89.99</span>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77" 
              alt="Men's Sport Shoe"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Sport Shoes</h3>
              <p className="text-gray-600 mt-1">Athletic performance shoes</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-900 font-bold">$149.99</span>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb" 
              alt="Men's Formal Shoe"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Formal Shoes</h3>
              <p className="text-gray-600 mt-1">Classic business style</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-900 font-bold">$159.99</span>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sorting Section */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
              <select id="sort" className="border rounded p-2">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Popular</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label htmlFor="filter" className="mr-2 text-gray-700">Filter:</label>
              <select id="filter" className="border rounded p-2">
                <option>All Shoes</option>
                <option>Running</option>
                <option>Casual</option>
                <option>Formal</option>
                <option>Sport</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensShoes; 