import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="h-48 bg-gray-100 rounded-md flex justify-center items-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-lg font-bold mt-4 truncate">{product.title}</h3>
            <p className="text-gray-700 font-medium mt-2">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;