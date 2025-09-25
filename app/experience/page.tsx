import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/Card";

export default function ExperiencePage() {
  return (
    <div>
      <Section title="Experience" subtitle="Roles with measurable impact">
        <Card>
          <Timeline items={[
            { year: "2024–2025", title: "Software Engineer — Senal Forex", subtitle: "AI-driven bots; 60% manual analysis reduction; 20% forecast accuracy improvements" },
            { year: "2024", title: "Backend Developer Intern — Esri Lebanon", subtitle: "TMS backend; 40% reporting time reduction; handled 10k+ records" },
            { year: "2023", title: "Automation & Scripting Intern — Esri Lebanon", subtitle: "Workflow automation with Python/JS across teams" },
            { year: "2021–2022", title: "COO & Lead Developer — Senal Crypto", subtitle: "Security protocols, audits, tokenomics features & dashboards" }
          ]} />
        </Card>
      </Section>
    </div>
  );
}
