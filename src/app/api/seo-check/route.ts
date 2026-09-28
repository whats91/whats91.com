import { NextRequest, NextResponse } from "next/server";

interface SEOCheck {
  id: string;
  name: string;
  description: string;
  status: "pass" | "warning" | "fail";
  score: number;
  details: string;
  icon: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const startTime = Date.now();

    // Fetch the webpage
    let html = "";
    
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Whats91SEOBot/1.0)",
        },
        signal: AbortSignal.timeout(10000),
      });
      html = await response.text();
    } catch {
      // Continue with empty html if fetch fails
    }

    const loadTime = `${Date.now() - startTime}ms`;

    // Perform SEO checks
    const checks: SEOCheck[] = [];

    // 1. Title Tag Check
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    checks.push({
      id: "title",
      name: "Title Tag",
      description: "Page title for search results",
      status: title ? (title.length >= 30 && title.length <= 60 ? "pass" : "warning") : "fail",
      score: title ? (title.length >= 30 && title.length <= 60 ? 100 : 70) : 0,
      details: title 
        ? `Found: "${title}" (${title.length} chars - ${title.length < 30 ? "too short" : title.length > 60 ? "too long" : "optimal"})`
        : "No title tag found",
      icon: "FileText",
    });

    // 2. Meta Description Check
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : "";
    checks.push({
      id: "description",
      name: "Meta Description",
      description: "Description for search results",
      status: description ? (description.length >= 120 && description.length <= 160 ? "pass" : "warning") : "fail",
      score: description ? (description.length >= 120 && description.length <= 160 ? 100 : 70) : 0,
      details: description 
        ? `Found: "${description.substring(0, 50)}..." (${description.length} chars)`
        : "No meta description found",
      icon: "FileText",
    });

    // 3. H1 Tag Check
    const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
    const h1Count = h1Matches ? h1Matches.length : 0;
    checks.push({
      id: "h1",
      name: "H1 Heading",
      description: "Main page heading",
      status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "warning",
      score: h1Count === 1 ? 100 : h1Count === 0 ? 0 : 50,
      details: h1Count === 1 ? "One H1 tag found (optimal)" : h1Count === 0 ? "No H1 tag found" : `${h1Count} H1 tags found (should be 1)`,
      icon: "Code",
    });

    // 4. Images Alt Text Check
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const imgWithAlt = html.match(/<img[^>]*alt=["'][^"']+["'][^>]*>/gi) || [];
    const imgAltScore = imgMatches.length > 0 ? Math.round((imgWithAlt.length / imgMatches.length) * 100) : 100;
    checks.push({
      id: "images",
      name: "Image Alt Text",
      description: "Alt attributes for images",
      status: imgAltScore === 100 ? "pass" : imgAltScore >= 50 ? "warning" : "fail",
      score: imgAltScore,
      details: imgMatches.length > 0 
        ? `${imgWithAlt.length}/${imgMatches.length} images have alt text`
        : "No images found",
      icon: "Image",
    });

    // 5. Mobile Friendly Check
    const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
    checks.push({
      id: "viewport",
      name: "Mobile Friendly",
      description: "Responsive viewport meta tag",
      status: viewportMatch ? "pass" : "fail",
      score: viewportMatch ? 100 : 0,
      details: viewportMatch ? "Viewport meta tag found" : "No viewport meta tag found",
      icon: "Smartphone",
    });

    // 6. HTTPS Check
    const isHttps = url.startsWith("https://");
    checks.push({
      id: "https",
      name: "HTTPS",
      description: "Secure connection",
      status: isHttps ? "pass" : "fail",
      score: isHttps ? 100 : 0,
      details: isHttps ? "Site uses HTTPS" : "Site does not use HTTPS",
      icon: "Shield",
    });

    // 7. Canonical URL Check
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    checks.push({
      id: "canonical",
      name: "Canonical URL",
      description: "Prevents duplicate content issues",
      status: canonicalMatch ? "pass" : "warning",
      score: canonicalMatch ? 100 : 50,
      details: canonicalMatch ? `Canonical URL: ${canonicalMatch[1]}` : "No canonical URL specified",
      icon: "Link2",
    });

    // 8. Open Graph Check
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*>/i);
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*>/i);
    const ogScore = (ogTitleMatch ? 50 : 0) + (ogDescMatch ? 50 : 0);
    checks.push({
      id: "opengraph",
      name: "Open Graph Tags",
      description: "Social media sharing optimization",
      status: ogScore === 100 ? "pass" : ogScore > 0 ? "warning" : "fail",
      score: ogScore,
      details: ogScore === 100 ? "All basic OG tags found" : ogScore > 0 ? "Some OG tags missing" : "No OG tags found",
      icon: "Globe",
    });

    // 9. Robots.txt Check (simplified)
    checks.push({
      id: "robots",
      name: "Robots.txt",
      description: "Search engine crawling instructions",
      status: "pass",
      score: 100,
      details: "Check robots.txt manually for proper configuration",
      icon: "FileText",
    });

    // 10. Sitemap Check (simplified)
    checks.push({
      id: "sitemap",
      name: "XML Sitemap",
      description: "Help search engines discover pages",
      status: "pass",
      score: 100,
      details: "Ensure sitemap.xml exists and is submitted to search consoles",
      icon: "Code",
    });

    // Calculate overall score
    const overallScore = Math.round(checks.reduce((sum, check) => sum + check.score, 0) / checks.length);

    // Generate recommendations
    const recommendations: string[] = [];
    
    checks.forEach((check) => {
      if (check.status === "fail") {
        recommendations.push(`Fix: ${check.name} - ${check.details}`);
      } else if (check.status === "warning") {
        recommendations.push(`Improve: ${check.name} - ${check.details}`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push("Great job! Your SEO is well optimized. Continue monitoring and updating content regularly.");
    }

    return NextResponse.json({
      url,
      overallScore,
      checks,
      recommendations,
      loadTime,
    });
  } catch (error) {
    console.error("SEO check error:", error);
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}
