interface JsonLdProps {
  data: object | object[];
}

/**
 * JSON-LD Structured Data Component
 * Renders structured data for SEO in a script tag
 * Supports single or multiple schema objects
 */
export function JsonLd({ data }: JsonLdProps) {
  const jsonLdData = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLdData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

/**
 * Pre-built JSON-LD schemas for common use cases
 * Import and use directly in your pages
 */
export * from "@/lib/seo/config";
