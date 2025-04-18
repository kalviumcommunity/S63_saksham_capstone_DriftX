import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
      <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{product.category}</p>
      <p className="text-blue-600 font-bold mt-2">${product.price}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
