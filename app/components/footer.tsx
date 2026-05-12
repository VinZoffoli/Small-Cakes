"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="font-sans w-full bg-[#6b2a2c]">

      <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[40px] lg:gap-[60px] py-[40px] lg:py-[80px] px-6 lg:px-0">

        {/* Left - Logo + info */}
        <div className="flex flex-col gap-4 max-w-[580px] items-center lg:items-start text-center lg:text-left">
          <div className="relative">
            <div className="absolute inset-0 bg-[#E32973]/20 blur-3xl rounded-full"></div>
            <img src="/assets/logo_footer.webp" alt="Smallcakes Gwinnett" className="relative w-[200px] lg:w-[261px] mb-[10px] lg:mb-[20px]" />
          </div>

          <p className="text-white text-[22px] lg:text-[28px] leading-[110%] lg:leading-[100%] font-semibold mt-2">
            Handcrafted treats, made with love.
          </p>
          <p className="text-white/80 text-[15px] lg:text-[16px] leading-[22px] lg:leading-[24px] max-w-[540px]">
            From cupcakes to ice cream, every bite is made fresh daily with the finest ingredients.
          </p>

          <a
            href="https://maps.app.goo.gl/26KwMPiVgXg9QjCP6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#979797] leading-[20px] text-[15px] lg:text-[16px] uppercase hover:text-[#E32973] transition group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" className="fill-current" />
            </svg>
            <span className="border-b border-transparent  transition-colors">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
              <path d="M15.3025 11.0285L2 11.0285L2 8.97146L15.3025 8.97146L11.1214 4.45436L12.4872 3L19 10L12.4872 17L11.1214 15.5456L15.3025 11.0285Z" fill="#FDE6F2" />
            </svg>
          </a>
        </div>

        {/* Nav columns wrapper */}
        <div className="flex flex-row lg:contents gap-12 sm:gap-20 w-full justify-center lg:w-auto lg:justify-start">

          {/* Smallcakes column */}
          <div className="flex flex-col gap-3 items-start lg:relative lg:pl-8">
            <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#E32973]/30 to-transparent"></div>
            <div className="flex flex-col mb-2">
              <p
                className="text-[#E32973] text-[28px] leading-[100%] tracking-wide uppercase"
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
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={label}
                  href={href}
                  className={`text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#E32973] hover:translate-x-1 transition-all duration-200 inline-block ${isActive ? "text-[#E32973] border-b border-[#E32973]" : "text-[#FDE6F2]"}`}
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
                className="text-[#E32973] text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                More
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2"></div>
            </div>
            {(
              [
                { label: "Catering", href: "/catering", external: false },
                { label: "Locations", href: "/locations", external: false },
                { label: "Order Online", href: "https://www.smallcakesgwinnettshop.com", external: true },
                { label: "Work With Us", href: "https://www.indeed.com/cmp/Smallcakes-Snellville-1/about", external: true },
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
                  className={`text-[15px] leading-[21px] uppercase whitespace-nowrap hover:text-[#E32973] hover:translate-x-1 transition-all duration-200 inline-block ${isActive ? "text-[#E32973] border-b border-[#E32973]" : "text-[#FDE6F2]"}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Social + Phone + Hours */}
        <div className="flex flex-col gap-6 w-full lg:w-auto bg-black/25 lg:bg-transparent p-6 lg:p-0 items-center lg:items-start text-center lg:text-left lg:relative lg:pl-8">
          <div className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#E32973]/30 to-transparent"></div>

          {/* Social Media */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col mb-3">
              <p
                className="text-[#E32973] text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                Social Media
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2 mx-auto lg:mx-0"></div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/smallcakessnellville/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group w-10 h-10 flex items-center justify-center border border-[#FDE6F2]/30 hover:border-[#E32973] hover:bg-[#E32973] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" className="fill-[#FDE6F2] group-hover:fill-white transition-colors duration-300" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@smallcakesgwinnett" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="group w-10 h-10 flex items-center justify-center border border-[#FDE6F2]/30 hover:border-[#E32973] hover:bg-[#E32973] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16.5 2C16.8 4.1 18.4 5.7 20.5 6V9C18.9 8.95 17.4 8.45 16 7.6V14.5C16 18.1 13.1 21 9.5 21C5.9 21 3 18.1 3 14.5C3 10.9 5.9 8 9.5 8C10 8 10.5 8.05 11 8.15V11.2C10.5 11.05 10 11 9.5 11C7.6 11 6 12.6 6 14.5C6 16.4 7.6 18 9.5 18C11.4 18 13 16.4 13 14.5V2H16.5Z" className="fill-[#FDE6F2] group-hover:fill-white transition-colors duration-300" />
                </svg>
              </a>
              <a href="https://www.facebook.com/SmallcakesCupcakeryAndCreamery/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group w-10 h-10 flex items-center justify-center border border-[#FDE6F2]/30 hover:border-[#E32973] hover:bg-[#E32973] transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" className="fill-[#FDE6F2] group-hover:fill-white transition-colors duration-300" />
                </svg>
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col mb-2">
              <p
                className="text-[#E32973] text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                Phone
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2 mx-auto lg:mx-0"></div>
            </div>
            <div className="flex flex-col gap-1.5">
              <a href="tel:7708641984" className="flex items-center gap-2 text-[#FDE6F2] text-[15px] uppercase hover:text-[#E32973] transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5Z" className="fill-current" />
                </svg>
                <span className="text-white/60 mr-0.5">Snellville</span> 770-864-1984
              </a>
              <a href="tel:7702248033" className="flex items-center gap-2 text-[#FDE6F2] text-[15px] uppercase hover:text-[#E32973] transition">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5Z" className="fill-current" />
                </svg>
                <span className="text-white/60 mr-0.5">Buford</span> 770-224-8033
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col mb-2">
              <p
                className="text-[#E32973] text-[28px] leading-[100%] tracking-wide uppercase"
                style={{ fontFamily: "'Boorsok', cursive" }}
              >
                Hours
              </p>
              <div className="w-8 h-[2px] bg-[#E32973] mt-2 mx-auto lg:mx-0"></div>
            </div>
            <div className="text-[#FDE6F2] text-[15px] leading-[22px] space-y-0.5 uppercase">
              <p className="whitespace-nowrap"><span className="text-white/60">Mon – Fri</span> 10:00 AM – 8:00 PM</p>
              <p className="whitespace-nowrap"><span className="text-white/60">Saturday</span> 10:00 AM – 9:00 PM</p>
              <p className="whitespace-nowrap"><span className="text-white/60">Sunday</span> 12:00 PM – 6:00 PM</p>
            </div>
          </div>
        </div>

      </div>

      {/* Pink gradient divider */}
      <div className="w-full max-w-[1180px] mx-auto px-6 lg:px-0">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E32973]/40 to-transparent"></div>
      </div>

      {/* Bottom bar - identical to siena */}
      <div className="w-full bg-white py-4 px-6">
        <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-3 lg:gap-0">

          <div className="flex items-center gap-2">
            <a href="https://restoexp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:opacity-80 transition">
              <img src="/assets/restoexplogo.webp" alt="Resto Experience" className="h-auto w-[240px] lg:w-[307px]" />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 text-[13px] lg:text-[14px] leading-[20px] lg:leading-[30px] text-[#5c5c5c] text-center">
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
