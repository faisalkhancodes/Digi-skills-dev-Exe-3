import React, { useMemo } from "react";

/**
 * BlogStats Component
 * Computes and displays dashboard analytics for the blogs.
 */
export function BlogStats({ blogs = [] }) {
  const stats = useMemo(() => {
    const total = blogs.length;
    const featured = blogs.filter((b) => b.featured).length;
    const totalReadingTime = blogs.reduce((sum, b) => sum + (Number(b.readingTime) || 0), 0);
    const avgReadingTime = total > 0 ? (totalReadingTime / total).toFixed(1) : 0;
    const uniqueCategories = new Set(blogs.map((b) => b.category)).size;

    return { total, featured, totalReadingTime, avgReadingTime, uniqueCategories };
  }, [blogs]);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-icon">📚</span>
        <div>
          <span className="stat-label">Total Blogs</span>
          <h4 className="stat-value">{stats.total}</h4>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">⭐</span>
        <div>
          <span className="stat-label">Featured Posts</span>
          <h4 className="stat-value">{stats.featured}</h4>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">⏱️</span>
        <div>
          <span className="stat-label">Total Reading Time</span>
          <h4 className="stat-value">{stats.totalReadingTime} mins</h4>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">🏷️</span>
        <div>
          <span className="stat-label">Categories</span>
          <h4 className="stat-value">{stats.uniqueCategories}</h4>
        </div>
      </div>
    </div>
  );
}

export default BlogStats;
