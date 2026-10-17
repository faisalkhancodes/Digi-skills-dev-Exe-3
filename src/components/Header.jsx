import React from "react";

/**
 * Header Component
 * Displays application branding, title, and async reload action.
 */
export function Header({ onFetchBlogs, loading }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-badge">⚡ DigiSkills 3.0 Full Stack</div>
        <h1>Blog Dashboard</h1>
        <p>React Hooks, Custom Hooks, Performance Optimization &amp; Redux Toolkit</p>
      </div>

      <div className="header-actions">
        <button
          className="btn-fetch"
          onClick={onFetchBlogs}
          disabled={loading}
          title="Dispatch Redux createAsyncThunk to simulate API fetching"
        >
          {loading ? "⏳ Fetching Blogs..." : "🔄 Refresh via Async Thunk"}
        </button>
      </div>
    </header>
  );
}

export default Header;
