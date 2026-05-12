"use client";

export default function ScrollDownButton() {
  return (
    <div className="flex justify-center mt-8">
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
        <svg
          className="animate-bounce-y"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FDE6F2"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
}
