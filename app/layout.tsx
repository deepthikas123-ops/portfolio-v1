import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

const description =
  'Portfolio of Deepthika S — ECE student and product designer working across product design, human-centred design, electronics, immersive VR interaction and research on how people see, make and trust with AI.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Deepthika S — Product Design, Immersive Interaction & AI Research',
  description,
  keywords: [
    'product design',
    'human-centred design',
    'electronics',
    'virtual reality',
    'eye tracking',
    'human-AI trust',
    'creative AI',
    'design research',
  ],
  openGraph: {
    title: 'Deepthika S — Product Design, Immersive Interaction & AI Research',
    description:
      'Product design and electronics, immersive VR and eye tracking, and research on human–AI trust, multi-agent LLMs and creative AI.',
    type: 'website',
    siteName: 'Deepthika S',
    images: ['/images/flavovr-system-architecture.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Inter+Tight:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <div className="page-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
