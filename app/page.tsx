import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import ScrollDownButton from "./components/ScrollDownButton";
import HeroVideo from "./components/HeroVideo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, InstagramLogoIcon, TiktokLogoIcon, CheckIcon, AndroidLogoIcon, AppleLogoIcon, MapPinIcon, PhoneIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";

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

            <h1 className="letras uppercase mb-4 animate-fade-in-up delay-100" style={{ fontSize: "clamp(32px, 5.5vw, 68px)", lineHeight: "1.1" }}>
              Home of the<br />Smallcakes Smash
            </h1>
            <p
              className="font-raleway capitalize mb-8 animate-fade-in-up delay-200"
              style={{
                color: "#FDE6F2",
                fontSize: "clamp(18px, 2.5vw, 22px)",
                fontWeight: 900,
                WebkitTextStrokeWidth: "0.8px",
                WebkitTextStrokeColor: "#FDE6F2",
                textShadow: "0px 1px 6px rgba(253,230,242,0.5)",
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

          </div>

          <div style={{ position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)", zIndex: 25 }}>
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
          <div className="max-w-[960px] mx-auto px-4 md:px-6">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 animate-fade-in-up">
              <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-brand-dark animate-pulse" />
                <div className="w-4 h-4 rounded-full border-2 border-brand" />
                <div className="w-2.5 h-2.5 rounded-full bg-brand" />
              </div>
              <h2 className="text-center leading-tight">
                <span className="hand">Handcrafted treats, </span>
                <br />
                <span className="made">Made Fresh to </span>
                <br className="md:hidden" />
                <span className="day">Brighten Your Day</span>
              </h2>
              <div className="hidden md:flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-brand" />
                <div className="w-5 h-5 rounded-full border-2 border-brand-dark" />
                <div className="w-2.5 h-2.5 rounded-full bg-brand-dark animate-pulse" />
              </div>
            </div>
            <p
              className="font-raleway font-bold text-[16px] text-center mb-8 max-w-[560px] mx-auto"
              style={{ color: "#2D0A14", lineHeight: "1.6" }}
            >
              Our gourmet cupcakes are baked fresh daily. Our small-batch ice cream is made on site. Plus, don&#39;t miss our exclusive flavors. New ones drop monthly. Taste them before they&#39;re gone!
            </p>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 font-raleway font-bold text-[15px] rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#F8FAFC", padding: "12px 32px", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
            >
              Read More About Us
              <ArrowRightIcon size={16} weight="duotone" />
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
                backgroundImage: "url(/assets/fondo_rosado.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-2xl" style={{ background: "#561d1e" }} />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[54%_46%] items-stretch gap-0">
                <div className="px-6 md:px-14 py-10 md:py-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">

                  <h2 className="leading-snug mb-5">
                    <span className="appp block">Catering &amp; Custom Treats For Every Celebration</span>
                  </h2>
                  <p
                    className="font-raleway font-bold text-white leading-relaxed max-w-[480px] md:max-w-[600px]"
                    style={{ color: "#ffffff", fontSize: "16px" }}
                  >
                    From corporate events to birthdays and weddings, our
                    homemade cupcakes and small-batch ice cream bring a touch
                    of sweetness to every moment. Choose from our signature
                    flavors or request a custom creation—because every special
                    occasion deserves a delicious treat.
                  </p>
                </div>

                {/* Images — single grid item, mobile + desktop variants inside */}
                <div className="relative h-[260px] md:h-[500px] overflow-hidden md:overflow-visible">
                  {/* Mobile: back */}
                  <div
                    className="md:hidden absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{ top: "15px", right: "calc(50% - 150px)", width: "145px", transform: "rotate(7deg)", zIndex: 1 }}
                  >
                    <Image src="/assets/catering1.webp" alt="Catering cupcake display" width={145} height={176} className="w-full h-full object-cover" />
                  </div>
                  {/* Mobile: front */}
                  <div
                    className="md:hidden absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{ bottom: "15px", left: "calc(50% - 155px)", width: "165px", transform: "rotate(-6deg)", zIndex: 2 }}
                  >
                    <Image src="/assets/catering2.webp" alt="Custom catering treats" width={165} height={188} className="w-full h-full object-cover" />
                  </div>
                  {/* Desktop: back */}
                  <div
                    className="hidden md:block absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{ top: "20px", right: "10px", width: "260px", transform: "rotate(6deg)", zIndex: 1 }}
                  >
                    <Image src="/assets/catering1.webp" alt="Catering cupcake display" width={260} height={316} className="w-full h-full object-cover" />
                  </div>
                  {/* Desktop: front */}
                  <div
                    className="hidden md:block absolute rounded-2xl overflow-hidden shadow-2xl"
                    style={{ bottom: "20px", left: "10px", width: "290px", transform: "rotate(-5deg)", zIndex: 2 }}
                  >
                    <Image src="/assets/catering2.webp" alt="Custom catering treats" width={290} height={331} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOCIAL MEDIA ─────────────────────────────────────── */}
        <section className="relative pt-28 pb-28 md:pt-32 md:pb-32" style={{ backgroundImage: "url('/assets/fondo_rosado2.png')", backgroundSize: "cover", backgroundPosition: "center" }}>

          {/* Cloud top divider */}
          <svg aria-hidden="true" viewBox="0 0 1440 56" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "56px", zIndex: 10, pointerEvents: "none", display: "block" }}>
            <path d="M0,0 L1440,0 L1440,28 Q1404,56 1368,28 Q1332,56 1296,28 Q1260,56 1224,28 Q1188,56 1152,28 Q1116,56 1080,28 Q1044,56 1008,28 Q972,56 936,28 Q900,56 864,28 Q828,56 792,28 Q756,56 720,28 Q684,56 648,28 Q612,56 576,28 Q540,56 504,28 Q468,56 432,28 Q396,56 360,28 Q324,56 288,28 Q252,56 216,28 Q180,56 144,28 Q108,56 72,28 Q36,56 0,28 Z" fill="white"/>
          </svg>

          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div className="text-center mb-10">
              <h2 className="leading-tight mb-2">
                <span className="follow">Follow Us on </span> <br></br>
                <span className="social">Social Media</span>
              </h2>
             
              <p
                className="font-raleway text-[16px] font-bold max-w-[500px] mx-auto leading-relaxed"
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
                <InstagramLogoIcon size={20} weight="duotone" />
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@smallcakesgwinnett"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 font-raleway font-bold text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", color: "#F8FAFC", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
              >
                <TiktokLogoIcon size={20} weight="duotone" />
                TikTok
              </a>
            </div>
          </div>

          {/* Cloud bottom divider */}
          <svg aria-hidden="true" viewBox="0 0 1440 56" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "56px", zIndex: 10, pointerEvents: "none", display: "block" }}>
            <path d="M0,56 L0,28 Q36,0 72,28 Q108,0 144,28 Q180,0 216,28 Q252,0 288,28 Q324,0 360,28 Q396,0 432,28 Q468,0 504,28 Q540,0 576,28 Q612,0 648,28 Q684,0 720,28 Q756,0 792,28 Q828,0 864,28 Q900,0 936,28 Q972,0 1008,28 Q1044,0 1080,28 Q1116,0 1152,28 Q1188,0 1224,28 Q1260,0 1296,28 Q1332,0 1368,28 Q1404,0 1440,28 L1440,56 Z" fill="white"/>
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
                    <span className="app md:block">Download the App </span>
                    <span className="appp md:block">And Sweeten Your Day</span>
                  </h2>
                  <p className="font-raleway text-white text-[16px] font-bold leading-relaxed mb-5 max-w-[420px]">
                    Don&#39;t wait any longer to enjoy all the benefits. Download our app today
                    from your app store and start enjoying a world of flavor at your fingertips!
                  </p>
                  <ul className="font-raleway text-white text-[16px] font-bold mb-8 space-y-2.5">
                    {[
                      "Get rewards with every purchase",
                      "Order ahead – never miss your favorite flavor",
                      "Get perks – discounts and more",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(227,41,115,0.30)" }}>
                          <CheckIcon size={12} weight="duotone" className="text-white" />
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
                      <AndroidLogoIcon size={20} weight="duotone" />
                      For Android
                    </a>
                    <a
                      href="https://apps.apple.com/us/app/smallcakes-gwinnett/id6479643804"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 font-raleway font-bold text-[15px] text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", padding: "12px 28px", boxShadow: "0 4px 14px rgba(227,41,115,0.25)" }}
                    >
                      <AppleLogoIcon size={20} weight="duotone" />
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
                  fontSize: "clamp(32px, 5vw, 42px)",
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
                      <MapPinIcon size={16} weight="duotone" className="mt-0.5 shrink-0" style={{ color: "#E32973" }} />
                      <span
                        className={`font-raleway font-bold${loc.addressNoWrap ? " whitespace-nowrap" : ""}`}
                        style={{ fontSize: "13px", fontWeight: 700, color: "#9F363A", lineHeight: "1.6" }}
                      >
                        {loc.address}
                      </span>
                    </div>

                    {/* Phone with icon */}
                    <div className="flex items-center gap-2 mb-2">
                      <PhoneIcon size={16} weight="duotone" className="shrink-0" style={{ color: "#E32973" }} />
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
                      <ClockIcon size={16} weight="duotone" className="mt-0.5 shrink-0" style={{ color: "#E32973" }} />
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
                      <MapPinIcon size={16} weight="duotone" />
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
                  style={{ fontSize: "clamp(32px, 4vw, 42px)", color: "#bd1957", letterSpacing: "1px" }}
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
              style={{ fontSize: "clamp(32px, 4vw, 42px)", lineHeight: "1.1" }}
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
