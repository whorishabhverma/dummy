import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductsList";
import FilterOptions from "./FilterOptions";
import SearchBar from "./SearchBar";
import ProductDetails from "./ProductDetails";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  };

  const handleSort = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const searchedProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowercasedTerm) ||
        product.description.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(searchedProducts);
  };

  return (
    <Router>
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          {/* Product List Page */}
          <Route
            path="/"
            element={
              <>
                <h1 className="text-2xl font-bold text-center mb-6">Product Listing</h1>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                  <SearchBar onSearch={handleSearch} />
                  <FilterOptions categories={categories} onFilter={handleFilter} onSort={handleSort} />
                </div>
                <ProductList products={filteredProducts} />
              </>
            }
          />

          {/* Product Details Page */}
          <Route
            path="/product/:id"
            element={<ProductDetails products={products} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;