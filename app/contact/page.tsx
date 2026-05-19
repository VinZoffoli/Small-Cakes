"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

// ── Zod schema ────────────────────────────────────────────────────────────
const INQUIRY_TYPES = [
  "General Inquiry",
  "Custom Order",
  "Catering",
  "Feedback",
  "Other",
] as const;

const contactSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "At least 2 characters required")
      .max(50, "Name is too long")
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Please use letters only"),
    lastName: z
      .string()
      .min(2, "At least 2 characters required")
      .max(50, "Name is too long")
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Please use letters only"),
    phone: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          /^\+?1?\s?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
            val.replace(/\s/g, "")
          ),
        "Please enter a valid US phone number"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    inquiryType: z.enum(INQUIRY_TYPES, {
      message: "Please select an inquiry type",
    }),
    specialRequests: z
      .array(
        z.object({
          value: z.string().min(1, "Cannot be empty").max(100, "Too long"),
        })
      )
      .optional(),
    message: z
      .string()
      .min(10, "Please write at least 10 characters")
      .max(1000, "Max 1,000 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.inquiryType === "Custom Order" && data.message.length < 30) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message:
          "Custom orders need more detail — please write at least 30 characters",
      });
    }
    if (data.inquiryType === "Catering" && !data.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Phone number is required for catering inquiries",
      });
    }
  });

type ContactFormData = z.infer<typeof contactSchema>;

// ── Shared style helpers ──────────────────────────────────────────────────
const inputBase =
  "w-full font-raleway text-[15px] bg-white border rounded-xl px-4 py-3 outline-none transition-all duration-200 placeholder:text-[#87143D]/30";

const inputClass = (hasError: boolean) =>
  [
    inputBase,
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-[rgba(227,41,115,0.22)] focus:border-brand focus:ring-2 focus:ring-[rgba(227,41,115,0.1)]",
  ].join(" ");

const labelClass =
  "block font-raleway font-bold text-[13px] uppercase tracking-wider mb-1.5";
const labelStyle = { color: "#87143D" };

// ── Field error ───────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 font-raleway text-[12px] text-red-500 flex items-center gap-1.5">
      <svg
        className="w-3.5 h-3.5 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 3.5a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 4.5zm0 6.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
      </svg>
      {message}
    </p>
  );
}

// ── Custom dropdown ───────────────────────────────────────────────────────
function CustomSelect({
  value,
  onChange,
  onBlur,
  hasError,
  options,
  placeholder = "Select a topic…",
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  hasError: boolean;
  options: readonly string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const borderColor = hasError
    ? "border-red-400"
    : open
    ? "border-brand ring-2 ring-[rgba(227,41,115,0.1)]"
    : "border-[rgba(227,41,115,0.22)]";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onBlur={onBlur}
        onClick={() => setOpen((o) => !o)}
        className={`${inputBase} ${borderColor} cursor-pointer text-left flex items-center justify-between w-full`}
        style={{ color: value ? "#87143D" : "rgba(135,20,61,0.35)" }}
      >
        <span className="font-raleway text-[15px]">{value || placeholder}</span>
        <span
          className="flex-shrink-0 ml-2 transition-transform duration-200"
          style={{
            color: "#E32973",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl overflow-hidden z-50"
          style={{
            border: "1.5px solid rgba(227,41,115,0.2)",
            boxShadow: "0 8px 32px rgba(227,41,115,0.12)",
          }}
        >
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 font-raleway text-[15px] transition-colors duration-100"
                style={{
                  color: isSelected ? "#E32973" : "#87143D",
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected
                    ? "rgba(227,41,115,0.06)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(227,41,115,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      inquiryType: undefined,
      specialRequests: [],
      message: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specialRequests",
  });

  const inquiryType = watch("inquiryType");
  const messageValue = watch("message");
  const msgLen = messageValue?.length ?? 0;
  const isCustomOrder = inquiryType === "Custom Order";

  async function onSubmit(data: ContactFormData) {
    setSubmitError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      setSubmitError("Something went wrong. Please try again or call us directly.");
      return;
    }
    setSubmitted(true);
  }

  function handleReset() {
    reset();
    setSubmitted(false);
    setSubmitError(null);
  }

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
            src="/assets/hero_contact_mobile.webp"
            alt="Smallcakes contact"
            fill
            className="object-cover md:hidden"
            priority
          />
          <Image
            src="/assets/hero_contact.webp"
            alt="Smallcakes contact"
            fill
            className="object-cover hidden md:block"
            priority
          />
          <div className="absolute inset-0" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            
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
              Contact Us
            </h1>
          </div>

          {/* Scalloped bottom edge */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 56"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "56px",
              zIndex: 20,
              pointerEvents: "none",
              display: "block",
            }}
          >
            <path
              d="M0,56 L0,28 Q36,0 72,28 Q108,0 144,28 Q180,0 216,28 Q252,0 288,28 Q324,0 360,28 Q396,0 432,28 Q468,0 504,28 Q540,0 576,28 Q612,0 648,28 Q684,0 720,28 Q756,0 792,28 Q828,0 864,28 Q900,0 936,28 Q972,0 1008,28 Q1044,0 1080,28 Q1116,0 1152,28 Q1188,0 1224,28 Q1260,0 1296,28 Q1332,0 1368,28 Q1404,0 1440,28 L1440,56 Z"
              fill="white"
            />
          </svg>
        </section>

        {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
        <section className="py-16 md:py-20 mb-[-3px]bg-dots-white ">
          <div className="max-w-[1100px] mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* ── Left: Info ─────────────────────────────────── */}
              <div className="animate-fade-in-up flex flex-col items-center lg:items-start text-center lg:text-left">
                <div
                  className="w-20 h-20 rounded-full relative overflow-hidden"
                  style={{ border: "2px dashed rgba(227,41,115,0.45)" }}
                >
                  <Image
                    src="/assets/icono_helado.webp"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <h2
                  className="font-boorsok uppercase relative z-10 -mt-3 mb-3"
                  style={{
                    fontSize: "clamp(22px, 4vw, 42px)",
                    color: "#E32973",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    textShadow: "0px 2.64px 7.92px rgba(135,20,61,0.40)",
                    WebkitTextStrokeWidth: "0.6px",
                    WebkitTextStrokeColor: "#FFF",
                    lineHeight: "1.2",
                  }}
                >
                  Let&apos;s Keep It,
                  <br />
                  Sweet And Simple.
                </h2>
                <p
                  className="font-raleway font-bold text-[16px] leading-relaxed mb-8"
                  style={{ color: "#87143D" }}
                >
                  Have a question? Need more info?
                  <br />
                  Fill out the form and we&apos;ll be in touch soon!
                </p>

                {/* Location cards */}
                <div className="space-y-4 mb-8 w-full">
                  {[
                    {
                      city: "Snellville",
                      address:
                        "The Shoppes at Webb Gin\n1350 Scenic Hwy N, Suite 824, Snellville, GA",
                      phone: "770-864-1984",
                      tel: "tel:7708641984",
                    },
                    {
                      city: "Buford",
                      address:
                        "Mall of Georgia\n2925 Buford Dr, Suite 1220, Buford, GA",
                      phone: "770-224-8033",
                      tel: "tel:7702248033",
                    },
                  ].map(({ city, address, phone, tel }) => (
                    <div
                      key={city}
                      className="flex flex-col items-center lg:flex-row lg:items-start gap-3 lg:gap-4 bg-white rounded-2xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(227,41,115,0.13)]"
                      style={{
                        border: "1px solid rgba(227,41,115,0.13)",
                        boxShadow: "0 4px 16px rgba(227,41,115,0.06)",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center lg:mt-0.5"
                        style={{
                          background:
                            "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                        }}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.786-5.226 3.786-9.575C20.053 5.54 16.51 2 12 2S3.947 5.54 3.947 9.753c0 4.349 1.842 7.492 3.786 9.575a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 12.75a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="text-center lg:text-left">
                        <p
                          className="font-boorsok text-[24px] mb-0.5"
                          style={{ color: "#E32973" }}
                        >
                          {city}
                        </p>
                        <p
                          className="font-raleway font-bold text-[16px] leading-relaxed whitespace-pre-line"
                          style={{ color: "#87143D" }}
                        >
                          {address}
                        </p>
                        <a
                          href={tel}
                          className="font-raleway font-bold text-[16px] mt-1 block hover:opacity-75 transition-opacity"
                          style={{ color: "#E32973" }}
                        >
                          {phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex flex-col items-center lg:items-start">
                  <p
                    className="font-raleway font-bold text-[13px] uppercase tracking-wider mb-3"
                    style={{ color: "#87143D" }}
                  >
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {[
                      {
                        href: "https://www.instagram.com/smallcakessnellville/",
                        label: "Instagram",
                        icon: (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        ),
                      },
                      {
                        href: "https://www.tiktok.com/@smallcakesgwinnett",
                        label: "TikTok",
                        icon: (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.68a8.18 8.18 0 004.77 1.52V6.74a4.84 4.84 0 01-1.01-.05z" />
                          </svg>
                        ),
                      },
                      {
                        href: "https://www.facebook.com/SmallcakesCupcakeryAndCreamery/",
                        label: "Facebook",
                        icon: (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        ),
                      },
                    ].map(({ href, label, icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:shadow-md"
                        style={{
                          background:
                            "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                        }}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Right: Form ─────────────────────────────────── */}
              <div className="animate-fade-in-up delay-200">
                <div
                  className="bg-white rounded-3xl px-7 py-8 md:px-9 md:py-9"
                  style={{
                    border: "1.5px solid rgba(227,41,115,0.14)",
                    boxShadow: "0 8px 40px rgba(227,41,115,0.09)",
                  }}
                >
                  {submitted ? (
                    /* ── Success state ── */
                    <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                          boxShadow: "0 6px 24px rgba(227,41,115,0.38)",
                        }}
                      >
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3
                          className="font-boorsok uppercase mb-2"
                          style={{
                            fontSize: "clamp(22px, 3vw, 28px)",
                            color: "#E32973",
                            fontFeatureSettings: "'liga' off, 'clig' off",
                            textShadow:
                              "0px 2.64px 7.92px rgba(135,20,61,0.40)",
                            WebkitTextStrokeWidth: "0.6px",
                            WebkitTextStrokeColor: "#FFF",
                          }}
                        >
                          Message Sent!
                        </h3>
                        <p
                          className="font-raleway text-[15px] leading-relaxed max-w-[260px] mx-auto"
                          style={{ color: "#87143D" }}
                        >
                          Thanks for reaching out. We&apos;ll get back to you
                          as soon as possible.
                        </p>
                      </div>
                      <button
                        onClick={handleReset}
                        className="font-raleway font-bold text-[13px] uppercase tracking-wide px-6 py-2.5 rounded-full text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                        }}
                      >
                        Send Another
                      </button>
                    </div>
                  ) : (
                    /* ── Form ── */
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-5"
                    >
                      {/* First Name + Last Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="firstName"
                            className={labelClass}
                            style={labelStyle}
                          >
                            First Name{" "}
                            <span style={{ color: "#E32973" }}>*</span>
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder="Name"
                            className={inputClass(!!errors.firstName)}
                            style={{ color: "#87143D" }}
                            {...register("firstName")}
                          />
                          <FieldError message={errors.firstName?.message} />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className={labelClass}
                            style={labelStyle}
                          >
                            Last Name{" "}
                            <span style={{ color: "#E32973" }}>*</span>
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                            placeholder="Last Name"
                            className={inputClass(!!errors.lastName)}
                            style={{ color: "#87143D" }}
                            {...register("lastName")}
                          />
                          <FieldError message={errors.lastName?.message} />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className={labelClass}
                          style={labelStyle}
                        >
                          Phone Number
                          {inquiryType === "Catering" && (
                            <span style={{ color: "#E32973" }}> *</span>
                          )}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(555) 000-0000"
                          className={inputClass(!!errors.phone)}
                          style={{ color: "#87143D" }}
                          {...register("phone")}
                        />
                        <FieldError message={errors.phone?.message} />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className={labelClass}
                          style={labelStyle}
                        >
                          Email <span style={{ color: "#E32973" }}>*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="email@example.com"
                          className={inputClass(!!errors.email)}
                          style={{ color: "#87143D" }}
                          {...register("email")}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>

                      {/* Inquiry type — custom dropdown */}
                      <div>
                        <label className={labelClass} style={labelStyle}>
                          Inquiry Type{" "}
                          <span style={{ color: "#E32973" }}>*</span>
                        </label>
                        <Controller
                          control={control}
                          name="inquiryType"
                          render={({ field }) => (
                            <CustomSelect
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              hasError={!!errors.inquiryType}
                              options={INQUIRY_TYPES}
                            />
                          )}
                        />
                        <FieldError message={errors.inquiryType?.message} />
                      </div>

                      {/* Special requests — field array, shown for Custom Order */}
                      {isCustomOrder && (
                        <div
                          className="rounded-2xl px-5 py-4 space-y-3"
                          style={{
                            background: "rgba(227,41,115,0.04)",
                            border: "1px dashed rgba(227,41,115,0.25)",
                          }}
                        >
                          <p
                            className="font-raleway font-semibold text-[12px] uppercase tracking-wide"
                            style={{ color: "#E32973" }}
                          >
                            Special Requests / Modifiers
                          </p>
                          {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-start">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  placeholder="e.g. Gluten-free, Extra frosting, No nuts&hellip;"
                                  className={inputClass(
                                    !!errors.specialRequests?.[index]?.value
                                  )}
                                  style={{ color: "#87143D" }}
                                  {...register(
                                    `specialRequests.${index}.value`
                                  )}
                                />
                                <FieldError
                                  message={
                                    errors.specialRequests?.[index]?.value
                                      ?.message
                                  }
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mt-2 w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-red-50"
                                style={{
                                  border: "1px solid rgba(239,68,68,0.3)",
                                  color: "#ef4444",
                                }}
                                aria-label="Remove"
                              >
                                <svg
                                  className="w-4 h-4"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                >
                                  <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => append({ value: "" })}
                            className="inline-flex items-center gap-1.5 font-raleway font-semibold text-[13px] transition-opacity hover:opacity-70"
                            style={{ color: "#E32973" }}
                          >
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <path d="M8 1.5a.75.75 0 01.75.75V7h4.75a.75.75 0 010 1.5H8.75v4.75a.75.75 0 01-1.5 0V8.5H2.5a.75.75 0 010-1.5h4.75V2.25A.75.75 0 018 1.5z" />
                            </svg>
                            Add request
                          </button>
                        </div>
                      )}

                      {/* Message */}
                      <div>
                        <div className="flex justify-between items-baseline mb-1.5">
                          <label
                            htmlFor="message"
                            className={labelClass}
                            style={{ ...labelStyle, marginBottom: 0 }}
                          >
                            Message{" "}
                            <span style={{ color: "#E32973" }}>*</span>
                            {isCustomOrder && (
                              <span
                                className="ml-1 font-raleway normal-case font-normal text-[11px]"
                                style={{ color: "rgba(135,20,61,0.55)" }}
                              >
                                (min. 30 chars for custom orders)
                              </span>
                            )}
                          </label>
                          <span
                            className="font-raleway text-[11px]"
                            style={{
                              color:
                                msgLen > 900
                                  ? "#E32973"
                                  : "rgba(135,20,61,0.4)",
                            }}
                          >
                            {msgLen}/1000
                          </span>
                        </div>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Tell us how we can help..."
                          className={`${inputClass(!!errors.message)} resize-none`}
                          style={{ color: "#87143D" }}
                          {...register("message")}
                        />
                        <FieldError message={errors.message?.message} />
                      </div>

                      {/* Submit error */}
                      {submitError && (
                        <p className="font-raleway text-[13px] text-red-500 text-center -mb-1">{submitError}</p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-white font-raleway font-bold text-[15px] uppercase tracking-wider py-3.5 rounded-full transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                        style={{
                          background:
                            "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                          boxShadow: "0 4px 20px rgba(227,41,115,0.32)",
                        }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="w-4 h-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Sending&hellip;
                          </span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
