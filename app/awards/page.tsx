import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { awards, memberships, patents } from "@/data/recognition";

export const metadata: Metadata = {
  title: "Lebanese Inventor, Patents & AI Engineering Awards",
  description:
    "International invention awards, IFIA membership, patents, and the practical R&D background behind Ali Awdeh's AI chatbot, machine learning, backend engineering, and automation work in Beirut, Lebanon.",
  keywords: [
    "Lebanese inventor AI",
    "Beirut inventor",
    "Ali Awdeh patents",
    "AI inventor Lebanon",
    "Lebanon invention awards",
    "machine learning inventor Beirut",
    "IFIA member Lebanon"
  ],
  openGraph: {
    title: "Lebanese Inventor, Patents & AI Engineering Awards - Ali Awdeh",
    description:
      "Patents, IFIA membership, and international invention awards supporting Ali Awdeh's AI chatbot, machine learning, backend, and automation work.",
    url: "https://aliawdeh.com/awards",
    type: "website",
  },
  alternates: { canonical: "https://aliawdeh.com/awards" },
};

function Gallery({ images, alt }: { images?: string[]; alt: string }) {
  if (!images?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      {images.slice(0, 3).map((src) => (
        <a key={src} href={src} target="_blank" rel="noopener noreferrer">
          <img
            src={src}
            alt={alt}
            width={220}
            height={140}
            className="rounded-lg border border-white/10 object-cover"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}

export default function AwardsPage() {
  return (
    <>
      <section className="container pt-14 pb-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold">Awards, Memberships & Patents</h1>
          <p className="p-dim mt-4 leading-relaxed">
            My invention background shaped how I approach software and AI systems: prototype quickly, validate practically, communicate clearly, and design around real-world constraints.
          </p>
        </div>
      </section>

      {/* Awards */}
      <Section
        title="Awards"
        subtitle="International recognition that supports practical R&D, technical communication, and execution."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((a) => (
            <Card key={a.title}>
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {a.title} ({a.year})
                </h3>
                <p className="text-sm text-brand-dim">
                  {a.org} — {a.location}
                </p>
                <p className="mt-2 text-sm">{a.blurb}</p>
                {a.professionalImpact && (
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Professional impact: </span>
                    {a.professionalImpact}
                  </p>
                )}
                <Gallery images={a.images} alt={a.title} />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Memberships */}
      <Section title="Memberships" subtitle="Professional affiliations and verification.">
        <div className="grid md:grid-cols-2 gap-6">
          {memberships.map((m) => (
            <Card key={m.title}>
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {m.title} ({m.year})
                </h3>
                <p className="text-sm text-brand-dim">{m.org}</p>
                <p className="mt-2 text-sm">{m.blurb}</p>
                {m.professionalImpact && (
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Professional impact: </span>
                    {m.professionalImpact}
                  </p>
                )}
                <Gallery images={m.images} alt={m.title} />
                {("verifyUrl" in m) && (m as any).verifyUrl && (
                  <a
                    href={(m as any).verifyUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm underline underline-offset-4 decoration-brand-accent hover:opacity-90"
                  >
                    Verify on IFIA
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Patents */}
      <Section title="Patents" subtitle="Inventions and IP connected to prototyping, control systems, and practical constraints.">
        <div className="grid md:grid-cols-2 gap-6">
          {patents.map((p) => (
            <Card key={p.title}>
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {p.title} ({p.year})
                </h3>
                <p className="mt-2 text-sm">{p.blurb}</p>
                {p.professionalImpact && (
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Professional impact: </span>
                    {p.professionalImpact}
                  </p>
                )}
                <Gallery images={p.images} alt={p.title} />
                {p.pdfUrl && (
                  <a
                    href={p.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent mt-2"
                  >
                    View Patent PDF
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
