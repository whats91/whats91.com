/**
 * Blog Module - Main exports
 * 
 * Re-exports all functions and types from the registry.
 */

export {
  blogPosts,
  getAllPosts,
  getPostBySlug,
  getFeaturedPosts,
  getRelatedPosts,
  getAllCategories,
  getAllTags,
  categoryColors,
  type BlogPostMeta,
} from "./registry";
