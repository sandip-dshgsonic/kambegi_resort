import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kambegiresort.com"),
  title: {
    default: "Kambegi Resort | Luxury Nature Retreat Near Pune",
    template: "%s | Kambegi Resort",
  },
  description:
    "Experience an ultra-premium nature retreat at Kambegi Resort near Panshet, Pune. Luxury villas, private pool cabins, forest cottages, glamping tents, farm-to-table dining, Ayurvedic spa, and water sports amidst the Western Ghats.",
  keywords: [
    "luxury resort near Pune",
    "nature resort Panshet",
    "Kambegi Resort",
    "luxury villa Pune",
    "Western Ghats resort",
    "Panshet resort",
    "glamping Pune",
    "private pool villa Pune",
    "best resort near pune",
    "weekend getaway pune",
  ],
  authors: [{ name: "Kambegi Resort" }],
  creator: "Kambegi Resort",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kambegiresort.com",
    title: "Kambegi Resort | Luxury Nature Retreat Near Pune",
    description:
      "A cinematic nature-led luxury retreat near Panshet, Pune. Immerse yourself in the Western Ghats.",
    siteName: "Kambegi Resort",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kambegi Resort" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kambegi Resort | Luxury Nature Retreat",
    description: "A cinematic luxury retreat near Panshet, Pune.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3a2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      /* Apply all Next.js font CSS-variable classes to <html> so
         var(--font-playfair) / var(--font-inter) / var(--font-cormorant)
         resolve correctly everywhere in the document */
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="antialiased overflow-x-hidden"
        style={{
          backgroundColor: "#faf7f2",
          color: "#1a3a2a",
          /* Inline style uses CSS var that is guaranteed to be set
             by the time the browser paints */
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
        }}
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1a3a2a",
              color: "#faf7f2",
              borderRadius: "4px",
              border: "1px solid rgba(201,168,76,0.3)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "0.875rem",
              padding: "12px 16px",
            },
          }}
        />
      </body>
    </html>
  );
}
