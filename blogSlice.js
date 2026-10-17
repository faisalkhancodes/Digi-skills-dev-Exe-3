import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * ============================================================================
 * DigiSkills 3.0: Blog Dashboard Redux Slice (blogSlice.js)
 * Manages blog list, search text, selected category, loading, and error states.
 * ============================================================================
 */

// Initial Sample Blog Data
export const initialBlogs = [
  { id: 1, title: "Understanding React Hooks", category: "React", author: "Ali Khan", readingTime: 6, featured: true },
  { id: 2, title: "Redux Toolkit Basics", category: "Redux", author: "Sara Ahmed", readingTime: 8, featured: false },
  { id: 3, title: "Building Blog UI in React", category: "React", author: "Hamza Malik", readingTime: 5, featured: false },
  { id: 4, title: "Node.js and Express Introduction", category: "Node", author: "Ayesha Noor", readingTime: 7, featured: true }
];

// Async Thunk: Simulates an API call with loading and error handling
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network latency (800ms delay)
      await new Promise((resolve) => setTimeout(resolve, 800));
      return initialBlogs;
    } catch (err) {
      return rejectWithValue("Failed to fetch blogs from server. Please try again.");
    }
  }
);

const initialState = {
  blogs: initialBlogs,
  searchText: "",
  selectedCategory: "All",
  loading: false,
  error: null
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // 1. Add Blog Action
    addBlog: (state, action) => {
      const newId = state.blogs.length > 0 ? Math.max(...state.blogs.map(b => b.id)) + 1 : 1;
      const newBlog = {
        id: newId,
        title: action.payload.title,
        category: action.payload.category || "General",
        author: action.payload.author || "Anonymous",
        readingTime: Number(action.payload.readingTime) || 5,
        featured: Boolean(action.payload.featured)
      };
      state.blogs.unshift(newBlog);
    },

    // 2. Delete Blog Action
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },

    // 3. Toggle Featured Status Action
    toggleFeatured: (state, action) => {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) {
        blog.featured = !blog.featured;
      }
    },

    // 4. Set Search Text Action
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    // 5. Set Category Filter Action
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    // Reset blogs
    resetBlogs: (state) => {
      state.blogs = initialBlogs;
      state.searchText = "";
      state.selectedCategory = "All";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unexpected error occurred.";
      });
  }
});

export const {
  addBlog,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setSelectedCategory,
  resetBlogs
} = blogSlice.actions;

export default blogSlice.reducer;
