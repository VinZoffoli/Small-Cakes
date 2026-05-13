import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{ height: "400px" }}
        >
          <Image
            src="/assets/hero_aboutus.webp"
            alt="Smallcakes storefront"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
           

            <Image
              src="/assets/icono_hero_about.webp"
              alt=""
              width={72}
              height={72}
              className="object-contain mb-3 animate-fade-in-up"
              aria-hidden="true"
            />
            <h1
              className="font-boorsok uppercase animate-fade-in-up"
              style={{
                fontSize: "clamp(44px, 7vw, 68px)",
                color: "#E32973",
                WebkitTextStrokeWidth: "1.5px",
                WebkitTextStrokeColor: "#FFF",
                textShadow: "0px 2px 8px rgba(135,20,61,0.35)",
                lineHeight: "1.1",
              }}
            >
              About Us
            </h1>
          </div>

          {/* Scalloped bottom edge */}
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

        {/* ─── QUALITY, CREATIVITY, AND COMMUNITY ──────────────── */}
        <section
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #fff0f6 45%, #fff0f6 55%, #ffffff 100%)" }}
        >
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

              {/* Left: text */}
              <div className="animate-fade-in-up">
                {/* Icon circle */}
                <div
                  className="w-24 h-24 rounded-full relative overflow-hidden"
                  style={{ border: "2px dashed rgba(227,41,115,0.45)" }}
                >
                  <Image src="/assets/icono_cupcake.webp" alt="" fill className="object-contain" />
                </div>

                {/* Title overlaps bottom of the icon */}
                <h2
                  className="font-boorsok uppercase relative z-10 -mt-4 mb-5"
                  style={{
                    fontSize: "clamp(22px, 3vw, 30px)",
                    color: "#E32973",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    textShadow: "0px 2.64px 7.92px rgba(135, 20, 61, 0.40)",
                    WebkitTextStrokeWidth: "0.6px",
                    WebkitTextStrokeColor: "#FFF",
                    lineHeight: "38.28px",
                  }}
                >
                  Quality, Creativity,<br />And Community
                </h2>

                <p className="font-raleway text-[15px] leading-relaxed mb-4" style={{ color: "#87143D" }}>
                  At Smallcakes, we believe every bite should bring joy. That&apos;s why we{" "}
                  <strong>bake fresh, handcrafted cupcakes</strong> and small-batch ice cream daily,{" "}
                  <strong>using only the finest ingredients.</strong> From nostalgic favorites to fun, new
                  flavors, every treat is handmade with care, combining quality, creativity, and a love for
                  our community.
                </p>
                <p className="font-raleway text-[15px] leading-relaxed mb-7" style={{ color: "#87143D" }}>
                  Whether it&apos;s a birthday, a wedding, or just a sweet craving,{" "}
                  <strong>we&apos;re here to make your moments even better.</strong>
                </p>
                <Link
                  href="/#locations"
                  className="inline-flex items-center gap-2 font-raleway font-bold text-[14px] uppercase tracking-wide px-7 py-3 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                    boxShadow: "0 4px 14px rgba(227,41,115,0.28)",
                  }}
                >
                  See Locations On Maps
                </Link>
              </div>

              {/* Right: 1 tall left + 2 stacked right */}
              <div className="flex gap-3 animate-fade-in-up" style={{ height: "380px" }}>
                <div className="w-1/2 relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/assets/about1.jpg"
                    alt="About 1"
                    className="absolute inset-0 scale-115 w-full h-full object-cover hover:scale-125 transition-transform duration-500"
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                  <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/assets/about2.webp"
                      alt="About 2"
                      className="absolute inset-0 scale-115 w-full h-full object-cover hover:scale-125 transition-transform duration-500"
                      style={{ objectPosition: "center 30%" }}
                    />
                  </div>
                  <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="/assets/about3.webp"
                      alt="About 3"
                      className="absolute inset-0 scale-115 w-full h-full object-cover hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOLD OUT NOTICE ──────────────────────────────────── */}
        <section
          className="relative py-20"
          style={{ background: "linear-gradient(180deg, #fff0f6 0%, #fde8f3 50%, #fff0f6 100%)" }}
        >
          {/* Wavy top */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 40"
            preserveAspectRatio="xMidYMin slice"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "40px", display: "block", pointerEvents: "none" }}
          >
            <path
              d="M0,0 L1440,0 L1440,20 Q1404,40 1368,20 Q1332,0 1296,20 Q1260,40 1224,20 Q1188,0 1152,20 Q1116,40 1080,20 Q1044,0 1008,20 Q972,40 936,20 Q900,0 864,20 Q828,40 792,20 Q756,0 720,20 Q684,40 648,20 Q612,0 576,20 Q540,40 504,20 Q468,0 432,20 Q396,40 360,20 Q324,0 288,20 Q252,40 216,20 Q180,0 144,20 Q108,40 72,20 Q36,0 0,20 Z"
              fill="white"
            />
          </svg>

          <div className="max-w-[1100px] mx-auto px-4 md:px-0 flex justify-center">
            <div
              className="relative w-full max-w-[720px] bg-white rounded-3xl px-5 sm:px-10 py-8 sm:py-10 shadow-md"
              style={{ border: "1.5px solid rgba(227,41,115,0.18)", boxShadow: "0 8px 32px rgba(227,41,115,0.08)" }}
            >
              <h2
                className="font-boorsok uppercase mb-4"
                style={{ fontSize: "clamp(20px, 2.5vw, 26px)", color: "#E32973" }}
              >
                Sold Out Notice
              </h2>
              <p className="font-raleway text-[14px] leading-relaxed" style={{ color: "#87143D" }}>
                We strive to ensure that we have enough fresh products every day for all of our customers.
                In rare moments, there may be sold out days due to unforeseeable demand. Please note that if
                we sell out prior to closing times, we will post a notice on our social media pages.
              </p>

              {/* Notice icon badge */}
              <div className="absolute -bottom-8 right-8">
                <Image src="/assets/icono_notice.webp" alt="" width={64} height={64} className="object-contain drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Wavy bottom */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 40"
            preserveAspectRatio="xMidYMax slice"
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "40px", display: "block", pointerEvents: "none" }}
          >
            <path
              d="M0,40 L1440,40 L1440,20 Q1404,0 1368,20 Q1332,40 1296,20 Q1260,0 1224,20 Q1188,40 1152,20 Q1116,0 1080,20 Q1044,40 1008,20 Q972,0 936,20 Q900,40 864,20 Q828,0 792,20 Q756,40 720,20 Q684,0 648,20 Q612,40 576,20 Q540,0 504,20 Q468,40 432,20 Q396,0 360,20 Q324,40 288,20 Q252,0 216,20 Q180,40 144,20 Q108,0 72,20 Q36,40 0,20 Z"
              fill="white"
            />
          </svg>
        </section>

        {/* ─── DELICIOUS TREATS FOR EVERY OCCASION ─────────────── */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">

              {/* Left: bento asymmetric grid */}
              <div className="flex gap-3 animate-fade-in-up" style={{ height: "440px" }}>
                {/* Left column: small top, large bottom */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ flex: "0.65" }}>
                    <img
                      src="/assets/about4.webp"
                      alt="Treat 1"
                      className="absolute inset-0 w-full h-full object-cover scale-115 hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ flex: "1.35" }}>
                    <img
                      src="/assets/about6.webp"
                      alt="Treat 3"
                      className="absolute inset-0 w-full h-full object-cover scale-115 hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                </div>
                {/* Right column: large top, small bottom */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ flex: "1.35" }}>
                    <img
                      src="/assets/about5.webp"
                      alt="Treat 2"
                      className="absolute inset-0 w-full h-full object-cover scale-115 hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ flex: "0.65" }}>
                    <img
                      src="/assets/about7.webp"
                      alt="Treat 4"
                      className="absolute inset-0 w-full h-full object-cover scale-115 hover:scale-125 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right: text */}
              <div className="animate-fade-in-up">
                <h2
                  className="font-boorsok uppercase leading-tight mb-6"
                  style={{
                    fontSize: "clamp(24px, 3.2vw, 34px)",
                    color: "#E32973",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    textShadow: "0px 2.64px 7.92px rgba(135, 20, 61, 0.40)",
                    WebkitTextStrokeWidth: "0.6px",
                    WebkitTextStrokeColor: "#FFF",
                    lineHeight: "1.25",
                  }}
                >
                  Delicious Treats for<br />Every Occasion
                </h2>
                <p className="font-raleway text-[15px] leading-relaxed mb-4" style={{ color: "#87143D" }}>
                  Our menu changes daily, bringing you a{" "}
                  <strong>rotating selection of gourmet cupcakes and creamy ice creams.</strong>
                </p>
                <p className="font-raleway text-[15px] leading-relaxed mb-7" style={{ color: "#87143D" }}>
                  Need something special?{" "}
                  <strong>We create custom cupcakes</strong>, cakes, and desserts for any celebration.
                  Whether it&apos;s an elegant wedding or a fun-themed party, we&apos;ll bring your vision
                  to life—one sweet bite at a time.
                </p>
                <a
                  href="https://www.smallcakesgwinnettshop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-raleway font-bold text-[14px] uppercase tracking-wide px-7 py-3 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                    boxShadow: "0 4px 14px rgba(227,41,115,0.28)",
                  }}
                >
                  Order Today
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── JOIN THE TEAM ────────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white" style={{ overflowX: "hidden" }}>
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div
              className="relative rounded-2xl text-center py-16 px-8"
              style={{
                backgroundImage: "url(/assets/banner_azul.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-2xl" style={{ background: "rgba(14,36,45,0.82)" }} />
              <div className="relative z-10 max-w-[560px] mx-auto">
                <h2 className="cate mb-3">Join to the Smallcakes Team</h2>
                <p className="font-raleway text-white text-[15px] font-medium leading-relaxed mb-8">
                  Love baking and making people smile? We&apos;re always looking for passionate, hardworking
                  team members. Click the link below to apply and be part of something sweet!
                </p>
                <a
                  href="https://www.indeed.com/cmp/Smallcakes-Snellville-1/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-raleway font-bold text-[14px] uppercase tracking-wide px-8 py-3.5 rounded-full text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                    boxShadow: "0 4px 20px rgba(227,41,115,0.35)",
                  }}
                >
                  Work With Us
                </a>
              </div>
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
            <img
              src="/assets/fondo_reseñas.webp"
              alt="Best of Gwinnett Award Winners"
              className="w-full"
              style={{ display: "block" }}
            />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
