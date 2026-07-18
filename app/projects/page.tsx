import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export const metadata: Metadata = {
  title: "AI Chatbot, Machine Learning & Backend Projects",
  description:
    "AI chatbot, WhatsApp automation, machine learning, LLM evaluation, backend integration, local LLM infrastructure, and process-improvement projects by Ali Awdeh in Beirut, Lebanon.",
  keywords: [
    "AI chatbot projects Lebanon",
    "machine learning projects Beirut",
    "WhatsApp automation Lebanon",
    "LLM evaluation projects",
    "backend AI projects",
    "Ali Awdeh projects",
    "Lebanon AI portfolio"
  ],
  openGraph: {
    title: "AI Chatbot, Machine Learning & Backend Projects - Ali Awdeh",
    description:
      "Selected AI chatbot, machine learning, LLM evaluation, automation, and backend integration projects by Ali Awdeh in Beirut, Lebanon.",
    url: "https://aliawdeh.com/projects",
    type: "website",
  },
  alternates: { canonical: "https://aliawdeh.com/projects" },
};

const caseStudies = [
  {
    title: "AI Recruitment Assistant & Workflow Automation",
    summary:
      "Designed AI-assisted WhatsApp workflow logic for applicant guidance, document collection, date handling, application-type routing, and process follow-up.",
    highlights: [
      "Built step-aware assistant behavior and tool-use policies.",
      "Created evaluator logic for missed tools, wrong tools, and policy violations.",
      "Connected AI behavior with operational workflows, reporting, and process monitoring.",
      "Focused on reliability, user guidance, and reducing manual operational load.",
    ],
    stack: [
      "LLMs",
      "n8n",
      "Snowflake SQL",
      "Backend APIs",
      "WhatsApp Automation",
      "Evaluator Logic",
      "Process Automation",
    ],
  },
  {
    title: "LLM Evaluation & Guardrail System",
    summary:
      "Built evaluation logic and JSON-based rubrics to test production assistant behavior across complex multi-step workflows.",
    highlights: [
      "Detected missed tool calls, incorrect tool calls, invalid state transitions, and policy violations.",
      "Designed evaluators that understand conversation context and workflow stage.",
      "Reduced ambiguity in QA by using strict structured outputs.",
      "Helped improve production reliability and debugging speed.",
    ],
    stack: [
      "LLM Evaluation",
      "Evaluator Logic",
      "JSON Schemas",
      "Workflow QA",
      "Conversation Analysis",
      "Production Guardrails",
    ],
  },
  {
    title: "Agent Forge - Local LLM Fine-Tuning Platform",
    summary:
      "A local platform for creating domain-specific AI assistants using dataset upload, field mapping, LoRA fine-tuning, adapter testing, and evaluation.",
    highlights: [
      "Built FastAPI backend for dataset handling, training orchestration, adapter management, and evaluation.",
      "Supported JSONL/CSV dataset parsing and mapping into chat-style formats.",
      "Integrated local small-model experimentation using Gemma and MLX-LoRA.",
      "Focused on making domain adaptation more practical and controllable.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "MLX-LoRA",
      "Gemma",
      "Dataset Pipelines",
      "Local LLMs",
      "Evaluation",
    ],
  },
];

const projects = [
  {
    title: "Vesti - Fashion Similarity Detection",
    year: 2024,
    summary:
      "Deep-learning visual search system for finding visually similar apparel and checking inventory availability.",
    impact:
      "Applied computer-vision retrieval, vector search, and inventory-aware backend logic to reduce product discovery friction.",
    stack: ["Python", "TensorFlow", "FAISS", "PostgreSQL", "Docker", "Node.js"],
  },
  {
    title: "Local LLM Inference Server",
    year: 2025,
    summary:
      "Private local inference setup for menu intelligence, allergy-aware responses, and domain-specific assistant experiments.",
    impact:
      "Explored low-cost local AI deployment patterns with retrieval, structured menus, and API-based assistant access.",
    stack: ["Ollama", "HuggingFace", "PyTorch", "LangChain", "Docker", "NVIDIA GPU"],
  },
  {
    title: "Distributed Backend APIs on Home Lab",
    year: 2024,
    summary:
      "Self-hosted backend services with database storage, load balancing, snapshots, and private infrastructure.",
    impact:
      "Built practical experience with service reliability, API deployment, reverse proxies, database operations, and infrastructure ownership.",
    stack: ["Node.js", "Spring Boot", "MySQL", "PostgreSQL", "Nginx", "HAProxy", "ZFS"],
  },
  {
    title: "LLM Automation Hub",
    year: 2025,
    summary:
      "Local automation workflows for email triage, summaries, reports, and internal task support.",
    impact:
      "Connected local LLMs, workflow logic, and control-panel concepts into practical automation experiments.",
    stack: ["Ollama", "HuggingFace", "LangChain", "Python", "React", "Redis"],
  },
  {
    title: "AI Infrastructure & GPU Experimentation Lab",
    year: 2024,
    summary:
      "Ubuntu GPU environment with passthrough, NAS-backed datasets, and AI training/inference tooling.",
    impact:
      "Supported hands-on experimentation with model training, inference, GPU setup, storage, and local MLOps workflows.",
    stack: ["Ubuntu", "Proxmox", "NVIDIA", "PyTorch", "TensorFlow", "10GbE", "NAS"],
  },
  {
    title: "Personal Cloud & Web Infrastructure",
    year: 2025,
    summary:
      "Self-hosted web and cloud infrastructure for a Next.js site, containers, load balancing, and rollback-friendly storage.",
    impact:
      "Improved practical DevOps skills across CI/CD, SSL routing, containers, monitoring, and resilient hosting patterns.",
    stack: ["Next.js", "Docker", "HAProxy", "ZFS", "GitHub Actions"],
  },
  {
    title: "Accounting & Reservations - Family Business",
    year: 2023,
    summary:
      "Custom accounting and booking platform for operational workflows, customer reservations, payments, and reports.",
    impact:
      "Translated real business needs into backend services and operational software for a small-business environment.",
    stack: ["Spring Boot", "MySQL", "React", "Nginx"],
  },
  {
    title: "Witness - Blockchain Transparency",
    year: 2022,
    summary:
      "Immutable public logs for project activity and spending transparency using smart contracts and a dashboard.",
    impact:
      "Explored auditability, stakeholder trust, and public reporting through a product-minded technical prototype.",
    stack: ["Solidity", "Ethereum", "React", "Node.js"],
  },
  {
    title: "Inventions - M-Gun & Smart Wind Controller",
    year: 2017,
    summary:
      "Patented invention work covering a magnetic propulsion prototype and a smart wind-controller concept.",
    impact:
      "Built early experience in prototyping, technical communication, constraints-based design, and international evaluation.",
    stack: ["R&D", "Control Systems", "Embedded", "Prototyping"],
  },
  {
    title: "Zero-Trust Self-Hosted Infrastructure",
    year: 2025,
    summary:
      "Secure remote access to self-hosted services using tunnel-based access controls and no open inbound ports.",
    impact:
      "Applied zero-trust networking concepts, access policies, Docker deployment, and practical security hardening.",
    stack: ["Cloudflare Zero Trust", "Cloudflared", "Docker", "Jellyfin"],
  },
  {
    title: "Smart Server Dashboard",
    year: 2025,
    summary:
      "Observability dashboard for server health, GPU usage, service latency, and alerting.",
    impact:
      "Improved infrastructure visibility through metrics collection, dashboards, alerting, and capacity-awareness.",
    stack: ["Grafana", "Prometheus", "Alertmanager", "Node Exporter", "nvidia-dcgm", "Loki"],
  },
  {
    title: "Performance & Latency Testing Lab",
    year: 2025,
    summary:
      "Continuous benchmarking and tuning environment for p95 latency, throughput, and service performance.",
    impact:
      "Practiced performance testing, bottleneck analysis, proxy tuning, indexing, and backend capacity improvement.",
    stack: ["k6", "hey", "Nginx", "HAProxy", "Linux", "MySQL", "PostgreSQL"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Section title="Projects" subtitle="Selected work in AI automation, LLM evaluation, backend systems, infrastructure, and operational software.">
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((project) => (
            <Card key={project.title} className="flex flex-col">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="p-dim mt-3 leading-relaxed">{project.summary}</p>
              <ul className="p-dim mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Engineering Portfolio" subtitle="Additional projects reframed around backend, AI infrastructure, product thinking, and practical operations.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.title}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{p.title}</h3>
                <span className="text-xs text-brand-dim">{p.year}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-dim">{p.summary}</p>
              <p className="mt-3 text-sm leading-relaxed">{p.impact}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
