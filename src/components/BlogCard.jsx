import React from "react";

/**
 * BlogCard Component
 * Wrapped with React.memo to prevent unnecessary re-renders when parent re-renders.
 * Displays: title, category, author, readingTime, and featured status badge.
 */
export const BlogCard = React.memo(function BlogCard({
  blog,
  onToggleFeatured,
  onDeleteBlog
}) {
  console.log(`[Render] BlogCard #${blog.id} - "${blog.title}"`);

  // Category color theme helper
  const getCategoryClass = (cat) => {
    switch (cat.toLowerCase()) {
      case "react":
        return "badge-react";
      case "redux":
        return "badge-redux";
      case "node":
        return "badge-node";
      default:
        return "badge-default";
    }
  };

  return (
    <article className={`blog-card ${blog.featured ? "featured-card" : ""}`}>
      {/* Top Meta Header */}
      <div className="card-top-meta">
        <span className={`category-badge ${getCategoryClass(blog.category)}`}>
          {blog.category}
        </span>
        {blog.featured && (
          <span className="featured-badge" title="Featured Article">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="blog-title">{blog.title}</h3>

      {/* Author & Reading Time */}
      <div className="blog-info">
        <div className="author-meta">
          <span className="author-avatar">✍️</span>
          <span className="author-name">{blog.author}</span>
        </div>
        <div className="reading-time">
          <span>⏱️ {blog.readingTime} min read</span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="card-actions">
        <button
          className={`btn-feature-toggle ${blog.featured ? "is-featured" : ""}`}
          onClick={() => onToggleFeatured(blog.id)}
          title={blog.featured ? "Remove from Featured" : "Mark as Featured"}
        >
          {blog.featured ? "★ Unfeature" : "☆ Feature"}
        </button>

        <button
          className="btn-delete"
          onClick={() => onDeleteBlog(blog.id)}
          title="Delete this blog post"
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
});

export default BlogCard;
