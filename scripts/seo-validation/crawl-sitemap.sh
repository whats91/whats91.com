#!/bin/sh
# Crawl every URL in the local server's sitemap.xml and verify per page:
#   status 200, exactly one canonical, canonical == page URL (self-canonical),
#   non-empty unique <title>, meta description present, og:title/og:image
#   present, twitter card present, no placeholder Google verification token,
#   single H1.
# Usage: sh scripts/seo-validation/crawl-sitemap.sh [base_url]
# Default base_url: http://localhost:3000  (canonicals always assert the
# production https://whats91.com origin regardless of base_url).
# Exit code: 0 = pass, 1 = failures found. No dependencies beyond curl.

BASE="${1:-http://localhost:3000}"
PROD="https://whats91.com"
titles_file="$(mktemp)"
fail_file="$(mktemp)"

urls=$(curl -s --max-time 30 "$BASE/sitemap.xml" | grep -o "<loc>[^<]*</loc>" | sed "s/<\/*loc>//g")
[ -z "$urls" ] && { echo "FATAL: empty sitemap at $BASE/sitemap.xml"; exit 1; }

echo "$urls" | while IFS= read -r prod_url; do
  path="${prod_url#$PROD}"
  local_url="$BASE$path"
  body=$(curl -s --max-time 30 "$local_url")
  st=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$local_url")
  can=$(printf '%s' "$body" | grep -o '<link rel="canonical" href="[^"]*"' | head -1 | sed 's/.*href="//;s/"$//')
  ncan=$(printf '%s' "$body" | grep -c '<link rel="canonical"')
  ttl=$(printf '%s' "$body" | grep -o '<title>[^<]*</title>' | head -1 | sed 's/<[^>]*>//g')
  ndesc=$(printf '%s' "$body" | grep -c '<meta name="description"')
  nogt=$(printf '%s' "$body" | grep -c 'property="og:title"')
  nogi=$(printf '%s' "$body" | grep -c 'property="og:image"')
  ntw=$(printf '%s' "$body" | grep -c 'name="twitter:card"')
  nver=$(printf '%s' "$body" | grep -c 'google-site-verification')
  h1n=$(printf '%s' "$body" | grep -o '<h1' | wc -l | tr -d ' ')
  err=""
  [ "$st" != "200" ] && err="$err status=$st"
  [ "$ncan" != "1" ] && err="$err canonical-count=$ncan"
  [ "$can" != "$prod_url" ] && err="$err canonical=$can(expected:$prod_url)"
  [ -z "$ttl" ] && err="$err empty-title"
  [ "$ndesc" -lt 1 ] && err="$err no-description"
  [ "$nogt" -lt 1 ] && err="$err no-og-title"
  [ "$nogi" -lt 1 ] && err="$err no-og-image"
  [ "$ntw" -lt 1 ] && err="$err no-twitter-card"
  [ "$nver" != "0" ] && err="$err placeholder-verification"
  [ "$h1n" != "1" ] && err="$err h1=$h1n"
  echo "$ttl" >> "$titles_file"
  if [ -n "$err" ]; then echo "FAIL $path:$err" | tee -a "$fail_file"; else echo "OK   $path"; fi
done

dups=$(sort "$titles_file" | uniq -d)
[ -n "$dups" ] && { echo "FAIL duplicate titles:"; echo "$dups"; echo "dup-titles" >> "$fail_file"; }

fails=$(wc -l < "$fail_file" | tr -d ' ')
rm -f "$titles_file" "$fail_file"
echo "---"
echo "failures: $fails"
[ "$fails" = "0" ] && exit 0 || exit 1
