import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

export default function Page() {
  return (
    <div>
      <section className="container pt-20 pb-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-semibold leading-tight">
              Ali Awdeh —{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent2 bg-clip-text text-transparent">
                Software Engineer
              </span>
            </h1>
            <p className="text-brand-dim mt-5 text-lg">
              Backend & AI/ML • 2 patents • 9 international medals • Ex-COO & Lead Dev (Senal Crypto).
              I build scalable APIs, automation, and fintech systems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/Ali_Awdeh_CV.pdf" className="btn btn-accent">Download CV</a>
              <Link href="/projects" className="btn">View Projects</Link>
              <Link href="/contact" className="btn">Contact</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Docker</Badge><Badge>AWS</Badge><Badge>Nginx</Badge><Badge>Node.js</Badge><Badge>TypeScript</Badge>
            </div>
          </div>
          <div className="card p-8">
            <h3 className="font-medium mb-4">Highlights</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div className="text-3xl font-semibold">2</div><div className="p-dim text-sm mt-1">Patents</div></div>
              <div><div className="text-3xl font-semibold">9</div><div className="p-dim text-sm mt-1">Medals</div></div>
              <div><div className="text-3xl font-semibold">10k+</div><div className="p-dim text-sm mt-1">Records handled</div></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Geneva Gold (2018, 2023)</Badge>
              <Badge>IIFME Gold (2023)</Badge>
              <Badge>IENA Gold (2022)</Badge>
            </div>
          </div>
        </div>
      </section>

      <Section title="Featured Projects" subtitle="A snapshot of work across backend, AI/ML, and blockchain">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-medium">AI-driven Trading Bots</h4>
            <p className="p-dim mt-1">Reduced manual analysis by 60% with real-time signals.</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge>Node.js</Badge><Badge>Python</Badge><Badge>MySQL</Badge><Badge>Docker</Badge>
            </div>
          </Card>
          <Card>
            <h4 className="font-medium">Training Management System</h4>
            <p className="p-dim mt-1">Cut report time by 40%; handled 10k+ records import.</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge>TypeScript</Badge><Badge>Express</Badge><Badge>REST</Badge>
            </div>
          </Card>
          <Card>
            <h4 className="font-medium">Blockchain Audits & Tokenomics</h4>
            <p className="p-dim mt-1">Security protocols & audits for client trust.</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <Badge>Smart Contracts</Badge><Badge>DeFi</Badge><Badge>Security</Badge>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
