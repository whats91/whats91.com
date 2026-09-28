#!/bin/sh
# Verify SEO-relevant endpoints on the local server:
#   robots.txt Allow/Disallow policy lines, sitemap purity (no /api|llms|feed,
#   no duplicates), markdown-twin canonical Link headers point at the matching
#   HTML page, MCP endpoints fetchable + X-Robots-Tag: noindex + CORS intact,
#   og-image.png 200 image/png.
# Usage: sh scripts/seo-validation/check-endpoints.sh [base_url]
# Exit code: 0 = pass, 1 = failures. No dependencies beyond curl.

BASE="${1:-http://localhost:3000}"
fail_file="$(mktemp)"
fail() { echo "FAIL $1" | tee -a "$fail_file"; }
ok() { echo "OK   $1"; }

# --- robots.txt ---
robots=$(curl -s --max-time 30 "$BASE/robots.txt")
echo "$robots" | grep -q "^Allow: /api/md/" && ok "robots: Allow /api/md/" || fail "robots: missing Allow /api/md/"
echo "$robots" | grep -q "^Allow: /api/mcp" && ok "robots: Allow /api/mcp" || fail "robots: missing Allow /api/mcp"
echo "$robots" | grep -q "^Disallow: /api/" && ok "robots: Disallow /api/ retained" || fail "robots: Disallow /api/ missing"
echo "$robots" | grep -q "^Sitemap: https://whats91.com/sitemap.xml" && ok "robots: sitemap declared" || fail "robots: sitemap declaration missing"

# --- sitemap purity ---
sm=$(curl -s --max-time 30 "$BASE/sitemap.xml")
n_bad=$(echo "$sm" | grep -c "/api/\|llms.txt\|feed.xml")
[ "$n_bad" = "0" ] && ok "sitemap: no /api, llms.txt, feed.xml entries" || fail "sitemap: $n_bad non-HTML entries"
n_dup=$(echo "$sm" | grep -o "<loc>[^<]*</loc>" | sort | uniq -d | wc -l | tr -d ' ')
[ "$n_dup" = "0" ] && ok "sitemap: no duplicate URLs" || fail "sitemap: $n_dup duplicate URLs"

# --- markdown twins: canonical Link header -> matching HTML page ---
# slug:expected-html-path pairs cover every routing branch in the md route
for pair in \
  "busy-erp:/solutions/busy-erp" \
  "miracle-whatsapp-api:/solutions/miracle-whatsapp-api" \
  "chat-shortcuts-conversation-automation:/features/chat-shortcuts-conversation-automation" \
  "whats91-coins:/partners/whats91-coins" \
  "whatsapp-templates:/whatsapp-templates" \
  "pricing:/pricing" \
  "blog-whatsapp-cloud-api-complete-guide-2026:/blog/whatsapp-cloud-api-complete-guide-2026" \
; do
  slug="${pair%%:*}"; expected="https://whats91.com${pair#*:}"
  hdr=$(curl -sI --max-time 30 "$BASE/api/md/$slug" | tr -d '\r')
  link=$(echo "$hdr" | grep -i "^link:" | grep -o "<[^>]*>" | tr -d "<>")
  idx=$(echo "$hdr" | grep -ic "^x-robots-tag: index")
  if [ "$link" = "$expected" ]; then ok "md/$slug canonical -> $expected"; else fail "md/$slug canonical '$link' != '$expected'"; fi
  [ "$idx" = "0" ] || fail "md/$slug still sends X-Robots-Tag: index"
done

# --- MCP endpoints: fetchable, noindex, CORS ---
for ep in "/api/mcp" "/api/mcp/pages/busy-erp"; do
  hdr=$(curl -sI --max-time 30 "$BASE$ep" | tr -d '\r')
  st=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$BASE$ep")
  [ "$st" = "200" ] && ok "mcp $ep fetchable (200)" || fail "mcp $ep status $st"
  echo "$hdr" | grep -qi "^x-robots-tag: noindex" && ok "mcp $ep noindex" || fail "mcp $ep missing noindex"
  echo "$hdr" | grep -qi "^access-control-allow-origin: \*" && ok "mcp $ep CORS intact" || fail "mcp $ep CORS header missing"
done

# --- OG image ---
ogct=$(curl -s -o /dev/null -w "%{http_code} %{content_type}" --max-time 30 "$BASE/og-image.png")
[ "$ogct" = "200 image/png" ] && ok "og-image.png 200 image/png" || fail "og-image.png: $ogct"

fails=$(wc -l < "$fail_file" | tr -d ' ')
rm -f "$fail_file"
echo "---"
echo "failures: $fails"
[ "$fails" = "0" ] && exit 0 || exit 1
