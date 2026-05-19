"use client";
import { useEffect, useState } from "react";

const BASE =
  "https://player.vimeo.com/video/1090145707?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&playsinline=1";

export default function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(BASE + (window.innerWidth >= 768 ? "&quality=1080p" : ""));
  }, []);

  if (!src) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <iframe
        src={src}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "177.78vh",
          minWidth: "100%",
          minHeight: "56.25vw",
          height: "100%",
          border: "none",
        }}
        allow="autoplay; fullscreen"
        title="Hero background video"
      />
    </div>
  );
}
