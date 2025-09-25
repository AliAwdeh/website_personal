import { Section } from "@/components/Section";
import { Card } from "@/components/Card";

export default function ContactPage() {
  return (
    <Section title="Contact" subtitle="Reach out — I respond quickly">
      <Card>
        <ul className="space-y-2">
          <li>Email: <a className="hover:underline" href="mailto:Ali.I.Awdeh@gmail.com">Ali.I.Awdeh@gmail.com</a></li>
          <li>LinkedIn: <a className="hover:underline" href="https://linkedin.com/in/AliAwdeh">linkedin.com/in/AliAwdeh</a></li>
          <li>GitHub: <a className="hover:underline" href="https://github.com/aliawdeh">github.com/aliawdeh</a></li>
          <li>WhatsApp: <a className="hover:underline" href="https://wa.me/96171161670">+961 71 161 670</a></li>
        </ul>
      </Card>
    </Section>
  );
}
