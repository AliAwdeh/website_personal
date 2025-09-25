import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Timeline } from "@/components/Timeline";

export default function AwardsPage() {
  return (
    <Section title="Awards & Patents" subtitle="Recognition and inventions">
      <Card>
        <Timeline items={[
          { year: "2023", title: "Gold Medal — Geneva International Invention Exhibition" },
          { year: "2023", title: "Gold Medal — IIFME International Fair of the Middle East" },
          { year: "2022", title: "Gold Medal — IENA International Trade Fair" },
          { year: "2018", title: "Gold Medal — Geneva International Invention Exhibition" },
          { year: "2017", title: "Patent — Magnetic Gun" },
          { year: "2017", title: "Patent — Smart Wind Controller (extends turbine lifespan 3 → 17 years)" }
        ]} />
      </Card>
    </Section>
  );
}
