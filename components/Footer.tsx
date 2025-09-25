export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container py-10 text-sm text-brand-dim flex flex-col md:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Ali Awdeh</span>
        <div className="flex items-center gap-4">
          <a href="mailto:Ali.I.Awdeh@gmail.com" className="hover:underline">Email</a>
          <a href="https://linkedin.com/in/AliAwdeh" className="hover:underline">LinkedIn</a>
          <a href="https://github.com/aliawdeh" className="hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
