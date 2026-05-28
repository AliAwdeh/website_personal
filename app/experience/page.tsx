import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export const metadata: Metadata = {
  title: "Experience - Ali Awdeh",
  description:
    "Experience in AI automation, backend integrations, LLM evaluation, workflow automation, reporting, product engineering, and process improvement.",
};

const currentRoleHighlights = [
  "Designed and improved LLM-powered WhatsApp assistant flows for applicant guidance, document collection, process follow-up, and operational automation.",
  "Built LLM-based agents for OCR, vision analysis, multi-step decision logic, and structured applicant guidance.",
  "Developed evaluator logic and QA workflows to detect missed tool calls, incorrect actions, policy violations, and failed conversation states in production chatbot flows.",
  "Engineered n8n workflows, custom API integrations, and AI pipelines aligned with complex business rules and operational requirements.",
  "Wrote Snowflake SQL queries and reporting logic for funnel analysis, joining-date tracking, ticket-date monitoring, contract-expiry alerts, and process performance.",
  "Worked across product, operations, and engineering to convert manual workflows into structured AI-assisted systems.",
  "Defined guardrails, tool policies, and production behavior for customer-facing AI systems.",
];

const bestFitRoles = [
  "AI Software Engineer",
  "Backend Software Engineer",
  "AI Product Engineer",
  "Product-minded Software Engineer",
  "Process Improvement Analyst",
  "Automation Engineer",
  "Backend / AI Systems Engineer",
  "Technical Product Engineer",
];

export default function ExperiencePage() {
  return (
    <div>
      <Section title="Experience" subtitle="Roles across AI systems, backend engineering, automation, product logic, and operations improvement.">
        <div className="grid gap-6">
          <Card>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-brand-accent2">2025-Present</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  Software Engineer - AI Automation & Process Improvement
                </h2>
                <p className="p-dim mt-1">maids.cc / maids.at</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Badge>LLM Systems</Badge>
                <Badge>n8n</Badge>
                <Badge>Snowflake SQL</Badge>
                <Badge>Backend APIs</Badge>
              </div>
            </div>

            <p className="p-dim mt-5 max-w-4xl leading-relaxed">
              Working at the intersection of product, operations, and engineering to improve manual business processes using AI systems, workflow automation, evaluator logic, backend integrations, and reporting systems.
            </p>

            <ul className="p-dim mt-5 list-disc space-y-2 pl-5 leading-relaxed">
              {currentRoleHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <Timeline
              items={[
                {
                  year: "2024-2025",
                  title: "Software Engineer Freelance - Senal Forex",
                  subtitle:
                    "AI-driven trading automation, backend services, and operational tooling for market-analysis workflows.",
                },
                {
                  year: "2024",
                  title: "Backend Developer Intern - Esri Lebanon",
                  subtitle:
                    "Training Management System backend; reporting workflows; REST APIs; data handling for 10k+ records.",
                },
                {
                  year: "2023",
                  title: "Automation & Scripting Intern - Esri Lebanon",
                  subtitle:
                    "Python and JavaScript automation for internal workflows, reporting support, and team productivity.",
                },
                {
                  year: "2021-2022",
                  title: "COO & Lead Developer - Senal Crypto",
                  subtitle:
                    "Product operations, security processes, tokenomics features, dashboards, and community-facing technical systems.",
                },
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section title="Best Fit Roles" subtitle="Professional targets aligned with AI, backend systems, automation, and process improvement.">
        <div className="card p-6 sm:p-8">
          <p className="max-w-3xl leading-relaxed text-brand-dim">
            I am especially interested in roles where AI, automation, backend systems, and product thinking are used to improve real operational workflows.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {bestFitRoles.map((role) => (
              <Badge key={role}>{role}</Badge>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
