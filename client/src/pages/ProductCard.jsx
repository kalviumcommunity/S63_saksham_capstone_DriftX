import { deleteProduct } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product._id);
      window.location.reload(); // or refetch products
    }
  };

  return (
    <div className="border p-4">
      <h3>{product.name}</h3>
      <button onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
      <button onClick={handleDelete} className="text-red-500">Delete</button>
    </div>
  );
};

export default ProductCard;
