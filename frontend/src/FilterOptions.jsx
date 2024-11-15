import React from "react";

const FilterOptions = ({ categories, onFilter, onSort }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Category Filter */}
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="border p-2 rounded-md"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Price Sorting */}
      <select
        onChange={(e) => onSort(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="asc">Sort by Price: Low to High</option>
        <option value="desc">Sort by Price: High to Low</option>
      </select>
    </div>
  );
};

export default FilterOptions;
