"use client";
import { ArrowDownIcon } from "@phosphor-icons/react";

export default function ScrollDownButton() {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
        aria-label="Scroll down"
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-pink cursor-pointer"
        style={{
          background: "rgba(253,230,242,0.15)",
          border: "1.5px solid rgba(253,230,242,0.50)",
          backdropFilter: "blur(4px)",
        }}
      >
        <ArrowDownIcon size={18} weight="duotone" color="#FDE6F2" className="animate-bounce-y" />
      </button>
    </div>
  );
}
