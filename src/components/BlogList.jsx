import React from "react";
import BlogCard from "./BlogCard";

/**
 * BlogList Component
 * Iterates through blogs using .map() and renders BlogCard components inside a responsive grid.
 */
export function BlogList({ blogs, onToggleFeatured, onDeleteBlog }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No Blogs Found</h3>
        <p>No blog posts matched your search criteria or category filter.</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onToggleFeatured={onToggleFeatured}
          onDeleteBlog={onDeleteBlog}
        />
      ))}
    </div>
  );
}

export default BlogList;
