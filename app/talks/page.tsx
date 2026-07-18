import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import YouTubeLite from "@/components/YoutubeLite";

// Page-specific SEO (overrides defaults from layout)
export const metadata: Metadata = {
  title: "Talks on Invention, AI, Technology & Public Speaking",
  description:
    "Public speaking, media interviews, international invention events, and technical discussions by Ali Awdeh, a Beirut, Lebanon based inventor and AI/backend engineer.",
  keywords: [
    "Ali Awdeh talks",
    "Beirut inventor speaker",
    "Lebanese inventor interviews",
    "AI engineer talks Lebanon",
    "technology interviews Beirut",
    "invention public speaking Lebanon"
  ],
  openGraph: {
    title: "Talks on Invention, AI, Technology & Public Speaking - Ali Awdeh",
    description: "Public speaking, media interviews, international invention events, and technical discussions from Beirut, Lebanon.",
    url: "https://aliawdeh.com/talks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talks & Presentations — Ali Awdeh",
    description: "Public speaking, media interviews, international invention events, and technical discussions.",
  },
  alternates: { canonical: "https://aliawdeh.com/talks" },
};

const videos = [
  {
    id: "8ePj4yTGMeM",
    title: "Public Speaking — Speaker at Beirut: Capital of Arab Youth",
    category: "Public Speaking",
    start: 1009, // 16:49
    uploadDate: "2024-01-01T00:00:00Z", // TODO: put the real ISO date if you have it
  },
  {
    id: "mljNAZH9WO4",
    title: "TV Interview (2018)",
    category: "Media Interviews",
    start: 0,
    uploadDate: "2018-01-01T00:00:00Z", // optional
  },
  {
    id: "kCzZfdbObrI",
    title: "Arrival from Geneva — Honorary Lounge, Beirut–Rafic Hariri International Airport",
    category: "International Invention Events",
    start: 0,
    uploadDate: "2018-11-01T00:00:00Z", // optional
  },
  {
    id: "8oy-iT0CQsU",
    title: "Interview: Cryptocurrency & Blockchain Technology",
    category: "Technical Discussions",
    start: 0,
    uploadDate: "2019-01-01T00:00:00Z", // optional
  },
  {
    id: "2iAyPbijkPs",
    title: "Interview: Participation at iENA Invention Show",
    category: "International Invention Events",
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

      <section className="container pt-14 pb-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold">Talks & Presentations</h1>
          <p className="p-dim mt-4 leading-relaxed">
            I have presented technical and innovation projects to public audiences, juries, media, and international invention committees. These experiences shaped how I explain complex systems clearly to both technical and non-technical stakeholders.
          </p>
        </div>
      </section>

      <Section title="Featured Talk" subtitle="Public speaking, media, invention events, and technical discussions.">
        <div className="grid gap-8">
          {/* Featured video */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <YouTubeLite id={v.id} title={v.title} start={v.start} />
            <Card>
              <h3 className="font-medium">{v.title}</h3>
              <p className="mt-2 text-sm text-brand-accent2">{v.category}</p>
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
                    <div>
                      <p className="text-sm text-brand-accent2">{vid.category}</p>
                      <h4 className="font-medium">{vid.title}</h4>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
