"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  const inputBase =
    "w-full font-raleway text-[15px] text-brand-text bg-white border border-[#F4C3D0] rounded-md px-4 py-3 outline-none focus:border-brand transition-colors placeholder:text-brand-text/40";
  const labelBase = "block font-raleway text-[15px] text-brand-text mb-1.5";

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-soft to-white py-20 md:py-28">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6 text-center">
            <h1 className="font-boorsok text-[40px] md:text-[47px] text-brand leading-[1.1]">
              Contact Us
            </h1>
            <p className="font-raleway text-[16px] md:text-[18px] text-brand-text font-light mt-4 max-w-[380px] mx-auto leading-relaxed">
              We&apos;d love to hear from you — let&apos;s keep it sweet and simple.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: Info */}
              <div>
                <h2 className="font-boorsok text-[30px] md:text-[34px] text-brand mb-6">
                  Let&apos;s keep it,<br />sweet and simple.
                </h2>
                <p className="font-raleway text-[16px] text-brand-text leading-[24px] mb-8">
                  Have a question about our menu, a custom order inquiry, or just want to say hello? Reach out and we&apos;ll get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                  {/* Snellville */}
                  <div>
                    <h3 className="font-boorsok text-[20px] text-brand-medium mb-2">Snellville</h3>
                    <p className="font-raleway text-[15px] text-brand-text leading-relaxed">
                      1350 Scenic Hwy N, Suite 824<br />
                      Snellville, GA
                    </p>
                    <a href="tel:7708641984" className="font-raleway font-bold text-[15px] text-brand hover:text-brand-dark transition-colors mt-1 block">
                      770-864-1984
                    </a>
                  </div>

                  {/* Buford */}
                  <div>
                    <h3 className="font-boorsok text-[20px] text-brand-medium mb-2">Buford</h3>
                    <p className="font-raleway text-[15px] text-brand-text leading-relaxed">
                      2925 Buford Dr, Suite 1220<br />
                      Buford, GA
                    </p>
                    <a href="tel:7702248033" className="font-raleway font-bold text-[15px] text-brand hover:text-brand-dark transition-colors mt-1 block">
                      770-224-8033
                    </a>
                  </div>

                  {/* Social */}
                  <div>
                    <h3 className="font-boorsok text-[20px] text-brand-medium mb-3">Follow Us</h3>
                    <div className="flex gap-4">
                      {[
                        { href: "https://www.instagram.com/smallcakessnellville/", label: "Instagram" },
                        { href: "https://www.tiktok.com/@smallcakesgwinnett", label: "TikTok" },
                        { href: "https://www.facebook.com/SmallcakesCupcakeryAndCreamery/", label: "Facebook" },
                      ].map(({ href, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                          className="font-raleway font-bold text-[14px] text-brand hover:text-brand-dark underline transition-colors">
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="bg-[#FCFCFC] border border-[#EFEFEF] rounded-lg shadow-[1px_2px_16px_0px_rgba(245,211,212,0.30)] p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-boorsok text-[26px] text-brand">Message Sent!</h3>
                    <p className="font-raleway text-[16px] text-brand-text max-w-[280px] leading-relaxed">
                      Thanks for reaching out. We&apos;ll get back to you shortly. 🧁
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className={labelBase}>
                          First Name <span className="text-brand">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Jane"
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelBase}>
                          Last Name <span className="text-brand">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className={inputBase}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className={labelBase}>
                        Email <span className="text-brand">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelBase}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className={labelBase}>
                        Message <span className="text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className={`${inputBase} resize-none`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full text-white font-raleway font-bold text-[16px] uppercase tracking-wider py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                      style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
