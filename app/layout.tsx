import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');
const description = 'The Deepthika Index — a personal collection of product design, engineering, creative experiments and research by Deepthika S.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'The Deepthika Index — A Personal Collection by Deepthika S',
  description,
  keywords: ['Deepthika S', 'product design', 'human-centred design', 'electronics', 'interaction design', 'creative AI', 'design research'],
  openGraph: { title: 'The Deepthika Index — A Personal Collection by Deepthika S', description, type: 'website', siteName: 'The Deepthika Index', images: [{ url: '/images/og-index.png', width: 1200, height: 630, alt: 'The Deepthika Index — a personal collection by Deepthika S' }] },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500&display=swap" rel="stylesheet" />
  <noscript><style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style></noscript>
  </head><body><Header /><main>{children}</main><Footer /><BackToTop /><Analytics /></body></html>;
}
