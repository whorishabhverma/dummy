import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Call the search handler from props
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search products..."
      className="border p-2 rounded-md w-full md:w-1/3"
    />
  );
};

export default SearchBar;
