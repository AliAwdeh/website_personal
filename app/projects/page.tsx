import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

const projects = [
  {
    "title": "Vesti — Fashion Similarity Detection",
    "slug": "vesti-fashion-similarity",
    "year": 2024,
    "summary": "Deep-learning visual search that finds look-alike apparel and checks live inventory.",
    "problem": "Text search can’t capture style similarity; shoppers can’t find visually similar items easily.",
    "solution": "CNN embeddings + FAISS vector search; inventory join via PostgreSQL; REST API for web/app.",
    "impact": "Cut search friction by 40%; supports 50k+ images with sub-second queries.",
    "stack": ["Python", "TensorFlow", "FAISS", "PostgreSQL", "Docker", "Node.js"],
    "links": { "demo": "", "repo": "" },
    "tags": ["cv", "retrieval", "ecommerce"],
    "status": "active"
  },
  {
    "title": "Home LLM Server — Restaurant Menu Intelligence",
    "slug": "llm-menu-intelligence",
    "year": 2025,
    "summary": "Private LLM for allergies, preferences, and order support on local GPU.",
    "problem": "Restaurants need safe, fast answers about allergens and choices without sending data to cloud.",
    "solution": "HuggingFace + Ollama fine-tuning; embeddings over menus; API for chat/ordering.",
    "impact": "Automated ~80% of inquiries; 95%+ accuracy on allergy checks.",
    "stack": ["Ollama", "HuggingFace Transformers", "PyTorch", "LangChain", "Docker", "NVIDIA GPU"],
    "links": { "demo": "", "repo": "" },
    "tags": ["llm", "nlp", "rags"],
    "status": "active"
  },
  {
    "title": "Distributed Backend APIs on Home Lab",
    "slug": "home-backend-apis",
    "year": 2024,
    "summary": "High-availability APIs with MySQL/PostgreSQL on ZFS-backed NAS, fronted by HAProxy/Nginx.",
    "problem": "Cost-effective, private hosting for multiple services and experiments.",
    "solution": "Node.js + Spring Boot microservices; HAProxy/Nginx LB; ZFS snapshots & replication.",
    "impact": "99.9% uptime on self-hosted infra; horizontal scaling via LB rules.",
    "stack": ["Node.js", "Spring Boot", "MySQL", "PostgreSQL", "Nginx", "HAProxy", "ZFS"],
    "links": { "demo": "", "repo": "" },
    "tags": ["backend", "infra", "ha"],
    "status": "active"
  },
  {
    "title": "LLM Automation Hub",
    "slug": "llm-automation-hub",
    "year": 2025,
    "summary": "Local LLMs automate email triage, summaries, and internal reports.",
    "problem": "Repetitive digital tasks waste weekly hours and leak data if done in cloud.",
    "solution": "Ollama multi-model router; workflows with Transformers/LangChain; React control panel.",
    "impact": "Saves ~15+ hours/week; privacy by default on local hardware.",
    "stack": ["Ollama", "HuggingFace", "LangChain", "Python", "React", "Redis"],
    "links": { "demo": "", "repo": "" },
    "tags": ["automation", "privacy", "agents"],
    "status": "active"
  },
  {
    "title": "GPU Lab — Training & Inference",
    "slug": "gpu-lab",
    "year": 2024,
    "summary": "Ubuntu VM with PCIe GPU passthrough for training, fine-tuning, and serving models.",
    "problem": "Cloud GPUs are expensive for continuous experimentation.",
    "solution": "Proxmox/VM with NVIDIA passthrough; datasets over 10GbE NAS; PyTorch/TensorFlow stack.",
    "impact": "Zero recurring GPU cost; faster iteration cycles.",
    "stack": ["Ubuntu", "Proxmox", "NVIDIA", "PyTorch", "TensorFlow", "10GbE", "NAS"],
    "links": { "demo": "", "repo": "" },
    "tags": ["mlops", "hardware", "training"],
    "status": "active"
  },
  {
    "title": "Personal Website Infra",
    "slug": "personal-website-infra",
    "year": 2025,
    "summary": "Self-hosted Next.js with CI/CD, ZFS snapshots, and HAProxy load balancing.",
    "problem": "Need full control over hosting and costs.",
    "solution": "Containers for web/app; HAProxy for LB/SSL; ZFS replication for rollbacks.",
    "impact": "99.5%+ uptime with instant rollbacks and low latency on LAN.",
    "stack": ["Next.js", "Docker", "HAProxy", "ZFS", "GitHub Actions"],
    "links": { "demo": "https://aliawdeh.com", "repo": "" },
    "tags": ["devops", "hosting", "nextjs"],
    "status": "active"
  },
  {
    "title": "Accounting & Reservations — Family Business",
    "slug": "accounting-reservations",
    "year": 2023,
    "summary": "Custom accounting and booking platform for operations and customers.",
    "problem": "Manual bookkeeping and phone-based reservations caused errors and delays.",
    "solution": "Spring Boot + MySQL backend; portal for bookings, payments, and reports.",
    "impact": "60% fewer accounting errors; 75% less phone time for reservations.",
    "stack": ["Spring Boot", "MySQL", "React", "Nginx"],
    "links": { "demo": "", "repo": "" },
    "tags": ["fullstack", "smb", "finops"],
    "status": "active"
  },
  {
    "title": "Witness — Blockchain Transparency",
    "slug": "witness-transparency",
    "year": 2022,
    "summary": "Immutable public logs for projects and spending to increase trust.",
    "problem": "Low transparency in community and NGO projects.",
    "solution": "Smart contracts + React dashboard; on-chain event history with proofs.",
    "impact": "Improved stakeholder trust; early pilots with community groups.",
    "stack": ["Solidity", "Ethereum", "React", "Node.js"],
    "links": { "demo": "", "repo": "" },
    "tags": ["blockchain", "governance", "audit"],
    "status": "paused"
  },
  {
    "title": "Inventions — M-Gun & Smart Wind Controller",
    "slug": "inventions",
    "year": 2017,
    "summary": "Two patented inventions with international recognition.",
    "problem": "Explore non-combustion propulsion and extend turbine life and safety.",
    "solution": "Magnetic propulsion prototype (M-Gun); smart wind controller optimizing loads.",
    "impact": "9 medals; turbine longevity improved from ~3 to ~17 years in testing contexts.",
    "stack": ["R&D", "Control Systems", "Embedded"],
    "links": { "demo": "", "repo": "" },
    "tags": ["patents", "hardware", "energy"],
    "status": "archived"
  },
  {
    "title": "Jellyfin + Cloudflare Zero Trust",
    "slug": "Jellyfin-zero-trust",
    "year": 2025,
    "summary": "Secure remote media access without exposing home IP.",
    "problem": "Remote access to Jellyfin can leak IP and attack surface.",
    "solution": "Cloudflared tunnel + Cloudflare Access policies; device posture checks.",
    "impact": "Zero open inbound ports; stable streaming from anywhere.",
    "stack": ["Jellyfin", "Cloudflared", "Cloudflare Zero Trust", "Docker"],
    "links": { "demo": "", "repo": "" },
    "tags": ["security", "networking", "media"],
    "status": "active"
  },
  {
    "title": "Smart Server Dashboard",
    "slug": "smart-server-dashboard",
    "year": 2025,
    "summary": "Live observability for servers, GPUs, and services with alerts.",
    "problem": "Hard to see system health, GPU load, and latency across services.",
    "solution": "Prometheus exporters + Node Exporter + nvidia-dcgm; Grafana boards; Alertmanager.",
    "impact": "Early issue detection; latency/SLO tracking and capacity planning.",
    "stack": ["Grafana", "Prometheus", "Alertmanager", "Node Exporter", "nvidia-dcgm", "Loki"],
    "links": { "demo": "", "repo": "" },
    "tags": ["observability", "sre", "gpu"],
    "status": "active"
  },
  {
    "title": "Latency Lab — Always-On Tuning",
    "slug": "latency-lab",
    "year": 2025,
    "summary": "Continuous in-house tuning for lower p95 latency and better throughput.",
    "problem": "Self-hosted services can drift in performance under changing workloads.",
    "solution": "Benchmark harness (k6/hey); Nginx/HAProxy tuning; kernel/net stack tweaks; DB indexing.",
    "impact": "25–45% p95 reduction across key APIs; smoother load under spikes.",
    "stack": ["k6", "hey", "Nginx", "HAProxy", "Linux", "MySQL", "PostgreSQL"],
    "links": { "demo": "", "repo": "" },
    "tags": ["performance", "benchmarking", "tuning"],
    "status": "active"
  }
]


export default function ProjectsPage() {
  return (
    <Section title="Projects" subtitle="Selected work — problem, approach, measurable impact">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.title}>
            <h3 className="font-medium">{p.title}</h3>
            <p className="p-dim mt-1">{p.impact}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {p.stack.map((s) => <Badge key={s}>{s}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
