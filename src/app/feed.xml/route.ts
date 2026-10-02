import { contentDates, feedItems } from "@/lib/content/dates";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/seo/config";

export async function GET() {
  // RSS permits undated items; never invent a mandatory publication date.
  const posts = feedItems(getAllPosts());
  const lastChanged = posts.map(post => contentDates(post).lastModified).filter((value): value is string => Boolean(value)).sort().at(-1);
  const lastPublished = posts.map(post => contentDates(post).published).filter((value): value is string => Boolean(value)).sort().at(-1);
  const baseUrl = siteConfig.url;

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>${escapeXml(siteConfig.name)} Blog</title>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <atom:link href="${baseUrl}/blog" rel="alternate" type="text/html"/>
    <description>${escapeXml(siteConfig.description)} - Technical articles on WhatsApp API, ERP integration, and business messaging automation.</description>
    <language>en-IN</language>
    <copyright>Copyright ${new Date().getFullYear()} ${siteConfig.publisher}</copyright>
    ${lastChanged ? `<lastBuildDate>${new Date(lastChanged).toUTCString()}</lastBuildDate>` : ""}
    ${lastPublished ? `<pubDate>${new Date(lastPublished).toUTCString()}</pubDate>` : ""}
    <generator>Whats91 RSS Generator 2.0</generator>
    <ttl>60</ttl>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>${escapeXml(siteConfig.name)} Blog</title>
      <link>${baseUrl}/blog</link>
      <width>1200</width>
      <height>630</height>
    </image>
    <category>Technology</category>
    <category>Business Communication</category>
    <category>WhatsApp API</category>
    ${posts
      .slice(0, 20)
      .map((post) => {
        const postUrl = `${baseUrl}/blog/${post.slug}`;
        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded><![CDATA[${post.excerpt}<p><a href="${postUrl}">Read the full article on Whats91 Blog</a></p>]]></content:encoded>
      ${contentDates(post).feedPublished ? `<pubDate>${contentDates(post).feedPublished}</pubDate>` : ""}
      <category domain="${baseUrl}/blog">${escapeXml(post.category)}</category>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
      <source url="${baseUrl}/feed.xml">${escapeXml(siteConfig.name)} Blog</source>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
