import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export const metadata: Metadata = {
  title: "Contact - Ali Awdeh",
  description:
    "Contact Ali Awdeh for AI engineering, backend software engineering, automation, product-engineering, process-improvement, and technical advisory opportunities.",
};

const profileHighlights = [
  "AI systems and automation",
  "Backend and integration engineering",
  "Product and process improvement",
  "LLM evaluation and guardrails",
  "Workflow automation and reporting",
  "Patents and international awards",
];

export default function ContactPage() {
  return (
    <Section title="Contact" subtitle="AI engineering, backend systems, automation, and product/process opportunities.">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <h2 className="text-xl font-semibold">Reach out</h2>
          <p className="p-dim mt-3 leading-relaxed">
            Reach out for AI engineering roles, backend software engineering roles, product-engineering opportunities, automation projects, backend systems, process-improvement work, or technical advisory.
          </p>
          <p className="p-dim mt-3 leading-relaxed">
            Best fit: serious long-term opportunities where AI, automation, backend engineering, and product thinking can improve real business operations.
          </p>

          <ul className="mt-6 space-y-3">
            <li>
              Email:{" "}
              <a className="hover:underline" href="mailto:Ali.I.Awdeh@gmail.com">
                Ali.I.Awdeh@gmail.com
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a className="hover:underline" href="https://linkedin.com/in/AliAwdeh">
                linkedin.com/in/AliAwdeh
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a className="hover:underline" href="https://github.com/aliawdeh">
                github.com/aliawdeh
              </a>
            </li>
            <li>
              WhatsApp:{" "}
              <a className="hover:underline" href="https://wa.me/96171161670">
                +961 71 161 670
              </a>
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Ali Awdeh - AI & Backend Software Engineer</h2>
          <p className="p-dim mt-3 leading-relaxed">
            One-page profile focus areas for recruiters, hiring managers, founders, technical leads, and operations/product leaders.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {profileHighlights.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="/Ali_Awdeh_CV.pdf" className="btn btn-accent" download>
              Download CV
            </a>
            <a href="/docs/patents_portfolio.pdf" className="btn" target="_blank" rel="noopener noreferrer">
              Patent Portfolio
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
}
