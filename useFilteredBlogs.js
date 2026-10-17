import { useMemo } from "react";

/**
 * ============================================================================
 * DigiSkills 3.0: Custom Hook - useFilteredBlogs
 * Optimized with useMemo to filter blogs by search text and category filter.
 * ============================================================================
 */
export function useFilteredBlogs(blogs = [], searchText = "", selectedCategory = "All") {
  return useMemo(() => {
    if (!Array.isArray(blogs)) return [];

    const query = searchText.trim().toLowerCase();

    return blogs.filter((blog) => {
      // 1. Search text filter (matches title, author, or category)
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query);

      // 2. Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchText, selectedCategory]);
}

export default useFilteredBlogs;
