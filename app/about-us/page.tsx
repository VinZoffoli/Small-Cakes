import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft to-white py-20 md:py-28">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-4">
            <Image
              src="/assets/icono_hero_about.webp"
              alt=""
              width={90}
              height={90}
              className="object-contain h-[80px] w-auto"
              aria-hidden="true"
            />
            <h1 className="font-boorsok text-[40px] md:text-[47px] text-brand leading-[1.1]">
              Quality, Creativity,<br />And Community
            </h1>
            <p className="font-raleway text-[16px] md:text-[18px] text-brand-text font-light max-w-[460px] leading-relaxed">
              Every bite should bring joy — that&apos;s what we believe at Smallcakes Gwinnett.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-boorsok text-[32px] md:text-[36px] text-brand mb-6">
                  Our Story
                </h2>
                <p className="font-raleway text-[16px] text-brand-text leading-[24px] mb-5">
                  At Smallcakes Gwinnett, we&apos;re passionate about crafting gourmet cupcakes and small batch ice cream that bring a smile to your face with every single bite. Our team bakes fresh every day using premium ingredients, ensuring consistent quality that has earned us recognition year after year.
                </p>
                <p className="font-raleway text-[16px] text-brand-text leading-[24px] mb-5">
                  We believe desserts aren&apos;t just food — they&apos;re moments. Birthdays, weddings, corporate celebrations, or just a Tuesday treat — we&apos;re here to make them sweeter.
                </p>
                <p className="font-raleway text-[16px] text-brand-text leading-[24px]">
                  When a flavor sells out, we&apos;ll let you know through our social media rather than keep you guessing. Transparency and quality are the cornerstones of everything we do.
                </p>
              </div>
              <div className="bg-brand-soft rounded-lg p-8 border border-brand-light">
                <div className="space-y-6">
                  {[
                    {
                      title: "Daily Freshness",
                      body: "Every cupcake is baked fresh each morning with meticulous attention to quality and consistency.",
                    },
                    {
                      title: "Premium Ingredients",
                      body: "We source only the finest ingredients — because great cupcakes start with great components.",
                    },
                    {
                      title: "Community First",
                      body: "Serving Snellville and Buford, we're proud to be part of the Gwinnett community.",
                    },
                    {
                      title: "Award-Winning",
                      body: "8 consecutive years of recognition from cupcake enthusiasts and industry publications alike.",
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="bg-white rounded-lg p-5 border border-brand-light shadow-sm">
                      <h3 className="font-boorsok text-[20px] text-brand-medium mb-2">{title}</h3>
                      <p className="font-raleway text-[15px] text-brand-text leading-snug">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sold Out Notice */}
        <section className="py-16 bg-brand-soft">
          <div className="max-w-[700px] mx-auto px-4 md:px-6 text-center">
            <h2 className="font-boorsok text-[28px] md:text-[32px] text-brand mb-5">
              Sold Out Notice
            </h2>
            <p className="font-raleway text-[16px] text-brand-text leading-[24px] mb-4">
              We strive to ensure that we have enough fresh products every day, but some days our most popular flavors sell out quickly. We&apos;ll always communicate sold-out situations via our social media channels so you&apos;re never caught off guard.
            </p>
            <p className="font-raleway text-[16px] text-brand-text leading-[24px]">
              Follow us on Instagram or TikTok to stay up to date on daily availability.
            </p>
          </div>
        </section>

        {/* Custom Orders */}
        <section className="py-20 bg-aqua-deeper text-white">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6 text-center">
            <h2 className="font-boorsok text-[30px] md:text-[34px] text-aqua mb-2">
              Delicious Treats
            </h2>
            <p className="font-boorsok text-[26px] md:text-[30px] text-aqua-light mb-6">
              for Every Occasion
            </p>
            <p className="font-raleway text-[16px] text-aqua-pale font-light leading-relaxed max-w-[580px] mx-auto mb-10">
              Planning a wedding, birthday, corporate event, or any celebration? We create custom cupcake towers, themed designs, and full dessert experiences tailored to your vision.
            </p>
            <a
              href="https://www.smallcakesgwinnettshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-raleway font-bold text-[15px] uppercase tracking-wide px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
            >
              Order Today
            </a>
          </div>
        </section>

        {/* Join the Team */}
        <section className="py-20 bg-white">
          <div className="max-w-[700px] mx-auto px-4 md:px-6 text-center">
            <h2 className="font-boorsok text-[28px] md:text-[32px] text-brand mb-5 uppercase tracking-wide">
              Join the Smallcakes Team
            </h2>
            <p className="font-raleway text-[16px] text-brand-text leading-[24px] mb-8">
              Love baking and making people smile? We&apos;re always looking for passionate, dedicated team members who share our commitment to quality and community. Come be part of something sweet.
            </p>
            <a
              href="https://www.indeed.com/cmp/Smallcakes-Snellville-1/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-raleway font-bold text-[15px] uppercase tracking-wide px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
            >
              Work With Us
            </a>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 bg-brand-soft text-center">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6">
            <h2 className="font-boorsok text-[32px] md:text-[36px] text-brand mb-3">
              Winners for 8 Years
            </h2>
            <p className="font-raleway text-[16px] text-brand-text mb-10 max-w-[440px] mx-auto leading-relaxed">
              Recognized by USA Today, Business Insider, and cupcake enthusiasts nationwide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                  <Image
                    src={`/assets/client-${n}.webp`}
                    alt={`Press feature ${n}`}
                    width={120}
                    height={50}
                    className="object-contain h-[40px] w-auto"
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
