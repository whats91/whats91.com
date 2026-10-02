# AGENTS.md - AI Coding Agent Directives

> This file provides explicit directives for AI coding agents (Claude, GPT-4, Cursor, etc.) working on the Whats91 codebase.

## Project Overview

Whats91 is an Enterprise WhatsApp Cloud API Platform built with Next.js 16, TypeScript, and Tailwind CSS. It serves as an official Meta Business Solution Provider for India, offering WhatsApp Business API integration, ERP connectivity, and automation solutions.

## Technology Stack

```yaml
framework: Next.js 16 (App Router)
language: TypeScript 5
styling: Tailwind CSS 4 + shadcn/ui
form intake: Browser POST to the Graph public form-submission API; no website database
auth: NextAuth.js v4
state: Zustand (client), TanStack Query (server)
```

## Critical Coding Standards

### 1. Server vs Client Components

```typescript
// ✅ CORRECT: Default to Server Components
// File: src/app/page.tsx (no "use client" directive)
export default async function Page() {
  return <div>Public website content</div>;
}

// ❌ AVOID: Client Components for data fetching
"use client";
import { useState, useEffect } from "react";
// This is an anti-pattern - use Server Components instead
```

### 2. API Routes Pattern

```typescript
// File: src/app/api/example/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

// Always validate input with Zod
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    
    // Business logic here
    
    return NextResponse.json({ success: true, data: validated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
```

### 3. Form Submissions

Contact and demo enquiries go only to `https://graph.whats91.com/public/form-submissions` from the browser. Keep the Graph idempotency key for an unchanged retry. Do not add website storage, CRM forwarding, or Bot Master notifications.

### 4. SEO Component Pattern

```typescript
// Use the existing SEO configuration system
import { generatePageMetadata } from "@/lib/seo/config";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo/config";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Page Title",
    description: "Page description (120-160 chars)",
    keywords: ["keyword1", "keyword2"],
    path: "/page-path",
  });
}
```

### 5. Semantic HTML Structure

```tsx
// ✅ CORRECT: Use semantic elements for AI crawlers
export default function Page() {
  return (
    <main className="min-h-screen">
      <article>
        <header>
          <h1>Page Title</h1>
        </header>
        <section aria-labelledby="features-heading">
          <h2 id="features-heading">Features</h2>
          <p>Content here...</p>
        </section>
      </article>
    </main>
  );
}

// ❌ AVOID: Generic div soup
export default function Page() {
  return (
    <div className="min-h-screen">
      <div>
        <div>Page Title</div>
      </div>
      <div>
        <div>Features</div>
        <div>Content here...</div>
      </div>
    </div>
  );
}
```

## File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components (DO NOT MODIFY)
│   ├── landing/           # Landing page components
│   └── shared/            # Reusable components
├── lib/
│   ├── graph-form-submissions.ts # Graph contact/demo contract
│   ├── blog/              # Blog system
│   ├── seo/               # SEO utilities
│   └── utils.ts           # Helper functions
```

## Known Issues & Solutions

### Image Compression Tool
- Uses client-side processing (browser APIs)
- Requires "use client" directive
- Uses Promise.all for batch processing

### SEO Checker
- Icon names stored as strings, mapped client-side
- Cannot serialize React components to JSON

### Webhook Routes
- Must handle signature verification
- Return 200 status quickly, process async

## Prohibited Actions

1. **Never** modify files in `src/components/ui/` - these are shadcn/ui components
2. **Never** reintroduce website database storage or parallel form delivery.
3. **Never** use blue/indigo colors - use brand colors from tailwind config
4. **Never** create client components when server components suffice
5. **Never** skip error handling in API routes

## Testing Commands

```bash
bun run lint     # Check code quality
bun run dev      # Development server (auto-started)
```

## Current Priorities

1. Complete SEO 2.0 implementation (llms.txt, markdown twins)
2. Add MCP server endpoints for agentic access
3. Expand blog content with AI-optimized articles
4. Implement more free tools based on user demand

## Version

- Next.js: 16.x
- TypeScript: 5.x
- Node: 24.x
- Last Updated: 2026-01

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
