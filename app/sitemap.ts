export default function sitemap() {
  const now = new Date().toISOString();
  return [
    { url: "https://aliawdeh.com/", lastModified: now },
    { url: "https://aliawdeh.com/projects", lastModified: now },
    { url: "https://aliawdeh.com/experience", lastModified: now },
    { url: "https://aliawdeh.com/awards", lastModified: now },
    { url: "https://aliawdeh.com/talks", lastModified: now },
    { url: "https://aliawdeh.com/contact", lastModified: now }
  ];
}
