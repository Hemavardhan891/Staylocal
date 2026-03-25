// src/components/SEO.tsx
export default function SEO({ title, description, location }: { title: string; description: string; location: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "name": title,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressRegion": "India"
    }
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}