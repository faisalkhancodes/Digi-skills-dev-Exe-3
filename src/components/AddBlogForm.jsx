import React, { useState } from "react";

/**
 * AddBlogForm Component
 * Form to dispatch addBlog action with title, category, author, reading time, and featured flag.
 */
export function AddBlogForm({ onAddBlog }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("React");
  const [author, setAuthor] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  const [featured, setFeatured] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert("Please enter a title and author name.");
      return;
    }

    onAddBlog({
      title: title.trim(),
      category,
      author: author.trim(),
      readingTime: Number(readingTime) || 5,
      featured
    });

    // Reset form
    setTitle("");
    setAuthor("");
    setReadingTime(5);
    setFeatured(false);
    setIsOpen(false);
  };

  return (
    <div className="add-blog-section">
      {!isOpen ? (
        <button className="btn-open-form" onClick={() => setIsOpen(true)}>
          ➕ Add New Blog Post
        </button>
      ) : (
        <form className="add-blog-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Publish New Blog Post</h3>
            <button
              type="button"
              className="btn-close-form"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Blog Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Master CSS Grid"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Author Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Faisal Khan"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="React">React</option>
                <option value="Redux">Redux</option>
                <option value="Node">Node</option>
                <option value="CSS">CSS</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reading Time (Minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-footer">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span>Mark as Featured Post ⭐</span>
            </label>

            <div className="form-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                ✓ Add Blog
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddBlogForm;
