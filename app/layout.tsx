import "./../styles/globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Ali Awdeh — AI & Backend Software Engineer",
  description: "Ali Awdeh is an AI and Backend Software Engineer focused on LLM assistants, workflow automation, backend integrations, process improvement, and production-ready AI systems.",
  metadataBase: new URL("https://aliawdeh.com"),
  openGraph: {
    title: "Ali Awdeh — AI & Backend Software Engineer",
    description: "AI systems, backend integrations, workflow automation, LLM evaluation, and process improvement.",
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
    jobTitle: "AI and Backend Software Engineer",
    email: "mailto:Ali.I.Awdeh@gmail.com", telephone: "+96171161670",
    sameAs: ["https://www.linkedin.com/in/AliAwdeh","https://github.com/aliawdeh"],
    knowsAbout: [
      "AI Software Engineering",
      "Backend Software Engineering",
      "LLM Evaluation",
      "Workflow Automation",
      "Process Improvement",
      "Backend Integrations",
      "Product Engineering"
    ]
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      </body>
    </html>
  );
}
