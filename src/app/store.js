import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./features/blogs/blogSlice";

/**
 * ============================================================================
 * DigiSkills 3.0: Redux Store Configuration (store.js)
 * Combines the blog reducer into the root state.
 * ============================================================================
 */

export const store = configureStore({
  reducer: {
    blogs: blogReducer
  }
});

export default store;
