import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import YouTubeLite from "@/components/YouTubeLite";

// Page-specific SEO (overrides defaults from layout)
export const metadata: Metadata = {
  title: "Talks & Presentations — Ali Awdeh",
  description: "Selected interviews and stage appearances",
  openGraph: {
    title: "Talks & Presentations — Ali Awdeh",
    description: "Selected interviews and stage appearances",
    url: "https://aliawdeh.com/talks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talks & Presentations — Ali Awdeh",
    description: "Selected interviews and stage appearances",
  },
  alternates: { canonical: "https://aliawdeh.com/talks" },
};

const videos = [
  {
    id: "8ePj4yTGMeM",
    title: "Public Speaking — Speaker at Beirut: Capital of Arab Youth",
    start: 1009, // 16:49
    uploadDate: "2024-01-01T00:00:00Z", // TODO: put the real ISO date if you have it
  },
  {
    id: "mljNAZH9WO4",
    title: "TV Interview (2018)",
    start: 0,
    uploadDate: "2018-01-01T00:00:00Z", // optional
  },
  {
    id: "kCzZfdbObrI",
    title: "Arrival from Geneva — Honorary Lounge, Beirut–Rafic Hariri International Airport",
    start: 0,
    uploadDate: "2018-11-01T00:00:00Z", // optional
  },
  {
    id: "8oy-iT0CQsU",
    title: "Interview: Cryptocurrency & Blockchain Technology",
    start: 0,
    uploadDate: "2019-01-01T00:00:00Z", // optional
  },
  {
    id: "2iAyPbijkPs",
    title: "Interview: Participation at iENA Invention Show",
    start: 0,
    uploadDate: "2022-01-01T00:00:00Z", // optional
  },
] as const;

const featuredIndex = 0;

export default function TalksPage() {
  const v = videos[featuredIndex];

  // JSON-LD schema for the featured video (great for SEO)
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description:
      "Ali Awdeh discusses public speaking for youth—confidence under pressure, structure, and storytelling.",
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    uploadDate: v.uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}?start=${v.start}&rel=0&modestbranding=1`,
    publisher: { "@type": "Organization", name: "YouTube" },
  };

  // Optional: ItemList for all videos on the page (helps Google understand the list)
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: videos.map((vv, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.youtube.com/watch?v=${vv.id}`,
      name: vv.title,
    })),
  };

  return (
    <>
      {/* Inline JSON-LD (App Router-friendly) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />

      <Section title="Talks & Presentations" subtitle="Interviews and stage appearances">
        <div className="grid gap-8">
          {/* Featured video */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <YouTubeLite id={v.id} title={v.title} start={v.start} />
            <Card>
              <h3 className="font-medium">{v.title}</h3>
              <p className="text-brand-dim mt-2">Key points:</p>
              <ul className="list-disc list-inside text-brand-dim mt-2 space-y-1">
                <li>Building confidence under pressure.</li>
                <li>Structuring messages for young audiences.</li>
                <li>Storytelling from invention to impact.</li>
              </ul>
            </Card>
          </div>

          {/* Additional videos */}
          {videos.filter((_, i) => i !== featuredIndex).length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {videos
                .filter((_, i) => i !== featuredIndex)
                .map((vid) => (
                  <div key={vid.id} className="grid gap-3">
                    <YouTubeLite id={vid.id} title={vid.title} start={vid.start} />
                    <h4 className="font-medium">{vid.title}</h4>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
