import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export default function Page() {
  return (
    <div>
      {/* ===== HERO / INTRO ===== */}
      <section className="container pt-20 pb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Intro */}
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Ali Awdeh —{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent2 bg-clip-text text-transparent">
                Software & Product Engineer
              </span>
            </h1>

            <p className="text-brand-dim mt-5 text-lg leading-relaxed">
              Software and product engineer specializing in{" "}
              <strong>backend architecture, scalable APIs, and AI/ML systems</strong>.
              Holder of <strong>2 patents</strong> and <strong>9 international innovation medals</strong>,
              including multiple <strong>Geneva Gold Medals</strong>. Experienced in
              <strong> AI model training, inference pipelines, cloud infrastructure,</strong>
              and building high-performance products and services.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/Ali_Awdeh_CV.pdf" className="btn btn-accent">Download CV</a>
              <Link href="/projects" className="btn">View Projects</Link>
              <Link href="/contact" className="btn">Contact</Link>
            </div>

            {/* Highlighted Skills */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Java</Badge>
              <Badge>Node.js</Badge>
              <Badge>Python</Badge>
              <Badge>TensorFlow</Badge>
              <Badge>PyTorch</Badge>
              <Badge>TypeScript</Badge>
              <Badge>AWS</Badge>
              <Badge>Docker</Badge>
              <Badge>Nginx</Badge>
              <Badge>Machine Learning</Badge>
              <Badge>LLMs</Badge>
              <Badge>Product Engineering</Badge>
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

            {/* Awards Summary */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Geneva Gold (2018, 2023)</Badge>
              <Badge>IIFME Gold (2023)</Badge>
              <Badge>IENA Gold (2022)</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <Section
        title="Featured Projects"
        subtitle="Key projects showcasing backend engineering, AI/ML, and high-performance systems."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {/* Project 1 */}
          <Card>
            <h4 className="font-semibold text-lg">AI-driven Trading Bots</h4>
            <p className="p-dim mt-2">
              Real-time forex bots powered by ML, reducing manual analysis by <strong>60%</strong>.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge>Python</Badge><Badge>TensorFlow</Badge><Badge>Node.js</Badge>
              <Badge>Docker</Badge><Badge>MySQL</Badge>
            </div>
          </Card>

          {/* Project 2 */}
          <Card>
            <h4 className="font-semibold text-lg">Training Management System</h4>
            <p className="p-dim mt-2">
              Backend for courses/trainees; cut reporting time by <strong>40%</strong> and handled
              <strong> 10k+ records</strong> with zero downtime.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge>Java</Badge><Badge>Spring Boot</Badge><Badge>REST</Badge><Badge>PostgreSQL</Badge>
            </div>
          </Card>

          {/* Project 3 - AI Model Infrastructure */}
          <Card>
            <h4 className="font-semibold text-lg">AI Model Training & Inference Pipeline</h4>
            <p className="p-dim mt-2">
              Built scalable infrastructure for{" "}
              <strong>training, optimizing, and deploying ML/LLM models</strong> with GPU acceleration,
              containerized environments, and low-latency inference APIs for production use.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge>Python</Badge><Badge>PyTorch</Badge><Badge>TensorFlow</Badge>
              <Badge>Docker</Badge><Badge>Kubernetes</Badge><Badge>GPU Acceleration</Badge>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
