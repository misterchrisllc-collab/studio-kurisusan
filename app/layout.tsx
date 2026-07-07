import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  localBusinessJsonLd,
} from "@/lib/site";

const HOME_TITLE = "Studio くりすさん｜大阪のクリエイティブスタジオ｜写真・ブランディング";
const OG_TITLE = "Studio くりすさん｜大阪のクリエイティブスタジオ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      { url: "/photos/hero.jpg", width: 1280, height: 853, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/photos/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500&family=Noto+Serif+JP:wght@200;300;400;500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
