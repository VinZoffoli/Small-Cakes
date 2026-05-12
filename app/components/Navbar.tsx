"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SOCIALS = [
  {
    href: "https://www.instagram.com/smallcakessnellville/",
    label: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@smallcakesgwinnett",
    label: "TikTok",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.53a8.22 8.22 0 004.8 1.52V6.6a4.85 4.85 0 01-1.03-.09z" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/smallcakesgwinnett",
    label: "Facebook",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

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
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg bg-white/95 backdrop-blur-md" : "shadow-sm bg-white"
      }`}
      style={{ height: scrolled ? "60px" : "80px", transition: "height 0.3s ease" }}
    >
      {/* Pink gradient accent strip */}
      <div
        className="w-full h-[3px]"
        style={{
          background: "linear-gradient(90deg, #FDE6F2 0%, #E32973 30%, #C41254 60%, #E32973 80%, #FDE6F2 100%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto flex items-center justify-between h-full px-4 md:px-0">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          {/* Mobile: icon */}
          <Image
            src="/assets/icono_responsive.svg"
            alt="Smallcakes"
            width={44}
            height={44}
            className="md:hidden object-contain w-10 h-10"
            priority
          />
          {/* Desktop: full logo */}
          <Image
            src="/assets/logo_header.webp"
            alt="Smallcakes Gwinnett"
            width={180}
            height={58}
            className="hidden md:block object-contain h-[46px] w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop nav — centered absolutely */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-1 group">
                <span
                  className={`font-raleway font-bold text-[14px] uppercase tracking-wide transition-colors duration-200 ${
                    isActive ? "text-brand" : "text-brand-text group-hover:text-brand"
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
        </nav>

        {/* Desktop: Order Online */}
        <a
          href="https://www.smallcakesgwinnettshop.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex ml-2 font-raleway font-bold text-[14px] uppercase tracking-wide px-6 py-2.5 rounded-full text-white items-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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

        {/* Mobile: Order Online + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="https://www.smallcakesgwinnettshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-raleway font-bold text-[13px] uppercase tracking-wide px-5 py-2 rounded-full text-white transition-all duration-300 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
              boxShadow: "0 3px 10px rgba(227,41,115,0.30)",
            }}
          >
            Order Online
          </a>
          <button
            className="p-2 text-brand rounded-lg hover:bg-brand-light transition-colors cursor-pointer"
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
      </div>

    </header>

    {/* Mobile dropdown — rendered outside <header> so backdrop-filter doesn't trap fixed positioning */}
    {mobileOpen && (
      <div
        className="md:hidden fixed left-0 right-0 bottom-0 bg-white flex flex-col px-5 py-5 gap-1 overflow-y-auto"
        style={{
          top: scrolled ? "60px" : "80px",
          borderTop: "1px solid rgba(227,41,115,0.15)",
          zIndex: 49,
        }}
      >
        {/* Nav links — centered */}
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-raleway font-bold text-[15px] uppercase tracking-wide py-3 text-center rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-brand bg-brand-light/40"
                  : "text-brand-text hover:text-brand hover:bg-brand-light/20"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          );
        })}

        {/* Order Online */}
        <a
          href="https://www.smallcakesgwinnettshop.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-white font-raleway font-bold text-[15px] uppercase tracking-wide px-6 py-3 rounded-full text-center transition-all duration-300 hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
            boxShadow: "0 4px 14px rgba(227,41,115,0.28)",
          }}
        >
          Order Online
        </a>

        {/* Social links */}
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(227,41,115,0.12)" }}>
          <p
            className="font-raleway font-bold text-[11px] uppercase tracking-widest text-center mb-3"
            style={{ color: "#E32973" }}
          >
            Our Social
          </p>
          <div className="flex justify-center gap-5">
            {SOCIALS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                  color: "#fff",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
}
