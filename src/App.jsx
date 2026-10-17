import React, { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBlogs,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setSelectedCategory,
  addBlog
} from "./features/blogs/blogSlice";
import { useFilteredBlogs } from "./hooks/useFilteredBlogs";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import BlogList from "./components/BlogList";
import BlogStats from "./components/BlogStats";
import AddBlogForm from "./components/AddBlogForm";
import "./App.css";

/**
 * ============================================================================
 * DigiSkills 3.0: Blog Dashboard Main Application (App.jsx)
 * Combines React Hooks, Custom Hooks, Performance Optimization & Redux Toolkit
 * ============================================================================
 */
export default function App() {
  const dispatch = useDispatch();

  // 1. Read state from Redux store using useSelector
  const { blogs, searchText, selectedCategory, loading, error } = useSelector(
    (state) => state.blogs
  );

  // 2. Performance Requirement: useRef to auto-focus search input on page load
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Focus search input when the component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // 3. Performance Requirement: useCallback for event handlers to prevent child re-renders
  const handleDeleteBlog = useCallback(
    (id) => {
      dispatch(deleteBlog(id));
    },
    [dispatch]
  );

  const handleToggleFeatured = useCallback(
    (id) => {
      dispatch(toggleFeatured(id));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (text) => {
      dispatch(setSearchText(text));
    },
    [dispatch]
  );

  const handleCategoryChange = useCallback(
    (cat) => {
      dispatch(setSelectedCategory(cat));
    },
    [dispatch]
  );

  const handleAddBlog = useCallback(
    (newBlog) => {
      dispatch(addBlog(newBlog));
    },
    [dispatch]
  );

  const handleRefresh = useCallback(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // 4. Custom Hook: useFilteredBlogs (utilizes useMemo internally)
  const filteredBlogs = useFilteredBlogs(blogs, searchText, selectedCategory);

  return (
    <div className="dashboard-container">
      {/* Reusable Header Component */}
      <Header onFetchBlogs={handleRefresh} loading={loading} />

      {/* Reusable BlogStats Component */}
      <BlogStats blogs={blogs} />

      {/* Reusable SearchBar Component with useRef focus */}
      <SearchBar
        inputRef={searchInputRef}
        searchText={searchText}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={["All", "React", "Redux", "Node"]}
      />

      {/* Add New Blog Form Component */}
      <AddBlogForm onAddBlog={handleAddBlog} />

      {/* Async Loading State Indicator */}
      {loading && (
        <div className="loading-banner">
          <div className="spinner"></div>
          <span>Loading blogs via createAsyncThunk...</span>
        </div>
      )}

      {/* Error Message Handling */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button className="btn-retry" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      )}

      {/* Search & Category Filter Results Info */}
      <div className="results-header">
        <h2>
          Articles{" "}
          <span className="results-badge">
            {filteredBlogs.length} of {blogs.length}
          </span>
        </h2>
        {(searchText || selectedCategory !== "All") && (
          <span className="filter-summary">
            Filtered by:{" "}
            {searchText && <strong>"{searchText}"</strong>}{" "}
            {selectedCategory !== "All" && (
              <span className="tag-indicator">Category: {selectedCategory}</span>
            )}
          </span>
        )}
      </div>

      {/* Reusable BlogList Component */}
      <BlogList
        blogs={filteredBlogs}
        onToggleFeatured={handleToggleFeatured}
        onDeleteBlog={handleDeleteBlog}
      />

      {/* Dashboard Footer */}
      <footer className="dashboard-footer">
        <p>
          DigiSkills 3.0 &bull; Full Stack Web Development &bull; Blog Dashboard with Redux Toolkit &amp; Performance Hooks
        </p>
      </footer>
    </div>
  );
}
