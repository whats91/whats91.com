#!/bin/sh
# Extract every internal href from every sitemap page and verify each target
# returns 200 on the local server.
# Usage: sh scripts/seo-validation/check-links.sh [base_url]
# Exit code: 0 = pass, 1 = broken links found. No dependencies beyond curl.

BASE="${1:-http://localhost:3000}"
PROD="https://whats91.com"
links_file="$(mktemp)"
fail_file="$(mktemp)"

curl -s --max-time 30 "$BASE/sitemap.xml" | grep -o "<loc>[^<]*</loc>" | sed "s/<\/*loc>//g" | while IFS= read -r prod_url; do
  path="${prod_url#$PROD}"
  curl -s --max-time 30 "$BASE$path" | grep -o 'href="/[^"]*"' | sed 's/href="//;s/"$//' \
    | grep -v '^/_next' | grep -v '^//' | sed 's/[#?].*$//' | grep -v '^/$' | grep -v '^$'
done | sort -u > "$links_file"

echo "unique internal link targets: $(wc -l < "$links_file" | tr -d ' ')"
while IFS= read -r l; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$BASE$l")
  [ "$code" != "200" ] && echo "BROKEN($code): $l" | tee -a "$fail_file"
done < "$links_file"

fails=$(wc -l < "$fail_file" | tr -d ' ')
rm -f "$links_file" "$fail_file"
echo "---"
echo "broken links: $fails"
[ "$fails" = "0" ] && exit 0 || exit 1
