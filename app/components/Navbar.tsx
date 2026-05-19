"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { InstagramLogoIcon, TiktokLogoIcon, FacebookLogoIcon, ArrowRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";

const SOCIALS = [
  {
    href: "https://www.instagram.com/smallcakessnellville/",
    label: "Instagram",
    icon: <InstagramLogoIcon size={20} weight="duotone" />,
  },
  {
    href: "https://www.tiktok.com/@smallcakesgwinnett",
    label: "TikTok",
    icon: <TiktokLogoIcon size={20} weight="duotone" />,
  },
  {
    href: "https://www.facebook.com/smallcakesgwinnett",
    label: "Facebook",
    icon: <FacebookLogoIcon size={20} weight="duotone" />,
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
    { href: "/catering", label: "Catering" },
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
          <ArrowRightIcon size={14} weight="duotone" />
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
              <XIcon size={24} weight="duotone" />
            ) : (
              <ListIcon size={24} weight="duotone" />
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
