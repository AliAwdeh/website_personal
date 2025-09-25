import Image from "next/image";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";

export const metadata = {
  title: "Exhibitions — Ali Awdeh",
  description:
    "Showcase of international participations and awards, featuring photos and details of events.",
};

const exhibitions = [
  {
    year: 2023,
    title: "Geneva International Exhibition of Inventions",
    location: "Geneva, Switzerland",
    description:
      "Presented patented innovations including the Smart Wind Controller and M-Gun. Awarded Gold Medal for excellence in renewable energy innovation.",
    image: "/exhibitions/geneva2023.jpg",
  },
  {
    year: 2022,
    title: "IENA — International Trade Fair",
    location: "Nuremberg, Germany",
    description:
      "Showcased innovative energy and control systems, receiving international recognition and networking with global inventors.",
    image: "/exhibitions/iena2022.jpg",
  },
  {
    year: 2018,
    title: "IIFME — International Fair of the Middle East",
    location: "Beirut, Lebanon",
    description:
      "Presented my early innovations and received Gold Medal for outstanding contribution to technology and entrepreneurship.",
    image: "/exhibitions/iifme2018.jpg",
  },
];

export default function ExhibitionsPage() {
  return (
    <Section
      title="Exhibitions"
      subtitle="International participations, awards, and innovation showcases"
    >
      <div className="grid gap-8 md:grid-cols-2">
        {exhibitions.map((exhibit) => (
          <Card key={exhibit.title}>
            <div className="space-y-3">
              {exhibit.image && (
                <Image
                  src={exhibit.image}
                  alt={exhibit.title}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {exhibit.title} ({exhibit.year})
                </h3>
                <p className="text-sm text-brand-dim">{exhibit.location}</p>
                <p className="mt-2 text-sm leading-relaxed">
                  {exhibit.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
