"use client";
import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
      style={{
        background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
        boxShadow: "0 4px 20px rgba(227,41,115,0.45)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Shimmer ring on hover */}
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: "0 0 0 4px rgba(227,41,115,0.25)" }}
      />
      <ArrowUpIcon size={20} weight="duotone" className="text-white relative z-10 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </button>
  );
}
