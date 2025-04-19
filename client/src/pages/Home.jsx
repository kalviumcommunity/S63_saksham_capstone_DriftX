import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/products");
        const productList = Array.isArray(res.data)
          ? res.data
          : res.data.products;
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Text */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to DriftX Store</h1>
        <p className="mt-3 text-lg text-gray-600">
          Explore our exclusive collection of products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(products) && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
