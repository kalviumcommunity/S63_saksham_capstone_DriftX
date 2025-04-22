import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, getAllProducts } from '../services/api';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    images: [],
    category: '',
    stock: 0,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        const product = response.data.find(p => p._id === id);
        
        if (product) {
          setProductData({
            name: product.name || '',
            price: product.price || '',
            description: product.description || '',
            images: product.images || [],
            category: product.category || '',
            stock: product.stock || 0,
          });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    // For simplicity, we're just updating the first image URL
    // In a real app, you might want to handle multiple images with a more complex UI
    const imageUrl = e.target.value;
    setProductData({ 
      ...productData, 
      images: imageUrl ? [imageUrl] : [] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProduct(id, productData);
      navigate('/products'); // Redirect after update
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !productData.name) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input 
            name="name" 
            value={productData.name} 
            onChange={handleChange}
            className="w-full p-2 border rounded" 
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Price</label>
          <input 
            name="price" 
            type="number" 
            value={productData.price} 
            onChange={handleChange}
            className="w-full p-2 border rounded" 
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea 
            name="description" 
            value={productData.description} 
            onChange={handleChange}
            className="w-full p-2 border rounded h-32" 
          />
        </div>
        
        <div>
          <label className="block mb-1">Image URL</label>
          <input 
            name="imageUrl" 
            value={productData.images[0] || ''} 
            onChange={handleImageChange}
            className="w-full p-2 border rounded" 
          />
        </div>
        
        <div>
          <label className="block mb-1">Category</label>
          <input 
            name="category" 
            value={productData.category} 
            onChange={handleChange}
            className="w-full p-2 border rounded" 
          />
        </div>
        
        <div>
          <label className="block mb-1">Stock</label>
          <input 
            name="stock" 
            type="number" 
            value={productData.stock} 
            onChange={handleChange}
            className="w-full p-2 border rounded" 
          />
        </div>
        
        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/products')}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
