import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/api';
import { subscribeToOrderStatus } from './OrderConfirmation';

// Sample dummy products data
const dummyProducts = [
  {
    _id: '1',
    name: "Men's Classic Fit Shirt",
    price: 49.99,
    description: "A classic fit shirt perfect for any occasion.",
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    _id: '2',
    name: "Women's Summer Dress",
    price: 59.99,
    description: "A beautiful summer dress for a day out.",
    category: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    _id: '3',
    name: "Men's Denim Jacket",
    price: 79.99,
    description: "A stylish denim jacket for a casual look.",
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80"
  },
  {
    _id: '4',
    name: "Women's Designer Handbag",
    price: 129.99,
    description: "Elegant designer handbag with premium quality leather.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    _id: '5',
    name: "Men's Running Shoes",
    price: 89.99,
    description: "High-performance running shoes with superior comfort.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    _id: '6',
    name: "Women's Yoga Pants",
    price: 45.99,
    description: "Comfortable and stretchy yoga pants for active lifestyle.",
    category: "Sportswear",
    image: "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    _id: '7',
    name: "Men's Leather Wallet",
    price: 34.99,
    description: "Classic leather wallet with multiple card slots.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    _id: '8',
    name: "Women's Sunglasses",
    price: 29.99,
    description: "Trendy sunglasses with UV protection.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    _id: '9',
    name: "Men's Formal Watch",
    price: 199.99,
    description: "Elegant formal watch with leather strap.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  }
];

// Define orderIds for demonstration (replace with real order IDs from your backend in production)
const orderIds = dummyProducts.map(product => product._id);

const AdminOrderStatusTable = ({ orderIds }) => {
  const [orderStatuses, setOrderStatuses] = useState({});

  useEffect(() => {
    const subs = orderIds.map(orderId =>
      subscribeToOrderStatus(orderId, (update) => {
        setOrderStatuses(prev => ({ ...prev, [orderId]: update }));
      })
    );
    return () => subs.forEach(sub => sub.unsubscribe());
  }, [orderIds]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Real-Time Order Status</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {orderIds.map(orderId => (
            <tr key={orderId}>
              <td className="border px-4 py-2">{orderId}</td>
              <td className="border px-4 py-2">{orderStatuses[orderId]?.status || 'Loading...'}</td>
              <td className="border px-4 py-2">{orderStatuses[orderId]?.updatedAt ? new Date(orderStatuses[orderId].updatedAt).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminProducts = () => {
  const [products, setProducts] = useState(dummyProducts); // Initialize with dummy products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product._id !== productId));
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link 
          to="/add-product" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                
                <div className="flex space-x-2">
                  <Link 
                    to={`/edit/${product._id}`} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1 text-center"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AdminOrderStatusTable orderIds={orderIds} />
    </div>
  );
};

export default AdminProducts;