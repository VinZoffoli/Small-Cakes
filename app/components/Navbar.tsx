"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about-us", label: "About Us" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg bg-white/95 backdrop-blur-md"
          : "shadow-sm bg-white"
      }`}
    >
      {/* Pink gradient accent strip */}
      <div
        className="w-full h-[3px]"
        style={{
          background: "linear-gradient(90deg, #FDE6F2 0%, #E32973 30%, #C41254 60%, #E32973 80%, #FDE6F2 100%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-[68px] md:h-[76px] px-4 md:px-0">
        <Link href="/" className="flex-shrink-0 group">
          <Image
            src="/assets/logo_header.webp"
            alt="Smallcakes Gwinnett"
            width={180}
            height={58}
            className="object-contain h-[46px] w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 group"
              >
                <span
                  className={`font-raleway font-bold text-[14px] uppercase tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-brand"
                      : "text-brand-text group-hover:text-brand"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`h-[3px] rounded-full bg-brand transition-all duration-300 ${
                    isActive ? "w-5 opacity-100" : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-40"
                  }`}
                />
              </Link>
            );
          })}

          <a
            href="https://www.smallcakesgwinnettshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 font-raleway font-bold text-[14px] uppercase tracking-wide px-6 py-2.5 rounded-full text-white flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
              boxShadow: "0 4px 14px rgba(227,41,115,0.30)",
            }}
          >
            Order Online
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-brand rounded-lg hover:bg-brand-light transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-brand-light py-4 px-5 flex flex-col gap-2">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-raleway font-bold text-[15px] uppercase tracking-wide py-2.5 pl-3 border-l-[3px] rounded-r-lg transition-all duration-200 ${
                  isActive
                    ? "text-brand border-brand bg-brand-light/40"
                    : "text-brand-text border-transparent hover:border-brand/30 hover:text-brand hover:bg-brand-light/20"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <a
            href="https://www.smallcakesgwinnettshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-white font-raleway font-bold text-[15px] uppercase tracking-wide px-6 py-3 rounded-full text-center transition-all"
            style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)" }}
          >
            Order Online
          </a>
        </div>
      )}
    </header>
  );
}
