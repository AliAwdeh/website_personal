import Head from "next/head";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Ali Awdeh – Inventor, Innovator, Software & Product Engineer</title>
        <meta
          name="description"
          content="Inventor & Innovator with 2 patents and 9 global awards. Software & Product Engineer specializing in backend architecture, scalable APIs, and AI/ML systems. IFIA member. Available for consulting and advisory."
        />
        <meta property="og:title" content="Ali Awdeh – Inventor & Software Engineer" />
        <meta
          property="og:description"
          content="Award‑winning inventor and engineer (2 patents, 9 global awards). Backend, AI/ML, and product engineering. Consulting & advisory."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aliawdeh.com" />
        <meta property="og:image" content="/og/ali-awdeh-og.jpg" />
        <script
          type="application/ld+json"
          // Person + Offer JSON‑LD for better rich results
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ali Awdeh",
              url: "https://aliawdeh.com",
              sameAs: [
                "https://www.linkedin.com/in/AliAwdeh",
                "https://github.com/aliawdeh"
              ],
              jobTitle: "Inventor, Software & Product Engineer, Technical Advisor",
              knowsAbout: [
                "Backend Development",
                "System Architecture",
                "Machine Learning",
                "LLMs",
                "Blockchain",
                "Product Engineering"
              ],
              award: [
                "Geneva International Exhibition of Inventions – Gold",
                "IIFME – Gold",
                "IENA – Gold"
              ],
              memberOf: "IFIA"
            })
          }}
        />
      </Head>

      {/* ===== HERO / INTRO ===== */}
      <section className="container pt-20 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Intro */}
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Ali Awdeh —{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent2 bg-clip-text text-transparent">
                Inventor & Innovator · Software & Product Engineer · Technical Advisor
              </span>
            </h1>

            <p className="text-brand-dim mt-5 text-lg leading-relaxed">
              I build practical, reliable technology that scales: <strong>backend architecture, APIs, and AI/ML systems</strong>.
              <br className="hidden md:block" />
              <span className="inline-block mt-2">Holder of <strong>2 patents</strong> and <strong>9 international innovation medals</strong> (incl. Geneva Gold). <strong>IFIA member.</strong></span>
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-accent" aria-label="Hire Ali – contact page">
                Hire / Consult
              </Link>
              <a href="/Ali_Awdeh_CV.pdf" className="btn" download rel="noopener" aria-label="Download CV PDF">
                Download CV
              </a>
              <Link href="/projects" className="btn" aria-label="View projects">
                View Projects
              </Link>
            </div>

            {/* Highlighted Skills */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Backend Development</Badge>
              <Badge>System Architecture</Badge>
              <Badge>Machine Learning</Badge>
              <Badge>LLMs</Badge>
              <Badge>Java</Badge>
              <Badge>Spring Boot</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Node.js</Badge>
              <Badge>Python</Badge>
              <Badge>TensorFlow</Badge>
              <Badge>PyTorch</Badge>
              <Badge>AWS</Badge>
              <Badge>Docker</Badge>
              <Badge>Nginx</Badge>
              <Badge>Product Engineering</Badge>
            </div>

            {/* Trust bar */}
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <Badge>Geneva Gold (2018, 2023)</Badge>
              <Badge>IIFME Gold (2023)</Badge>
              <Badge>IENA Gold (2022)</Badge>
              <Badge>IFIA Member</Badge>
            </div>
          </div>

          {/* Right Side - Highlights Card */}
          <div className="card p-8">
            <h3 className="font-medium mb-4 text-lg">Career Highlights</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">2</div>
                <div className="p-dim text-sm mt-1">Patents</div>
              </div>
              <div>
                <div className="text-3xl font-bold">9</div>
                <div className="p-dim text-sm mt-1">International Medals</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10k+</div>
                <div className="p-dim text-sm mt-1">Records Processed</div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6 space-y-3 text-sm">
              <p>Built AI tools that reduced manual analysis by <strong>60%</strong>.</p>
              <p>Training Management System: cut reporting time by <strong>40%</strong>.</p>
              <p>Engineered LLM library to automate validation (testing time ↓ <strong>70%</strong>).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES / WHAT I DO ===== */}
      <Section title="Consulting & Services" subtitle="Hands‑on engineering with product thinking.">
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <h4 className="font-semibold text-lg">Backend Engineering</h4>
            <p className="p-dim mt-2">Scalable APIs, databases, microservices, reliability and performance tuning.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>Java</Badge><Badge>Spring Boot</Badge><Badge>Node.js</Badge><Badge>SQL</Badge></div>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">AI/ML Systems</h4>
            <p className="p-dim mt-2">Model training, LLM pipelines, inference services, data engineering.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>TensorFlow</Badge><Badge>PyTorch</Badge><Badge>LLMs</Badge></div>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">Product Engineering</h4>
            <p className="p-dim mt-2">From prototype to production: roadmap, architecture, iteration speed.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>Design‑to‑Delivery</Badge><Badge>APIs</Badge><Badge>CI/CD</Badge></div>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">Technical Advisory</h4>
            <p className="p-dim mt-2">Architecture reviews, innovation strategy, R&D guidance, fractional CTO.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>Consulting</Badge><Badge>Security</Badge><Badge>Scalability</Badge></div>
          </Card>
        </div>
        <div className="mt-6"><Link className="btn btn-accent" href="/contact">Start a project</Link></div>
      </Section>

      {/* ===== FEATURED PROJECTS ===== */}
      <Section
        title="Featured Projects"
        subtitle="Selected work in backend engineering, AI/ML, and high‑performance systems."
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-semibold text-lg">AI‑Driven Trading Bots</h4>
            <p className="p-dim mt-2">Real‑time forex bots powered by ML, reducing manual analysis by <strong>60%</strong>.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>Python</Badge><Badge>TensorFlow</Badge><Badge>Node.js</Badge><Badge>Docker</Badge><Badge>MySQL</Badge></div>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">Training Management System</h4>
            <p className="p-dim mt-2">Backend for courses/trainees; cut reporting time by <strong>40%</strong> and handled <strong>10k+ records</strong> with zero downtime.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>Java</Badge><Badge>Spring Boot</Badge><Badge>REST</Badge><Badge>PostgreSQL</Badge></div>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">LLM Training & Inference Pipeline</h4>
            <p className="p-dim mt-2">Scalable infrastructure for training, optimizing, and deploying ML/LLM models with GPU acceleration and low‑latency APIs.</p>
            <div className="mt-3 flex gap-2 flex-wrap"><Badge>Python</Badge><Badge>PyTorch</Badge><Badge>Docker</Badge><Badge>Kubernetes</Badge><Badge>GPU</Badge></div>
          </Card>
        </div>
      </Section>

      {/* ===== PATENTS & AWARDS ===== */}
      <Section title="Patents & Awards" subtitle="Innovation with measurable outcomes.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h4 className="font-semibold text-lg">Patents</h4>
            <ul className="p-dim mt-3 list-disc ml-6 space-y-2">
              <li>Smart Wind Controller — extends turbine lifespan; ML anticipates wind changes from sensor data.</li>
              <li>Magnetic Gun (2017).</li>
            </ul>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">Awards</h4>
            <ul className="p-dim mt-3 list-disc ml-6 space-y-2">
              <li>Geneva International Exhibition of Inventions — Gold (2018, 2023)</li>
              <li>IIFME — Gold (2023)</li>
              <li>IENA — Gold (2022)</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <section className="container py-12">
        <div className="card p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Let’s build something reliable and smart.</h3>
            <p className="p-dim mt-1">Available for software/product engineering, consulting, and technical advisory.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact" className="btn btn-accent">Contact</Link>
            <a href="/Ali_Awdeh_CV.pdf" className="btn" download>Download CV</a>
          </div>
        </div>
      </section>
    </div>
  );
}
