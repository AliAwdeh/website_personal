export function Timeline({ items }: { items: { year: string; title: string; subtitle?: string }[] }) {
  return (
    <ol className="relative border-l border-white/10 ml-3">
      {items.map((it, i) => (
        <li key={i} className="mb-8 ml-6">
          <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent2"></span>
          <h3 className="font-medium">{it.year} — {it.title}</h3>
          {it.subtitle && <p className="text-brand-dim mt-1">{it.subtitle}</p>}
        </li>
      ))}
    </ol>
  );
}
