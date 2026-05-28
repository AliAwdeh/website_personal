"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/awards", label: "Awards & Patents" },
  { href: "/talks", label: "Talks" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="container flex items-center justify-between min-h-16 py-3">
        <Link href="/" className="font-semibold tracking-wide text-lg" onClick={closeMenu}>
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
        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur">
          <div className="container py-3 grid gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={`min-h-11 rounded-xl px-4 py-3 text-sm border border-transparent hover:border-white/10 ${
                  pathname === l.href ? "bg-white/10" : "bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              className="btn btn-accent min-h-11 justify-center"
              href="/Ali_Awdeh_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <Download className="w-4 h-4" /> Download CV
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
