import React from "react";

/**
 * SearchBar Component
 * Search input field (attached to useRef for initial auto-focus) and category filter.
 */
export function SearchBar({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  inputRef,
  categories = ["All", "React", "Redux", "Node"]
}) {
  return (
    <div className="searchbar-container">
      {/* Search Input with useRef focus */}
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search blogs by title, author, or category..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchText && (
          <button
            className="btn-clear-search"
            onClick={() => onSearchChange("")}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Dropdown Filter */}
      <div className="category-filter-wrapper">
        <label htmlFor="category-select" className="filter-label">
          Category:
        </label>
        <select
          id="category-select"
          className="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
