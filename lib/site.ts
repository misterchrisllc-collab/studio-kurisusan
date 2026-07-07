// Central site constants. If a custom domain is added later, update SITE_URL
// here only — layout metadata, sitemap, robots, and the JSON-LD all read from this.
export const SITE_URL = "https://studio-kurisusan.vercel.app";
export const SITE_NAME = "Studio くりすさん";
export const SITE_DESCRIPTION =
  "集客・採用・ブランディングなど、小さなビジネスの課題を解決する大阪のクリエイティブパートナー。写真・デザイン・Googleビジネス・SNS・AIを手段に、継続的にご一緒します。";

// Google Business Profile NAP — single source of truth. MUST match the actual
// GBP listing exactly (name/address/phone/hours) or local SEO suffers. The
// public brand elsewhere is SITE_NAME ("Studio くりすさん"); the *listing* name
// is deliberately different (see HANDOFF §4).
export const BUSINESS = {
  listingName: "フォトスタジオ くりすさん",
  telephone: "+81-90-8437-0387",
  email: "studiokurisusan@gmail.com",
  streetAddress: "Moriki Mansion #310, 2-14-6 Honjo-higashi",
  addressLocality: "Kita-ku",
  addressRegion: "Osaka",
  postalCode: "531-0074",
  addressCountry: "JP",
  opens: "09:00",
  closes: "21:00",
  priceRange: "¥15,000〜¥95,000",
  instagram: "https://instagram.com/studio_kurisusan",
} as const;

// LocalBusiness structured data (schema.org). @type ProfessionalService is a
// LocalBusiness subtype — on brand ("creative business partner"), and still gets
// Google's local treatment. Swap to PhotographicStudio only to mirror a GBP
// "写真スタジオ" category if desired.
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.listingName,
    alternateName: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/photos/hero.jpg`,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    areaServed: { "@type": "City", name: "Osaka" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: BUSINESS.opens,
        closes: BUSINESS.closes,
      },
    ],
    sameAs: [BUSINESS.instagram],
  };
}
