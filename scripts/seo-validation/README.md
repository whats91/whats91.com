# SEO validation scripts

Reusable post-build checks for the Whats91 landing site. No dependencies
beyond `curl` and Node's built-ins — do **not** add packages for validation.

Run them against a **production-mode** local server (not `next dev`):

```sh
rm -rf .next
npx next build
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/
NODE_ENV=production node .next/standalone/server.js &   # serves :3000

sh  scripts/seo-validation/crawl-sitemap.sh     # routes, canonicals, metadata
sh  scripts/seo-validation/check-links.sh       # internal links
node scripts/seo-validation/check-schema.mjs    # JSON-LD parse + homepage policy
sh  scripts/seo-validation/check-endpoints.sh   # robots, sitemap purity, md/mcp headers, OG image
```

Each script prints `OK`/`FAIL` lines and exits non-zero on any failure, so
they can gate a deploy. All canonical assertions expect the production origin
`https://whats91.com` in page metadata regardless of the local base URL
(pass a different base URL as the first argument if the server is not on
`http://localhost:3000`).
