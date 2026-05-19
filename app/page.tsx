import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ScrollDownButton from "./components/ScrollDownButton";
import HeroVideo from "./components/HeroVideo";
import Image from "next/image";
import Link from "next/link";

const MonthlySpecials = dynamic(() => import("./components/MonthlySpecials"));
const DailyCupcakesCarousel = dynamic(() => import("./components/DailyCupcakesCarousel"));
const IceCreamCarousel = dynamic(() => import("./components/IceCreamCarousel"));
const VideoSlider = dynamic(() => import("./components/VideoSlider"));

const pressLogos = [
  { src: "/assets/client-1.webp", alt: "Press feature 1" },
  { src: "/assets/client-2.webp", alt: "Press feature 2" },
  { src: "/assets/client-3.webp", alt: "Press feature 3" },
  { src: "/assets/client-4.webp", alt: "Press feature 4" },
  { src: "/assets/client-5.webp", alt: "Press feature 5" },
];


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-[#0d0508]">
          <HeroVideo />
          <div className="absolute inset-0 bg-black/50" />

        

          <div className="relative z-10 text-center max-w-[960px] mx-auto px-6 sm:px-10">
            {/* Award badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up"
              style={{ background: "rgba(253,230,242,0.15)", border: "1px solid rgba(253,230,242,0.35)", backdropFilter: "blur(6px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-pink" />
              <span className="font-raleway font-bold text-[12px] uppercase tracking-widest whitespace-nowrap" style={{ color: "#FDE6F2" }}>
                Award-winning · 8 years in a row
              </span>
            </div>

            <h1 className="letras uppercase mb-4 animate-fade-in-up delay-100" style={{ fontSize: "clamp(30px, 5vw, 52px)", lineHeight: "1.1" }}>
              Home of<br /> the Smallcakes Smash
            </h1>
            <p
              className="font-raleway capitalize mb-8 animate-fade-in-up delay-200"
              style={{
                color: "#FDE6F2",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                fontWeight: 800,
                WebkitTextStrokeWidth: "0.5px",
                WebkitTextStrokeColor: "#FDE6F2",
                textShadow: "0px 1px 4px rgba(253,230,242,0.4)",
              }}
            >
              Gourmet cupcakes &amp; small batch ice cream
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 animate-fade-in-up delay-300">
              <a
                href="/menu"
                className="font-raleway font-bold text-[14px] uppercase tracking-wide px-7 py-3 rounded-full text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", boxShadow: "0 4px 20px rgba(227,41,115,0.40)" }}
              >
                View Our Menu
              </a>
              <a
                href="https://www.smallcakesgwinnettshop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-raleway font-bold text-[14px] uppercase tracking-wide px-7 py-3 rounded-full transition-all duration-300 hover:bg-white/15"
                style={{ color: "#FDE6F2", border: "1.5px solid rgba(253,230,242,0.45)" }}
              >
                Order Online
              </a>
            </div>

            <ScrollDownButton />
          </div>

          {/* Scalloped bottom edge transitions into the next section */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 56"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "56px", zIndex: 20, pointerEvents: "none", display: "block" }}
          >
            <path
              d="M0,56 L0,28 Q36,0 72,28 Q108,0 144,28 Q180,0 216,28 Q252,0 288,28 Q324,0 360,28 Q396,0 432,28 Q468,0 504,28 Q540,0 576,28 Q612,0 648,28 Q684,0 720,28 Q756,0 792,28 Q828,0 864,28 Q900,0 936,28 Q972,0 1008,28 Q1044,0 1080,28 Q1116,0 1152,28 Q1188,0 1224,28 Q1260,0 1296,28 Q1332,0 1368,28 Q1404,0 1440,28 L1440,56 Z"
              fill="white"
            />
          </svg>
        </section>

        {/* ─── HANDCRAFTED TREATS INTRO ──────────────────────────── */}
        <section
          className="py-16 md:py-20 text-center"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #fff0f6 45%, #fff0f6 55%, #ffffff 100%)" }}
        >
          <div className="max-w-[760px] mx-auto px-4 md:px-6">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 animate-fade-in-up">
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-brand-dark animate-pulse" />
                <div className="w-4 h-4 rounded-full border-2 border-brand" />
                <div className="w-2.5 h-2.5 rounded-full bg-brand" />
              </div>
              <h2 className="text-center leading-tight">
                <span className="hand">Handcrafted treats, </span>
                <span className="made">Made Fresh to </span>
                <span className="day">Brighten Your Day</span>
              </h2>
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-brand" />
                <div className="w-5 h-5 rounded-full border-2 border-brand-dark" />
                <div className="w-2.5 h-2.5 rounded-full bg-brand-dark animate-pulse" />
              </div>
            </div>
            <p
              className="font-raleway font-medium text-[16px] text-center mb-8 max-w-[560px] mx-auto"
              style={{ color: "#87143D", lineHeight: "1.6" }}
            >
              Our gourmet cupcakes are baked fresh daily. Our small-batch ice
              cream is made on site.{" "}
              <strong>Plus, don&#39;t miss our exclusive flavors—new ones drop monthly. Taste them before they&#39;re gone!</strong>
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 font-raleway font-bold text-[15px] rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#F8FAFC", padding: "12px 32px", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
            >
              Read More About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ─── DIVIDER ──────────────────────────────────────────── */}
        <img
          src="/assets/fondo_interseccion.webp"
          alt=""
          width={1386}
          height={12}
          style={{ width: "100%", display: "block" }}
        />

        {/* ─── MONTHLY SPECIALS ─────────────────────────────────── */}
        <MonthlySpecials />

        {/* ─── DAILY CUPCAKES ───────────────────────────────────── */}
        <DailyCupcakesCarousel />

        {/* ─── ICE CREAM ────────────────────────────────────────── */}
        <IceCreamCarousel />

        {/* ─── CATERING ─────────────────────────────────────────── */}
        {/*
          overflow-x:hidden on section prevents horizontal scrollbar from overflowing images.
          The card itself has no overflow-hidden so photos bleed past its edges.
        */}
        <section className="py-10 md:py-14 bg-white" style={{ overflowX: "hidden" }}>
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div
              className="relative rounded-2xl"
              style={{
                backgroundImage: "url(/assets/banner_azul.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-2xl" style={{ background: "rgba(14,36,45,0.78)" }} />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[54%_46%] items-stretch gap-0">
                <div className="px-6 md:px-14 py-10 md:py-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                  <h2 className="cate mb-1">Catering &amp; Custom Treats</h2>
                  <p className="for-every mb-6">For Every Celebration</p>
                  <p
                    className="font-raleway text-white leading-relaxed max-w-[480px] md:max-w-[600px]"
                    style={{ color: "#ffffff", fontWeight: 600, fontSize: "17px" }}
                  >
                    From corporate events to birthdays and weddings, our
                    homemade cupcakes and small-batch ice cream bring a touch
                    of sweetness to every moment. Choose from our signature
                    flavors or request a custom creation—because every special
                    occasion deserves a delicious treat.
                  </p>
                </div>

                {/* Images — back overflows card top, front stays inside card */}
                <div className="relative h-[300px] md:h-[440px]" style={{ overflow: "visible" }}>
                  {/* Back image — pokes above the card top-right corner */}
                  <div
                    className="absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      top: "-22px",
                      right: "10px",
                      width: "220px",
                      transform: "rotate(7deg)",
                      zIndex: 1,
                    }}
                  >
                    <Image
                      src="/assets/catering1.webp"
                      alt="Catering cupcake display"
                      width={220}
                      height={270}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Front image — lower area, fully inside card bottom */}
                  <div
                    className="absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      bottom: "12px",
                      right: "55px",
                      width: "260px",
                      transform: "rotate(-6deg)",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src="/assets/catering2.webp"
                      alt="Custom catering treats"
                      width={260}
                      height={295}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOCIAL MEDIA ─────────────────────────────────────── */}
        <section className="relative pt-28 pb-28 md:pt-32 md:pb-32" style={{ backgroundImage: "url('/assets/fondo_rosado2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>

          {/* Cloud top divider */}
          <svg aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "70px", pointerEvents: "none", display: "block" }}>
            <path d="M0,0 L1440,0 L1440,45 Q1400,70 1360,45 Q1320,70 1280,45 Q1240,65 1200,45 Q1160,70 1120,45 Q1080,65 1040,45 Q1000,70 960,45 Q920,65 880,45 Q840,70 800,45 Q760,65 720,45 Q680,70 640,45 Q600,65 560,45 Q520,70 480,45 Q440,65 400,45 Q360,70 320,45 Q280,65 240,45 Q200,70 160,45 Q120,65 80,45 Q40,70 0,45 Z" fill="white"/>
          </svg>

          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div className="text-center mb-10">
              <h2 className="leading-tight mb-2">
                <span className="follow">Follow Us on </span> <br></br>
                <span className="social">Social Media</span>
              </h2>
              <div className="flex justify-center mb-4">
                <img
                  src="/assets/fondo_titulos.webp"
                  alt=""
                  width={300}
                  height={30}
                  style={{ height: "12px", width: "auto" }}
                />
              </div>
              <p
                className="font-raleway text-[15px] font-medium max-w-[500px] mx-auto leading-relaxed"
                style={{ color: "#87143D" }}
              >
                Follow us for the latest flavors, exclusive treats, and
                behind-the-scenes moments.
              </p>
            </div>

            <VideoSlider />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/smallcakessnellville/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 font-raleway font-bold text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#F8FAFC", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@smallcakesgwinnett"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 font-raleway font-bold text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#F8FAFC", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.53a8.22 8.22 0 004.8 1.52V6.6a4.85 4.85 0 01-1.03-.09z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>

          {/* Cloud bottom divider */}
          <svg aria-hidden="true" viewBox="0 0 1440 70" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "70px", pointerEvents: "none", display: "block" }}>
            <path d="M0,70 L1440,70 L1440,25 Q1400,0 1360,25 Q1320,0 1280,25 Q1240,5 1200,25 Q1160,0 1120,25 Q1080,5 1040,25 Q1000,0 960,25 Q920,5 880,25 Q840,0 800,25 Q760,5 720,25 Q680,0 640,25 Q600,5 560,25 Q520,0 480,25 Q440,5 400,25 Q360,0 320,25 Q280,5 240,25 Q200,0 160,25 Q120,5 80,25 Q40,0 0,25 Z" fill="white"/>
          </svg>
        </section>

        {/* ─── APP DOWNLOAD ──────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "56px", overflowX: "hidden" }}>
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div
              className="relative rounded-3xl"
              style={{
                backgroundImage: "url(/assets/banner_rojo.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-3xl" style={{ background: "rgba(100, 10, 38, 0.84)" }} />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[55%_45%] gap-0">
                {/* Phone — first on mobile (top), right column on desktop */}
                <div className="order-first md:order-last relative flex items-center md:items-end justify-center pt-8 pb-2 md:pt-0 md:pb-8" style={{ overflow: "visible" }}>
                  <Image
                    src="/assets/mockup_app.webp"
                    alt="Smallcakes mobile app"
                    width={420}
                    height={520}
                    className="object-contain drop-shadow-2xl md:-mt-20 max-h-[260px] md:max-h-[520px] w-auto"
                  />
                </div>

                {/* Text + buttons — second on mobile, left column on desktop */}
                <div className="order-last md:order-first px-6 md:px-14 py-8 md:py-16 flex flex-col justify-center">
                  <h2 className="leading-snug mb-5">
                    <span className="app block">Download the App</span>
                    <span className="appp block">And Sweeten Your Day</span>
                  </h2>
                  <p className="font-raleway text-white text-[15px] font-medium leading-relaxed mb-5 max-w-[420px]">
                    Don&#39;t wait any longer to enjoy all the benefits. Download our app today
                    from your app store and start enjoying a world of flavor at your fingertips!
                  </p>
                  <ul className="font-raleway text-white text-[15px] font-medium mb-8 space-y-2.5">
                    {[
                      "Get rewards with every purchase",
                      "Order ahead – never miss your favorite flavor",
                      "Get perks – discounts and more",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(227,41,115,0.30)" }}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.tryperdiem.wh.smallcakesgwinnett"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 font-raleway font-bold text-[15px] text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", padding: "12px 28px", boxShadow: "0 4px 14px rgba(227,41,115,0.25)" }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84 1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
                      </svg>
                      For Android
                    </a>
                    <a
                      href="https://apps.apple.com/us/app/smallcakes-gwinnett/id6479643804"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 font-raleway font-bold text-[15px] text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", padding: "12px 28px", boxShadow: "0 4px 14px rgba(227,41,115,0.25)" }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      For Apple
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LOCATIONS ────────────────────────────────────────── */}
        <section id="locations" className="py-16 md:py-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url('/assets/fondo_1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">

            {/* Header: large icon + two-line title */}
            <div className="text-center mb-12">
              <Image
                src="/assets/icono_helado.webp"
                alt=""
                width={90}
                height={90}
                className="object-contain mx-auto mb-4 animate-float"
              />
              <h2 className="font-boorsok font-normal uppercase leading-tight animate-fade-in-up"
                style={{
                  color: "#E32973",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  WebkitTextStrokeWidth: "1.5px",
                  WebkitTextStrokeColor: "#FFF",
                  textShadow: "0px 2.64px 7.92px rgba(135,20,61,0.30)",
                }}
              >
                Find Happiness<br />At Our 2 Locations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  img: "/assets/location_snellville.webp",
                  alt: "Snellville location",
                  city: "Snellville",
                  address: "The Shoppes at Webb Gin, 1350 Scenic Hwy N Ste 824, Snellville, GA",
                  addressNoWrap: false,
                  phone: "770-864-1984",
                  tel: "tel:7708641984",
                  maps: "https://maps.app.goo.gl/26KwMPiVgXg9QjCP6",
                  hours: ["Mon: Closed", "Tue–Sat: 11am – 8pm", "Sun: 12pm – 6pm"],
                },
                {
                  img: "/assets/location_buford.webp",
                  alt: "Buford location",
                  city: "Buford",
                  address: "The Exchange at Gwinnett, 2925 Buford Dr Ste 1220, Buford, GA",
                  addressNoWrap: false,
                  phone: "770-224-8033",
                  tel: "tel:7702248033",
                  maps: "https://maps.app.goo.gl/PoD4RbJCaJXX96ho6",
                  hours: ["Mon: Closed", "Tue–Thu: 11am – 8pm", "Fri–Sat: 11am – 9pm", "Sun: 12pm – 6pm"],
                },
              ].map((loc) => (
                <div key={loc.city} className="flex flex-col rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-brand-light group">
                  <div className="relative h-[240px] md:h-[280px] overflow-hidden">
                    <Image
                      src={loc.img}
                      alt={loc.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-6 bg-white flex flex-col">
                    {/* City name */}
                    <h3
                      className="font-boorsok uppercase mb-4"
                      style={{ fontSize: "24px", color: "#E32973", fontWeight: 400 }}
                    >
                      {loc.city}
                    </h3>

                    {/* Address with pin icon */}
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#E32973" }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span
                        className={`font-raleway font-bold${loc.addressNoWrap ? " whitespace-nowrap" : ""}`}
                        style={{ fontSize: "13px", fontWeight: 700, color: "#9F363A", lineHeight: "1.6" }}
                      >
                        {loc.address}
                      </span>
                    </div>

                    {/* Phone with icon */}
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 shrink-0" style={{ color: "#E32973" }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <a
                        href={loc.tel}
                        className="font-raleway font-bold"
                        style={{ fontSize: "14px", fontWeight: 700, color: "#9F363A" }}
                      >
                        {loc.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-2 mb-5">
                      <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#E32973" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex flex-col gap-0.5">
                        {loc.hours.map((h) => (
                          <span key={h} className="font-raleway font-bold" style={{ fontSize: "13px", color: "#9F363A", lineHeight: "1.5" }}>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={loc.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 font-raleway font-bold text-[14px] uppercase tracking-wide py-3 rounded-full text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#F8FAFC", boxShadow: "0 4px 12px rgba(227,41,115,0.25)" }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Open In Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WINNERS ──────────────────────────────────────────── */}
        <section
          className="pt-14 pb-0 text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.82)), url('/assets/fondo_winners.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">

            {/* Title with circular dot decorations */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#bd1957" }} />
                  <span className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: "#bd1957" }} />
                </span>
                <p
                  className="font-boorsok font-normal uppercase"
                  style={{ fontSize: "clamp(28px, 4vw, 38px)", color: "#bd1957", letterSpacing: "1px" }}
                >
                  Winners for{" "}
                  <strong style={{ color: "#bd1957", letterSpacing: "2px", fontWeight: 400 }}>
                    8 years
                  </strong>
                </p>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border-2" style={{ borderColor: "#bd1957" }} />
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#bd1957" }} />
                </span>
              </div>
              <img src="/assets/fondo_titulos.webp" alt="" style={{ height: "12px", width: "auto" }} />
            </div>

            {/* Award badges image */}
            <img
              src="/assets/fondo_reseñas.webp"
              alt="Best of Gwinnett Award Winners"
              width={2030}
              height={1042}
              className="w-full"
              style={{ display: "block" }}
            />
          </div>
        </section>

        {/* ─── PRESS / BUZZ ─────────────────────────────────────── */}
        <section className="py-14 md:py-16 bg-white">
          {/* Title — centered, constrained */}
          <div className="max-w-[1100px] mx-auto mb-10 px-4 md:px-0 flex flex-col items-center gap-3">
            <h2
              className="font-boorsok font-normal text-brand uppercase text-center"
              style={{ fontSize: "clamp(28px, 4vw, 38px)", lineHeight: "1.1" }}
            >
              The Buzz About Our Brand
            </h2>
            <img src="/assets/fondo_titulos.webp" alt="" style={{ height: "12px", width: "auto" }} />
            <p className="font-raleway font-medium text-[15px] text-center max-w-[420px] leading-relaxed" style={{ color: "#87143D" }}>
              Recognized by top publications nationwide.
            </p>
          </div>

          {/* Infinite marquee — full viewport width */}
          <div className="overflow-hidden w-full">
            <div
              className="animate-marquee flex items-center"
              style={{ width: "max-content" }}
            >
              {[...pressLogos, ...pressLogos, ...pressLogos, ...pressLogos].map((logo, i) => (
                <div key={i} className="mx-12 flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={80}
                    className="object-contain h-[72px] w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
