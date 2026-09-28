# AGENTS.md - AI Coding Agent Directives

> This file provides explicit directives for AI coding agents (Claude, GPT-4, Cursor, etc.) working on the Whats91 codebase.

## Project Overview

Whats91 is an Enterprise WhatsApp Cloud API Platform built with Next.js 16, TypeScript, and Tailwind CSS. It serves as an official Meta Business Solution Provider for India, offering WhatsApp Business API integration, ERP connectivity, and automation solutions.

## Technology Stack

```yaml
framework: Next.js 16 (App Router)
language: TypeScript 5
styling: Tailwind CSS 4 + shadcn/ui
database: Prisma ORM (SQLite)
auth: NextAuth.js v4
state: Zustand (client), TanStack Query (server)
```

## Critical Coding Standards

### 1. Server vs Client Components

```typescript
// ✅ CORRECT: Default to Server Components
// File: src/app/page.tsx (no "use client" directive)
import { db } from "@/lib/db";

export default async function Page() {
  const data = await db.example.findMany();
  return <div>{data.map(...)}</div>;
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

### 3. Database Operations

```typescript
// File: src/lib/db.ts (already exists)
// Always use the singleton Prisma client
import { db } from "@/lib/db";

// ✅ CORRECT: Use transactions for related operations
await db.$transaction([
  db.user.create({ data: userData }),
  db.auditLog.create({ data: logData }),
]);

// ❌ AVOID: Multiple separate calls for related data
await db.user.create({ data: userData });
await db.auditLog.create({ data: logData }); // Can fail independently
```

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
│   ├── db.ts              # Prisma client singleton
│   ├── blog/              # Blog system
│   ├── seo/               # SEO utilities
│   └── utils.ts           # Helper functions
└── prisma/
    └── schema.prisma      # Database schema
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
2. **Never** use `prisma` directly - always import from `@/lib/db`
3. **Never** use blue/indigo colors - use brand colors from tailwind config
4. **Never** create client components when server components suffice
5. **Never** skip error handling in API routes

## Testing Commands

```bash
bun run lint     # Check code quality
bun run db:push  # Push schema changes
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
- Node: 20.x
- Last Updated: 2026-01
