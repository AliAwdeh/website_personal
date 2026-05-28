"use client";

import {useEffect, useRef, useState} from "react";

/**
 * Lightweight YouTube embed:
 * - Uses youtube-nocookie.com
 * - Lazy loads the iframe only on click or when near viewport
 * - Accessible: keyboard + ARIA
 */
export default function YouTubeLite({
  id,
  title,
  start = 0,
  className = "",
}: {
  id: string;           // e.g. "dQw4w9WgXcQ"
  title: string;        // human title for a11y/SEO
  start?: number;       // seconds to start at (optional)
  className?: string;   // extra styles if needed
}) {
  const [activated, setActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Prefetch on near-viewport to improve first click speed
  useEffect(() => {
    if (!containerRef.current || activated) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // warm connection
          const preconnect = (href: string) => {
            const l = document.createElement("link");
            l.rel = "preconnect";
            l.href = href;
            document.head.appendChild(l);
          };
          preconnect("https://www.youtube-nocookie.com");
          preconnect("https://i.ytimg.com");
          io.disconnect();
        }
      });
    }, { rootMargin: "500px" });
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, [activated]);

  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <figure
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video ${className}`}
    >
      {!activated ? (
        <button
          type="button"
          className="group absolute inset-0 w-full h-full"
          onClick={() => setActivated(true)}
          aria-label={`Play video: ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnail}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-90 transition group-hover:opacity-100"
          />
          {/* Scrim + Play */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-full p-4 md:p-5 bg-white/15 border border-white/20 backdrop-blur group-hover:bg-white/20 transition">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&start=${start}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
        />
      )}
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
