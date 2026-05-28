"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/awards", label: "Awards & Patents" },
  { href: "/talks", label: "Talks" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold tracking-wide text-lg">
          Ali <span className="text-brand-accent">Awdeh</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm px-3 py-2 rounded-xl border border-transparent hover:border-white/10 relative ${
                pathname === l.href ? "bg-white/10" : ""
              }`}
            >
              {l.label}
              {pathname === l.href && (
                <span className="absolute left-3 right-3 -bottom-[2px] h-[2px] bg-gradient-to-r from-brand-accent to-brand-accent2 rounded-full" />
              )}
            </Link>
          ))}
          <a
            className="btn btn-accent ml-2"
            href="/Ali_Awdeh_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-4 h-4" /> CV
          </a>
        </nav>
      </div>
    </header>
  );
}
