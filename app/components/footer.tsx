"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinIcon, ArrowRightIcon, InstagramLogoIcon, TiktokLogoIcon, FacebookLogoIcon, PhoneIcon } from "@phosphor-icons/react";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative font-sans w-full bg-[#6b2a2c] overflow-x-hidden">

      {/* Cloud top divider */}
      <svg aria-hidden="true" viewBox="0 0 1440 56" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "56px", pointerEvents: "none", display: "block" }}>
        <path d="M0,0 L1440,0 L1440,28 Q1404,56 1368,28 Q1332,56 1296,28 Q1260,56 1224,28 Q1188,56 1152,28 Q1116,56 1080,28 Q1044,56 1008,28 Q972,56 936,28 Q900,56 864,28 Q828,56 792,28 Q756,56 720,28 Q684,56 648,28 Q612,56 576,28 Q540,56 504,28 Q468,56 432,28 Q396,56 360,28 Q324,56 288,28 Q252,56 216,28 Q180,56 144,28 Q108,56 72,28 Q36,56 0,28 Z" fill="white"/>
      </svg>

      <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[60px] pt-[100px] pb-[40px] lg:pt-[120px] lg:pb-[80px] px-6 lg:px-0">

        {/* Left - Logo + info */}
        <div className="flex flex-col gap-4 max-w-[580px] items-center lg:items-start text-center lg:text-left">
          <div className="relative">
            <div className="absolute inset-0 bg-[#E32973]/20 blur-3xl rounded-full"></div>
            <img src="/assets/logo_footer.webp" alt="Smallcakes Gwinnett" width={528} height={127} className="relative w-[200px] lg:w-[261px] mb-[10px] lg:mb-[20px]" />
          </div>

          <p className="text-white text-[22px] lg:text-[28px] leading-[110%] lg:leading-[100%] font-semibold mt-2">
            Handcrafted treats,<br className="md:hidden" /> made with love.
          </p>
          <p className="text-white/80 text-[15px] lg:text-[16px] leading-[22px] lg:leading-[24px] max-w-[540px]">
            From cupcakes to ice cream, every bite is made fresh daily with the finest ingredients.
          </p>

          <a
            href="https://maps.app.goo.gl/26KwMPiVgXg9QjCP6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 leading-[20px] text-[15px] lg:text-[16px] uppercase hover:text-[#E32973] transition group"
          >
            <MapPinIcon size={16} weight="duotone" className="hidden lg:block flex-shrink-0" />
            <span className="border-b border-transparent transition-colors">
              The Shoppes at Webb Gin, Snellville, GA
            </span>
          </a>

          <a
            href="https://www.smallcakesgwinnettshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-7 py-3 rounded-full font-raleway font-bold text-[15px] leading-[20px] flex items-center gap-2 w-fit overflow-hidden group mt-3 uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#FDE6F2", boxShadow: "0 4px 18px rgba(227,41,115,0.35)" }}
          >
            <span className="absolute inset-0 rounded-full bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Order Online</span>
            <ArrowRightIcon size={20} weight="duotone" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Nav columns wrapper */}
        <div className="flex flex-row lg:contents gap-8 sm:gap-16 w-full justify-center lg:w-auto lg:justify-start">

          {/* Smallcakes column */}
          <div className="flex flex-col gap-3 items-start lg:relative lg:pl-8">
            <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#E32973]/30 to-transparent"></div>
            <div className="flex flex-col mb-2">
              <p
                className="text-white text-[20px] lg:text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                Smallcakes
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2"></div>
            </div>
            {[
              { label: "Home", href: "/" },
              { label: "Menu", href: "/menu" },
              { label: "About Us", href: "/about-us" },
              { label: "Catering", href: "/catering" },
            ].map(({ label, href }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={label}
                  href={href}
                  className={`text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#E32973] hover:translate-x-1 transition-all duration-200 inline-block ${isActive ? "text-white font-semibold border-b border-[#E32973]" : "text-[#FDE6F2]"}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* More column */}
          <div className="flex flex-col gap-3 items-start lg:relative lg:pl-8">
            <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#E32973]/30 to-transparent"></div>
            <div className="flex flex-col mb-2">
              <p
                className="text-white text-[20px] lg:text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                More
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2"></div>
            </div>
            {(
              [
                { label: "Locations", href: "/#locations", external: false },
                { label: "Work With Us", href: "https://www.indeed.com/cmp/Smallcakes-Snellville-1/about", external: true },
                { label: "Contact Us", href: "/contact", external: false },
              ] as { label: string; href: string; external: boolean }[]
            ).map(({ label, href, external }) => {
              const isActive = !external && (pathname === href || (href !== "/" && pathname.startsWith(href)));
              return external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FDE6F2] text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#E32973] hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className={`text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#E32973] hover:translate-x-1 transition-all duration-200 inline-block ${isActive ? "text-white font-semibold border-b border-[#E32973]" : "text-[#FDE6F2]"}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Social + Phone + Hours */}
        <div className="flex flex-col gap-6 w-full lg:w-auto bg-black/25 lg:bg-transparent p-6 lg:p-0 items-center lg:items-start text-center lg:text-left lg:relative lg:pl-8 rounded-[12px] lg:rounded-none">
          <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#E32973]/30 to-transparent"></div>

          {/* Social Media */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col mb-3">
              <p
                className="text-white text-[20px] lg:text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                Social Media
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2 mx-auto lg:mx-0"></div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/smallcakessnellville/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group w-10 h-10 rounded-full flex items-center justify-center border border-[#FDE6F2]/30 hover:border-[#E32973] hover:bg-[#E32973] transition-all duration-300">
                <InstagramLogoIcon size={20} weight="duotone" className="text-[#FDE6F2] group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="https://www.tiktok.com/@smallcakesgwinnett" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="group w-10 h-10 rounded-full flex items-center justify-center border border-[#FDE6F2]/30 hover:border-[#E32973] hover:bg-[#E32973] transition-all duration-300">
                <TiktokLogoIcon size={20} weight="duotone" className="text-[#FDE6F2] group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="https://www.facebook.com/SmallcakesCupcakeryAndCreamery/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group w-10 h-10 rounded-full flex items-center justify-center border border-[#FDE6F2]/30 hover:border-[#E32973] hover:bg-[#E32973] transition-all duration-300">
                <FacebookLogoIcon size={20} weight="duotone" className="text-[#FDE6F2] group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col mb-2">
              <p
                className="text-white text-[20px] lg:text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                Phone
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2 mx-auto lg:mx-0"></div>
            </div>
            <div className="flex flex-col gap-1.5">
              <a href="tel:7708641984" className="flex items-center gap-2 text-[#FDE6F2] text-[15px] uppercase lg:whitespace-nowrap hover:text-[#E32973] transition">
                <PhoneIcon size={14} weight="duotone" className="flex-shrink-0" />
                <span className="text-white/60 mr-0.5">Snellville</span> 770-864-1984
              </a>
              <a href="tel:7702248033" className="flex items-center gap-2 text-[#FDE6F2] text-[15px] uppercase lg:whitespace-nowrap hover:text-[#E32973] transition">
                <PhoneIcon size={14} weight="duotone" className="flex-shrink-0" />
                <span className="text-white/60 mr-0.5">Buford</span> 770-224-8033
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Pink gradient divider */}
      <div className="w-full max-w-[1180px] mx-auto px-6 lg:px-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E32973]/40 to-transparent"></div>
      </div>

      {/* Bottom bar - identical to siena */}
      <div className="w-full bg-white py-4 px-4 sm:px-6">
        <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-3 lg:gap-0">

          <div className="flex items-center gap-2">
            <a href="https://restoexp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:opacity-80 transition">
              <img src="/assets/restoexplogo.webp" alt="Resto Experience" width={500} height={59} className="h-auto w-[200px] sm:w-[240px] lg:w-[307px]" />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 text-[12px] sm:text-[13px] lg:text-[14px] leading-[20px] lg:leading-[30px] text-[#5c5c5c] text-center">
            <span>Restaurant Marketing, Content & Web Design</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="40" viewBox="0 0 2 40" fill="none" className="hidden lg:block">
              <rect width="2" height="40" fill="url(#paint0_radial_2448_639)" />
              <defs>
                <radialGradient id="paint0_radial_2448_639" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1 20) rotate(90) scale(20 1)">
                  <stop stopColor="#7C7C7C" stopOpacity="0.486275" />
                  <stop offset="1" stopColor="#7C7C7C" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            <span>2026</span>
          </div>

        </div>
      </div>

    </footer>
  );
}
