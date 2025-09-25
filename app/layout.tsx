import "./../styles/globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ali Awdeh — Software Engineer & Award-Winning Innovator",
  description: "Backend & AI/ML engineer. 2 patents, 9 international medals. Building scalable APIs and fintech systems.",
  metadataBase: new URL("https://aliawdeh.com"),
  openGraph: {
    title: "Ali Awdeh — Software Engineer",
    description: "Backend & AI/ML • 2 patents • 9 medals • Ex-COO & Lead Dev (Senal Crypto)",
    url: "https://aliawdeh.com",
    siteName: "Ali Awdeh",
    type: "website"
  },
  alternates: { canonical: "https://aliawdeh.com" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Person",
    name: "Ali I. Awdeh", url: "https://aliawdeh.com",
    jobTitle: "Software Engineer",
    email: "mailto:Ali.I.Awdeh@gmail.com", telephone: "+96171161670",
    sameAs: ["https://www.linkedin.com/in/AliAwdeh","https://github.com/aliawdeh"]
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      </body>
    </html>
  );
}
