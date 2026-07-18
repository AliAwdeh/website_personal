import "./../styles/globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { VisitorTracker } from "@/components/VisitorTracker";

export const metadata: Metadata = {
  title: {
    default: "Ali Awdeh — AI Chatbots, Machine Learning & Backend Engineer in Beirut, Lebanon",
    template: "%s | Ali Awdeh"
  },
  description: "Ali Awdeh is a Beirut, Lebanon based AI and Backend Software Engineer, inventor, and automation specialist focused on AI chatbots, machine learning systems, LLM assistants, workflow automation, backend integrations, and production-ready AI systems.",
  metadataBase: new URL("https://aliawdeh.com"),
  keywords: [
    "Ali Awdeh",
    "AI engineer Lebanon",
    "AI engineer Beirut",
    "AI chatbot developer Lebanon",
    "AI chatbot developer Beirut",
    "machine learning Lebanon",
    "machine learning Beirut",
    "LLM assistants",
    "WhatsApp chatbot",
    "backend software engineer Lebanon",
    "workflow automation Lebanon",
    "n8n automation",
    "Lebanese inventor",
    "Beirut inventor",
    "AI automation engineer",
    "LLM evaluation",
    "machine learning engineer",
    "AI product engineer"
  ],
  authors: [{ name: "Ali Awdeh", url: "https://aliawdeh.com" }],
  creator: "Ali Awdeh",
  publisher: "Ali Awdeh",
  category: "AI engineering, machine learning, chatbots, backend software, automation",
  openGraph: {
    title: "Ali Awdeh — AI Chatbots, Machine Learning & Backend Engineer in Beirut, Lebanon",
    description: "AI chatbots, machine learning systems, backend integrations, workflow automation, LLM evaluation, and invention-backed AI engineering from Beirut, Lebanon.",
    url: "https://aliawdeh.com",
    siteName: "Ali Awdeh",
    locale: "en_US",
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
    homeLocation: {
      "@type": "Place",
      name: "Beirut, Lebanon"
    },
    nationality: {
      "@type": "Country",
      name: "Lebanon"
    },
    email: "mailto:Ali.I.Awdeh@gmail.com", telephone: "+96171161670",
    sameAs: ["https://www.linkedin.com/in/AliAwdeh","https://github.com/aliawdeh"],
    knowsAbout: [
      "AI Chatbots",
      "Machine Learning",
      "WhatsApp Chatbots",
      "Artificial Intelligence in Lebanon",
      "AI Engineering in Beirut",
      "AI Software Engineering",
      "Backend Software Engineering",
      "LLM Evaluation",
      "Workflow Automation",
      "Process Improvement",
      "Backend Integrations",
      "Product Engineering",
      "Invention",
      "Patents"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp chatbot",
        telephone: "+96171056438",
        url: "https://wa.me/96171056438",
        areaServed: ["Lebanon", "Beirut", "Worldwide"],
        availableLanguage: ["English", "Arabic"]
      },
      {
        "@type": "ContactPoint",
        contactType: "professional inquiries",
        email: "Ali.I.Awdeh@gmail.com",
        telephone: "+96171161670",
        areaServed: ["Lebanon", "Beirut", "Worldwide"],
        availableLanguage: ["English", "Arabic"]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <VisitorTracker />
        <ChatWidget />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      </body>
    </html>
  );
}
