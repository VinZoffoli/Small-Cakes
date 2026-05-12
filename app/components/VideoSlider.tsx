"use client";
import { useState } from "react";

const socialVideos = [
  "https://player.vimeo.com/video/1082917001?autoplay=1&muted=1&background=1&playsinline=1",
  "https://player.vimeo.com/video/1082915543?autoplay=1&muted=1&background=1&playsinline=1",
  "https://player.vimeo.com/video/1082915703?autoplay=1&muted=1&background=1&playsinline=1",
];

export default function VideoSlider() {
  const [current, setCurrent] = useState(1);

  return (
    <>
      {/* Mobile: single video + navigation */}
      <div className="md:hidden mb-10 flex flex-col items-center">
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg"
          style={{
            width: "min(85vw, 300px)",
            height: "min(75vw * 16/9, 480px)",
            aspectRatio: "9/16",
            outline: "2px solid rgba(227,41,115,0.15)",
            outlineOffset: "3px",
          }}
        >
          <iframe
            src={socialVideos[current]}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "177.78%",
              height: "177.78%",
              minWidth: "100%",
              minHeight: "100%",
              border: "none",
            }}
            allow="autoplay; fullscreen"
            title={`Social video ${current + 1}`}
          />
        </div>

        {/* Nav dots + arrows */}
        <div className="flex items-center gap-5 mt-5">
          <button
            onClick={() => setCurrent((c) => (c - 1 + 3) % 3)}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:-translate-x-0.5"
            style={{ borderColor: "rgba(227,41,115,0.4)", color: "#E32973" }}
            aria-label="Video anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "8px",
                  height: "8px",
                  background: i === current ? "#E32973" : "rgba(227,41,115,0.3)",
                }}
                aria-label={`Video ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((c) => (c + 1) % 3)}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:translate-x-0.5"
            style={{ borderColor: "rgba(227,41,115,0.4)", color: "#E32973" }}
            aria-label="Video siguiente"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: 3 videos side by side */}
      <div className="hidden md:flex items-center justify-center gap-4 mb-10">
        {[
          { url: socialVideos[0], w: 200, h: 355 },
          { url: socialVideos[1], w: 225, h: 430 },
          { url: socialVideos[2], w: 200, h: 355 },
        ].map(({ url, w, h }, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            style={{ width: `${w}px`, height: `${h}px`, outline: "2px solid rgba(227,41,115,0.15)", outlineOffset: "3px" }}
          >
            <iframe
              src={url}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "177.78%",
                height: "177.78%",
                minWidth: "100%",
                minHeight: "100%",
                border: "none",
              }}
              allow="autoplay; fullscreen"
              title={`Social video ${i + 1}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
