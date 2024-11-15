import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    alert("Redirecting to checkout...");
    // Here you can redirect the user to the checkout page, or integrate with a real payment gateway.
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div>
      {/* Product Information */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-cover rounded-md"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-4">Price: ₹{product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
          <p className="text-sm text-gray-500 mt-1">Rating: {product.rating.rate}</p>
          <p className="text-sm text-gray-500 mt-1">Count: {product.rating.count}</p>

          {/* Quantity Control */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleDecreaseQuantity}
              className="bg-gray-300 p-2 rounded-md"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="bg-gray-300 p-2 rounded-md"
            >
              +
            </button>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((related) => (
            <Link to={`/product/${related.id}`} key={related.id}>
              <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-4 truncate">{related.title}</h3>
                <p className="text-gray-700 font-medium mt-2">₹{related.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">{related.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
