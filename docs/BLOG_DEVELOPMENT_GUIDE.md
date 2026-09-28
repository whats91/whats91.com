# Blog Page Development Guide for Whats91

This guide provides complete instructions for adding new blog pages to the Whats91 website. Follow these conventions to maintain consistency with existing blog infrastructure.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Blog Types & Schema](#blog-types--schema)
4. [Adding a New Blog Post](#adding-a-new-blog-post)
5. [Content Formatting Rules](#content-formatting-rules)
6. [SEO Requirements](#seo-requirements)
7. [Component Reference](#component-reference)
8. [Styling Conventions](#styling-conventions)

---

## Quick Start

To add a new blog post, you only need to edit ONE file:

```
src/lib/blog/posts.ts
```

Add your new post object to the `blogPosts` array. The blog pages will automatically pick it up.

---

## Project Structure

### Blog-Related Files

```
src/
├── lib/
│   └── blog/
│       ├── index.ts          # Re-exports types and posts
│       ├── types.ts          # BlogPost, BlogAuthor, BlogCategory, BlogTag types
│       └── posts.ts          # All blog posts data (EDIT THIS FILE)
│
├── components/
│   └── blog/
│       ├── index.ts          # Re-exports BlogCard
│       └── BlogCard.tsx      # Card component for blog listing
│
└── app/
    └── blog/
        ├── layout.tsx        # Blog layout with JSON-LD schemas
        ├── page.tsx          # Blog listing page (search, filters, grid)
        └── [slug]/
            └── page.tsx      # Individual blog post page
```

### Key Imports

```typescript
// Types
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from "@/lib/blog/types";

// Helper functions
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

// Components
import { BlogCard } from "@/components/blog/BlogCard";
```

---

## Blog Types & Schema

### BlogAuthor

```typescript
type BlogAuthor = {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
};
```

### BlogCategory (Predefined)

```typescript
type BlogCategory = 
  | "WhatsApp API"
  | "ERP Integration"
  | "Business Automation"
  | "Industry Insights"
  | "Product Updates"
  | "Tutorials"
  | "Case Studies";
```

### BlogTag (Predefined)

```typescript
type BlogTag = 
  | "WhatsApp Cloud API"
  | "Busy Accounting"
  | "Chatbot"
  | "Automation"
  | "Marketing"
  | "CRM"
  | "Enterprise"
  | "India"
  | "Tutorial"
  | "Best Practices"
  | "Security"
  | "Compliance";
```

### BlogPost (Complete Structure)

```typescript
type BlogPost = {
  id: string;                    // Unique identifier (e.g., "1", "2")
  slug: string;                  // URL-friendly identifier (e.g., "my-blog-post")
  title: string;                 // Full title
  excerpt: string;               // Short summary (shown in cards)
  content: string;               // Full markdown content
  author: BlogAuthor;            // Author object
  category: BlogCategory;        // One of predefined categories
  tags: BlogTag[];               // Array of tags
  featuredImage?: string;        // Optional image URL
  featuredImageAlt?: string;     // Alt text for image
  publishedAt: string;           // ISO date string "YYYY-MM-DD"
  updatedAt?: string;            // Optional update date
  readingTime: number;           // Estimated reading time in minutes
  
  // SEO Metadata (REQUIRED)
  seo: {
    title: string;               // SEO title (different from post title)
    description: string;         // Meta description (150-160 chars)
    keywords: string[];          // Array of SEO keywords
    ogImage?: string;            // Open Graph image URL
    canonical?: string;          // Canonical URL
    noIndex?: boolean;           // Set true to hide from search
  };
  
  // AI/LLM Optimization (SEO 2.0) - REQUIRED
  aiOptimized: {
    summary: string;             // Short summary for AI crawlers
    keyTakeaways: string[];      // Key points for AI extraction (3-5 items)
    entities: string[];          // Named entities (products, companies)
    faq?: {                      // Optional FAQ for rich snippets
      question: string;
      answer: string;
    }[];
  };
  
  // Content flags
  isFeatured?: boolean;          // Show as featured post
  isDraft?: boolean;             // Hide from public
  relatedPosts?: string[];       // Array of related post slugs
};
```

---

## Adding a New Blog Post

### Step 1: Open posts.ts

```bash
src/lib/blog/posts.ts
```

### Step 2: Create Author (if new)

```typescript
const newAuthor: BlogAuthor = {
  name: "John Doe",
  role: "Technical Writer",
  bio: "Expert in WhatsApp API integration.",
  social: {
    twitter: "@johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
};
```

### Step 3: Add Post to Array

```typescript
export const blogPosts: BlogPost[] = [
  // ... existing posts
  {
    id: "3",  // Increment from last post
    slug: "your-post-slug-here",
    title: "Your Post Title Here",
    excerpt: "A compelling 1-2 sentence summary that appears in blog cards.",
    author: defaultAuthor, // or custom author
    category: "WhatsApp API",
    tags: ["WhatsApp Cloud API", "Tutorial", "Best Practices"],
    publishedAt: "2026-02-01",
    readingTime: 8,
    isFeatured: false,
    seo: {
      title: "Your SEO Title | Whats91",
      description: "Meta description for search engines. Keep it 150-160 characters.",
      keywords: [
        "keyword 1",
        "keyword 2",
        "keyword 3",
      ],
    },
    aiOptimized: {
      summary: "A concise summary for AI crawlers to understand the content.",
      keyTakeaways: [
        "First key point",
        "Second key point",
        "Third key point",
      ],
      entities: [
        "WhatsApp Cloud API",
        "Meta",
        "Whats91",
      ],
      faq: [
        {
          question: "What is the main topic?",
          answer: "Clear and concise answer for rich snippets.",
        },
      ],
    },
    content: `
# Your Post Title

Introduction paragraph here...

## Section 1

Content for section 1...

### Subsection

More detailed content...

## Section 2

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

\`\`\`javascript
// Code example
console.log("Hello World");
\`\`\`

## Conclusion

Wrap up your post here...
    `.trim(),
  },
];
```

---

## Content Formatting Rules

### Markdown Support

The blog post content supports the following markdown:

```markdown
# Heading 1 (Main title - use once)
## Heading 2 (Section headers)
### Heading 3 (Subsection headers)

**Bold text**
*Italic text*

[Link text](https://example.com)

- Bullet list item
- Another item

1. Numbered list
2. Second item

`inline code`

\`\`\`javascript
// Code block
const x = 1;
\`\`\`

> Blockquote text here

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Tables

Tables are automatically styled. Use this format:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Links

Internal links should use relative paths:
```markdown
[Busy ERP Integration](/solutions/busy-erp)
[Contact Us](/contact)
```

External links use full URLs:
```markdown
[Meta Documentation](https://developers.facebook.com/docs/whatsapp)
```

---

## SEO Requirements

### Title Format

```
[Primary Keyword] | [Secondary Info] | Whats91
```

Example:
```
WhatsApp Cloud API Complete Guide 2026 | Setup & Best Practices | Whats91
```

### Description Rules

- 150-160 characters
- Include primary keyword naturally
- Include a call-to-action or value proposition
- Make it compelling for click-through

### Keywords

- Include 5-10 relevant keywords
- Mix short-tail and long-tail keywords
- Include brand keywords ("Whats91", "WhatsApp Cloud API")
- Include location keywords if relevant ("India", "Indian enterprises")

### AI Optimization

The `aiOptimized` field is crucial for SEO 2.0:

1. **summary**: 1-2 sentences that AI crawlers can extract
2. **keyTakeaways**: 3-5 bullet points that summarize the article
3. **entities**: Named entities mentioned in the article
4. **faq**: Optional FAQ schema for rich snippets in search results

---

## Component Reference

### BlogCard

Used automatically in blog listing. Props:

```typescript
interface BlogCardProps {
  post: BlogPost;
}
```

Category color mapping (automatic):

| Category | Color |
|----------|-------|
| WhatsApp API | Green |
| ERP Integration | Blue |
| Business Automation | Purple |
| Industry Insights | Orange |
| Product Updates | Pink |
| Tutorials | Cyan |
| Case Studies | Amber |

### Helper Functions

```typescript
// Get all published posts (sorted by date)
getAllPosts(): BlogPost[]

// Get single post by slug
getPostBySlug(slug: string): BlogPost | undefined

// Get posts by category
getPostsByCategory(category: BlogCategory): BlogPost[]

// Get posts by tag
getPostsByTag(tag: BlogTag): BlogPost[]

// Get featured posts
getFeaturedPosts(): BlogPost[]

// Get related posts
getRelatedPosts(currentSlug: string, limit?: number): BlogPost[]

// Get all categories
getAllCategories(): BlogCategory[]

// Get all tags
getAllTags(): BlogTag[]
```

---

## Checklist for New Posts

- [ ] Unique `id` (increment from last post)
- [ ] Descriptive `slug` (kebab-case)
- [ ] Compelling `title`
- [ ] Concise `excerpt` (shown in cards)
- [ ] Correct `category` from predefined list
- [ ] Relevant `tags` from predefined list
- [ ] ISO date format for `publishedAt`
- [ ] Accurate `readingTime` estimate
- [ ] Complete `seo` object with title, description, keywords
- [ ] Complete `aiOptimized` object with summary, keyTakeaways, entities
- [ ] Well-formatted `content` in markdown
- [ ] Optional FAQ for rich snippets

---

## Testing Your Post

1. Navigate to `/blog` to see your post in the listing
2. Click on your post to view the individual page
3. Check:
   - Title displays correctly
   - Category badge has correct color
   - Tags are visible
   - Reading time is accurate
   - Content renders properly
   - Tables are styled
   - Code blocks are highlighted
   - Links work correctly
   - Related posts appear
