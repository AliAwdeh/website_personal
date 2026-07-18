import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export const metadata: Metadata = {
  title: "Ali Awdeh - AI Chatbots, Machine Learning & Backend Engineer in Beirut, Lebanon",
  description:
    "Ali Awdeh is a Beirut, Lebanon based AI and Backend Software Engineer, inventor, and automation specialist building AI chatbots, machine learning systems, LLM assistants, WhatsApp chatbot workflows, backend integrations, and production-ready AI systems.",
  keywords: [
    "AI chatbots Lebanon",
    "AI chatbots Beirut",
    "machine learning Lebanon",
    "machine learning Beirut",
    "AI engineer Lebanon",
    "AI engineer Beirut",
    "WhatsApp chatbot Lebanon",
    "Lebanese inventor AI",
    "Beirut inventor AI",
    "LLM assistant developer",
    "backend AI engineer"
  ],
  openGraph: {
    title: "Ali Awdeh - AI Chatbots, Machine Learning & Backend Engineer in Beirut",
    description:
      "AI chatbots, machine learning systems, WhatsApp chatbot workflows, backend integrations, automation, LLM evaluation, and invention-backed AI engineering in Beirut, Lebanon.",
    url: "https://aliawdeh.com",
    type: "website",
  },
  alternates: { canonical: "https://aliawdeh.com" },
};

const whatsappChatbotUrl = "https://wa.me/96171056438";

const operationsCards = [
  {
    title: "LLM Assistants & Tool-Use Logic",
    text: "Designing assistant flows, tool policies, and step-aware behavior for production workflows.",
  },
  {
    title: "Evaluation & Quality Control",
    text: "Creating evaluator logic, JSON rubrics, QA workflows, and failure-detection systems for missed tool calls, wrong actions, and policy violations.",
  },
  {
    title: "Workflow Automation",
    text: "Building n8n workflows, backend integrations, reporting systems, and operational alerts.",
  },
  {
    title: "Product & Process Improvement",
    text: "Turning messy manual processes into structured, measurable, AI-assisted workflows.",
  },
];

const services = [
  {
    title: "AI Systems & Automation",
    text: "LLM assistants, workflow automation, tool-calling logic, process digitization, and operational AI systems.",
    skills: ["LLMs", "n8n", "Automation", "Tool Use"],
  },
  {
    title: "LLM Evaluation & Guardrails",
    text: "Evaluator logic, scoring rubrics, conversation QA, tool-use validation, workflow guardrails, and production reliability logic.",
    skills: ["Evaluation", "JSON Rubrics", "QA", "Guardrails"],
  },
  {
    title: "Backend & Integration Engineering",
    text: "APIs, databases, authentication, microservices, ERP/tool integrations, custom services, and reliable backend systems.",
    skills: ["APIs", "Databases", "Auth", "Microservices"],
  },
  {
    title: "Product & Process Engineering",
    text: "Mapping business processes, reducing manual work, improving operational flows, and translating business needs into technical systems.",
    skills: ["Product", "Processes", "Reporting", "Operations"],
  },
];

const seoFocusAreas = [
  {
    title: "AI Chatbots in Lebanon",
    text: "Designing AI chatbot and WhatsApp chatbot workflows for applicant guidance, customer operations, document collection, routing, follow-up, and business process automation.",
    skills: ["AI Chatbots", "WhatsApp Chatbot", "Lebanon", "Beirut"],
  },
  {
    title: "Machine Learning & LLM Systems",
    text: "Building practical machine learning, LLM assistant, evaluation, guardrail, retrieval, and local AI infrastructure experiments that connect model behavior to real workflows.",
    skills: ["Machine Learning", "LLMs", "Evaluation", "Guardrails"],
  },
  {
    title: "Backend AI Automation",
    text: "Connecting AI systems with backend APIs, databases, Snowflake SQL, n8n workflows, reporting, authentication, and operational tools.",
    skills: ["Backend APIs", "n8n", "Snowflake SQL", "Automation"],
  },
  {
    title: "Inventor & AI Engineer in Beirut",
    text: "Combining a Lebanese invention background, patents, international awards, and software engineering to create practical AI systems for businesses and operations.",
    skills: ["Inventor", "Patents", "Beirut", "AI Engineer"],
  },
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

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ali Awdeh",
    url: "https://aliawdeh.com",
    sameAs: [
      "https://www.linkedin.com/in/AliAwdeh",
      "https://github.com/aliawdeh",
    ],
    jobTitle: "AI and Backend Software Engineer",
    knowsAbout: [
      "AI Chatbots",
      "Machine Learning",
      "WhatsApp Chatbots",
      "AI Engineering in Lebanon",
      "AI Engineering in Beirut",
      "AI Software Engineering",
      "Backend Software Engineering",
      "LLM Assistants",
      "Workflow Automation",
      "LLM Evaluation",
      "Process Improvement",
      "Backend Integrations",
      "Product Engineering",
      "Lebanese Inventions",
      "Patents",
    ],
    homeLocation: {
      "@type": "Place",
      name: "Beirut, Lebanon",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "WhatsApp chatbot",
      telephone: "+96171056438",
      url: whatsappChatbotUrl,
      areaServed: ["Lebanon", "Beirut", "Worldwide"],
    },
    award: [
      "Geneva International Exhibition of Inventions - Gold",
      "IIFME - Gold",
      "iENA - Silver",
    ],
    memberOf: "IFIA",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="container pt-14 pb-10 sm:pt-20 sm:pb-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center lg:gap-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-accent2">
              AI & Backend Software Engineer
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Ali Awdeh
            </h1>
            <p className="mt-3 text-2xl font-semibold text-brand-fg sm:text-3xl">
              Automation & Process Improvement
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-dim">
              I design and deploy AI systems, backend integrations, and automation workflows that improve real business operations.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-brand-dim">
              I work across LLM assistants, evaluator logic, backend APIs, workflow orchestration, reporting systems, and process improvement - combining engineering depth with practical business impact.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/projects" className="btn btn-accent">
                View Projects
              </Link>
              <Link href="/experience" className="btn">
                View Experience
              </Link>
              <Link href="/contact" className="btn">
                Contact Me
              </Link>
              <a href={whatsappChatbotUrl} className="btn" target="_blank" rel="noopener noreferrer">
                Try WhatsApp Chatbot
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>LLM Assistants</Badge>
              <Badge>Backend APIs</Badge>
              <Badge>Workflow Automation</Badge>
              <Badge>LLM Evaluation</Badge>
              <Badge>AI Chatbots Lebanon</Badge>
              <Badge>Machine Learning</Badge>
              <Badge>Beirut AI Engineer</Badge>
              <Badge>Process Improvement</Badge>
              <Badge>n8n</Badge>
              <Badge>Snowflake SQL</Badge>
              <Badge>Python</Badge>
              <Badge>FastAPI</Badge>
              <Badge>Java</Badge>
              <Badge>Spring Boot</Badge>
              <Badge>TypeScript</Badge>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="text-lg font-medium">Engineering Profile</h2>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center sm:gap-4">
              <div>
                <div className="text-3xl font-bold">2</div>
                <div className="p-dim mt-1 text-xs sm:text-sm">Patents</div>
              </div>
              <div>
                <div className="text-3xl font-bold">9</div>
                <div className="p-dim mt-1 text-xs sm:text-sm">International Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold">AI</div>
                <div className="p-dim mt-1 text-xs sm:text-sm">Operations Focus</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm leading-relaxed text-brand-dim">
              <p>
                Current work focuses on production AI assistants, evaluator logic, workflow automation, backend integrations, and operational reporting.
              </p>
              <p>
                Invention and award background adds a practical R&D mindset: prototype quickly, validate with evidence, and explain complex systems clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Building AI Systems for Real Operations"
        subtitle="Practical systems work across assistants, automation, evaluation, backend integrations, and process improvement."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {operationsCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="p-dim mt-2 leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="AI Chatbots, Machine Learning & Automation in Lebanon"
        subtitle="AI engineering work from Beirut across chatbots, LLM systems, backend automation, invention, and practical business operations."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {seoFocusAreas.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="p-dim mt-2 leading-relaxed">{item.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <a className="btn btn-accent" href={whatsappChatbotUrl} target="_blank" rel="noopener noreferrer">
            Try Ali's WhatsApp Chatbot
          </a>
        </div>
      </Section>

      <Section title="What I Do" subtitle="Engineering work that connects product logic, backend systems, and operational outcomes.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="p-dim mt-2 leading-relaxed">{service.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Featured Projects"
        subtitle="Case-study-style work in AI automation, LLM evaluation, backend systems, and local AI infrastructure."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold">AI Recruitment Assistant & Workflow Automation</h3>
            <p className="p-dim mt-2 leading-relaxed">
              AI-assisted WhatsApp workflow logic for applicant guidance, document collection, routing, date handling, and process follow-up.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>LLMs</Badge>
              <Badge>n8n</Badge>
              <Badge>Snowflake SQL</Badge>
              <Badge>Evaluator Logic</Badge>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">LLM Evaluation & Guardrail System</h3>
            <p className="p-dim mt-2 leading-relaxed">
              JSON-based evaluator rubrics and QA workflows for missed tools, wrong actions, invalid states, and policy violations.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>LLM Evaluation</Badge>
              <Badge>Guardrails</Badge>
              <Badge>QA</Badge>
              <Badge>JSON Schemas</Badge>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Agent Forge - Local LLM Fine-Tuning Platform</h3>
            <p className="p-dim mt-2 leading-relaxed">
              Local platform for dataset upload, field mapping, LoRA fine-tuning, adapter testing, and evaluation.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Python</Badge>
              <Badge>FastAPI</Badge>
              <Badge>MLX-LoRA</Badge>
              <Badge>Gemma</Badge>
            </div>
          </Card>
        </div>
        <div className="mt-6">
          <Link className="btn btn-accent" href="/projects">
            View All Projects
          </Link>
        </div>
      </Section>

      <Section title="Best Fit Roles" subtitle="Roles where AI, automation, backend systems, and product thinking improve real operational workflows.">
        <div className="card p-6 sm:p-8">
          <p className="max-w-3xl leading-relaxed text-brand-dim">
            I am especially interested in teams that need someone who can connect operations, product logic, AI systems, backend integrations, and engineering execution.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {bestFitRoles.map((role) => (
              <Badge key={role}>{role}</Badge>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Patents & Awards" subtitle="Secondary credibility from invention, prototyping, and international evaluation.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">Invention Background</h3>
            <p className="p-dim mt-2 leading-relaxed">
              My invention background shaped how I approach software and AI systems: prototype quickly, validate practically, communicate clearly, and design around real-world constraints.
            </p>
            <ul className="p-dim mt-4 list-disc space-y-2 pl-5">
              <li>Smart Wind Controller - patented control-system concept for turbine reliability.</li>
              <li>Magnetic Propulsion Prototype / M-Gun - patented hardware prototype.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">International Recognition</h3>
            <p className="p-dim mt-2 leading-relaxed">
              9 international awards and IFIA membership, including Geneva Gold recognition, support a practical track record in technical communication, R&D, and execution.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Geneva Gold</Badge>
              <Badge>IIFME Gold</Badge>
              <Badge>iENA</Badge>
              <Badge>IFIA Member</Badge>
            </div>
          </Card>
        </div>
      </Section>

      <section className="container py-12">
        <div className="card flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Looking for practical AI and backend execution?</h2>
            <p className="p-dim mt-2 max-w-2xl">
              Available for AI engineering, backend software engineering, automation, product-engineering, and process-improvement opportunities.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-accent">
              Contact Me
            </Link>
            <a href={whatsappChatbotUrl} className="btn" target="_blank" rel="noopener noreferrer">
              WhatsApp Chatbot
            </a>
            <a href="/Ali_Awdeh_CV.pdf" className="btn" download>
              Download CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
