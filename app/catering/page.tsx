"use client";

import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

// ── Constants ──────────────────────────────────────────────────────────────────
const SIGNATURE_FLAVORS = [
  "Vanilla / White",
  "Chocolate",
  "Red Velvet",
  "Almond / Wedding",
] as const;

const SPECIAL_FLAVORS = [
  "Carrot Cake",
  "Lemon",
  "Strawberry",
  "Blueberry",
  "Caramel",
  "Other",
] as const;

const FROSTING_FLAVORS = [
  "Vanilla (White) Buttercream",
  "Color Buttercream (enter color in order details)",
  "Almond (Wedding Cake)",
  "Caramel Buttercream",
  "Fudge",
  "Lemon Buttercream",
  "Strawberry Buttercream",
  "Chocolate Buttercream",
  "Cream Cheese",
  "Blueberry Buttercream",
  "Cookies & Cream Buttercream",
  "Key Lime Cream Cheese",
  "Peanut Butter Cream Cheese",
  "Vanilla Whipped Icing",
  "Other",
] as const;

const GUEST_COUNTS = [
  "1–25 guests",
  "26–50 guests",
  "51–75 guests",
  "76–100 guests",
  "101–150 guests",
  "151–200 guests",
  "200+ guests",
] as const;

const PRODUCT_TYPES = [
  "Regular Gourmet (Jumbo Size)",
  "Mini (Bite Size)",
] as const;

// ── Zod Schema ─────────────────────────────────────────────────────────────────
const cateringSchema = z
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
      .min(1, "Phone number is required for catering inquiries")
      .refine(
        (val) =>
          /^\+?1?\s?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(
            val.replace(/\s/g, "")
          ),
        "Please enter a valid US phone number"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    pickupDate: z
      .string()
      .min(1, "Please select a pickup date")
      .refine((val) => {
        const selected = new Date(val);
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 7);
        minDate.setHours(0, 0, 0, 0);
        return selected >= minDate;
      }, "Requests must be submitted at least 7 days before pickup"),
    pickupLocation: z.string().min(1, "Please enter a pickup location"),
    eventTime: z.string().min(1, "Please select a pickup time"),
    guestCount: z.string().min(1, "Please select the number of guests"),
    signatureFlavors: z
      .array(z.string())
      .min(1, "Please select at least one signature flavor"),
    specialFlavors: z
      .array(z.string())
      .min(1, "Please select at least one special flavor"),
    frostingFlavors: z
      .array(z.string())
      .min(1, "Please select at least one frosting flavor"),
    products: z
      .array(
        z.object({
          productType: z.string().min(1, "Please select a product type"),
          quantity: z
            .string()
            .min(1, "Quantity is required")
            .refine(
              (val) => !isNaN(Number(val)) && Number(val) >= 12,
              "Minimum order is 12 cupcakes per product"
            ),
        })
      )
      .min(1, "Please add at least one product")
      .max(2, "Maximum 2 products per order"),
    orderDetails: z
      .string()
      .min(10, "Please provide at least 10 characters of detail")
      .max(2000, "Maximum 2,000 characters"),
  })
  .superRefine((data, ctx) => {
    if (
      data.frostingFlavors.includes(
        "Color Buttercream (enter color in order details)"
      ) &&
      data.orderDetails.length < 15
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["orderDetails"],
        message:
          "You selected Color Buttercream — please specify the color in your order details",
      });
    }
    const totalQty = data.products.reduce(
      (sum, p) => sum + (Number(p.quantity) || 0),
      0
    );
    if (
      data.specialFlavors.length > 0 &&
      totalQty < data.specialFlavors.length * 12
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["orderDetails"],
        message: `Special flavors require a minimum of 12 cupcakes each — your total quantity should be at least ${data.specialFlavors.length * 12}`,
      });
    }
  });

type CateringFormData = z.infer<typeof cateringSchema>;

// ── Style helpers ──────────────────────────────────────────────────────────────
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

// ── Field Error ────────────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 font-raleway text-[12px] text-red-500 flex items-center gap-1.5">
      <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 3.5a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 4.5zm0 6.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
      </svg>
      {message}
    </p>
  );
}

// ── Custom Select ──────────────────────────────────────────────────────────────
function CustomSelect({
  value,
  onChange,
  onBlur,
  hasError,
  options,
  placeholder = "Select…",
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
          style={{ color: "#E32973", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl overflow-hidden z-50 max-h-52 overflow-y-auto"
          style={{ border: "1.5px solid rgba(227,41,115,0.2)", boxShadow: "0 8px 32px rgba(227,41,115,0.12)" }}
        >
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full text-left px-4 py-3 font-raleway text-[15px] transition-colors duration-100"
                style={{
                  color: isSelected ? "#E32973" : "#87143D",
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? "rgba(227,41,115,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(227,41,115,0.04)"; }}
                onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
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

// ── Checkbox Array Field ───────────────────────────────────────────────────────
function CheckboxArrayField({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: readonly string[];
  value: string[];
  onChange: (val: string[]) => void;
  columns?: number;
}) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
          : "grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3"
      }
    >
      {options.map((opt) => {
        const checked = value.includes(opt);
        return (
          <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
            <div
              className="mt-0.5 w-[18px] h-[18px] rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-150"
              style={{
                borderColor: checked ? "#E32973" : "rgba(227,41,115,0.35)",
                background: checked ? "#E32973" : "white",
              }}
              onClick={() => toggle(opt)}
            >
              {checked && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                </svg>
              )}
            </div>
            <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(opt)} />
            <span
              className="font-raleway text-[14px] leading-[1.4]"
              style={checked ? { color: "#E32973" } : undefined}
            >
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ── Section Heading ────────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center uppercase font-boorsok mb-6"
      style={{
        color: "#E32973",
        fontFeatureSettings: "'liga' off, 'clig' off",
        textShadow: "0px 2.64px 7.92px rgba(135, 20, 61, 0.40)",
        WebkitTextStrokeWidth: "0.60px",
        WebkitTextStrokeColor: "#FFF",
        fontSize: "clamp(20px, 3vw, 26px)",
        lineHeight: "38.28px",
      }}
    >
      {children}
    </h2>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CateringPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CateringFormData>({
    resolver: zodResolver(cateringSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      pickupDate: "",
      pickupLocation: "",
      eventTime: "",
      guestCount: "",
      signatureFlavors: [],
      specialFlavors: [],
      frostingFlavors: [],
      products: [{ productType: "", quantity: "" }],
      orderDetails: "",
    },
  });

  const { fields: productFields, append: appendProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });

  const orderDetailsValue = watch("orderDetails");
  const detailsLen = orderDetailsValue?.length ?? 0;

  async function onSubmit(data: CateringFormData) {
    setSubmitError(null);
    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    const fileInput = document.getElementById("referenceImage") as HTMLInputElement;
    if (fileInput?.files?.[0]) fd.append("image", fileInput.files[0]);

    const res = await fetch("/api/catering", { method: "POST", body: fd });
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

        {/* ─── HERO ────────────────────────────────────────────────── */}
        <section
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{ height: "400px" }}
        >
          <Image
            src="/assets/hero_catering.webp"
            alt="Smallcakes catering"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <Image
              src="/assets/icono_cupcake.webp"
              alt=""
              width={72}
              height={72}
              className="object-contain mb-3 animate-fade-in-up"
              aria-hidden="true"
            />
            <h1
              className="font-boorsok uppercase text-center animate-fade-in-up"
              style={{
                color: "#E32973",
                fontFeatureSettings: "'liga' off, 'clig' off",
                textShadow: "0px 2.64px 7.92px rgba(135, 20, 61, 0.40)",
                WebkitTextStrokeWidth: "0.60px",
                WebkitTextStrokeColor: "#FFF",
                fontSize: "clamp(38px, 6vw, 68px)",
                lineHeight: "1.15",
              }}
            >
              Catering And<br />Custom Inquiries
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

        {/* ─── FORM SECTION ────────────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-dots-white">
          <div className="max-w-[820px] mx-auto px-4 md:px-0">

            {/* Intro heading */}
            <div className="text-center mb-10 animate-fade-in-up">
              <p
                style={{
                  color: "#E32973",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  textShadow: "0px 2.64px 7.92px rgba(135, 20, 61, 0.40)",
                  WebkitTextStrokeWidth: "0.60px",
                  WebkitTextStrokeColor: "#FFF",
                  fontFamily: "'Boorsok', cursive",
                  fontSize: "24px",
                  fontWeight: 400,
                  lineHeight: "38.28px",
                  textAlign: "center",
                }}
              >
                Custom Cupcakes
              </p>
              <p className="inqui">• Order Inquiry •</p>
              <p
                className="font-raleway text-[14px] leading-[1.7] mt-4 max-w-[640px] mx-auto"
                style={{ color: "#87143D" }}
              >
                This request form is for custom cupcakes only. Available for pick up only at the Snellville location.
                Custom cupcakes include custom colors, designs, fondant and edible toppers.
                Choose from our <strong>Regular Gourmet (Jumbo size)</strong> and <strong>Mini (Bite size)</strong> cupcakes.
              </p>
              <p
                className="font-raleway text-[14px] leading-[1.7] mt-2 max-w-[640px] mx-auto"
                style={{ color: "#87143D" }}
              >
                Requests must be submitted a minimum of <strong>7 days</strong> prior to your requested pick up date.
                You&apos;ll hear back from us within <strong>2–3 business days</strong> by email.
              </p>
            </div>

            {/* Form card */}
            <div
              className="bg-white rounded-3xl px-6 py-8 md:px-10 md:py-10 animate-fade-in-up delay-100"
              style={{
                border: "1.5px solid rgba(227,41,115,0.14)",
                boxShadow: "0 8px 48px rgba(227,41,115,0.09)",
              }}
            >
              {submitted ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center py-14 text-center gap-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                      boxShadow: "0 6px 24px rgba(227,41,115,0.38)",
                    }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-boorsok uppercase mb-2"
                      style={{
                        fontSize: "clamp(22px, 3vw, 30px)",
                        color: "#E32973",
                        fontFeatureSettings: "'liga' off, 'clig' off",
                        textShadow: "0px 2.64px 7.92px rgba(135,20,61,0.40)",
                        WebkitTextStrokeWidth: "0.6px",
                        WebkitTextStrokeColor: "#FFF",
                      }}
                    >
                      Inquiry Submitted!
                    </h3>
                    <p className="font-raleway text-[15px] leading-relaxed max-w-[280px] mx-auto" style={{ color: "#87143D" }}>
                      Thanks for reaching out! We&apos;ll get back to you within 2–3 business days to verify your needs.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="font-raleway font-bold text-[13px] uppercase tracking-wide px-7 py-2.5 rounded-full text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)" }}
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">

                  {/* ── PERSONAL INFORMATION ───────────────────── */}
                  <div>
                    <SectionHeading>Personal Information</SectionHeading>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="firstName" className={labelClass} style={labelStyle}>
                            First Name <span style={{ color: "#E32973" }}>*</span>
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder="First Name"
                            className={inputClass(!!errors.firstName)}
                            style={{ color: "#87143D" }}
                            {...register("firstName")}
                          />
                          <FieldError message={errors.firstName?.message} />
                        </div>
                        <div>
                          <label htmlFor="lastName" className={labelClass} style={labelStyle}>
                            Last Name <span style={{ color: "#E32973" }}>*</span>
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

                      <div>
                        <label htmlFor="phone" className={labelClass} style={labelStyle}>
                          Phone <span style={{ color: "#E32973" }}>*</span>
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

                      <div>
                        <label htmlFor="email" className={labelClass} style={labelStyle}>
                          Email <span style={{ color: "#E32973" }}>*</span>
                        </label>
                        <p className="font-raleway text-[14px] leading-[1.6] mb-1.5" style={{ color: "#87143D" }}>
                          (verify entry, quotes will be sent to this email address)
                        </p>
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
                    </div>
                  </div>

                  {/* ── DATE AND LOCATION ──────────────────────── */}
                  <div>
                    <SectionHeading>Date and Location of Your Event</SectionHeading>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="pickupDate" className={labelClass} style={labelStyle}>
                            Pick Up Date <span style={{ color: "#E32973" }}>*</span>
                          </label>
                          <input
                            id="pickupDate"
                            type="date"
                            className={inputClass(!!errors.pickupDate)}
                            style={{ color: "#87143D" }}
                            {...register("pickupDate")}
                          />
                          <FieldError message={errors.pickupDate?.message} />
                        </div>
                        <div>
                          <label htmlFor="eventTime" className={labelClass} style={labelStyle}>
                            Pickup Time <span style={{ color: "#E32973" }}>*</span>
                          </label>
                          <input
                            id="eventTime"
                            type="time"
                            className={inputClass(!!errors.eventTime)}
                            style={{ color: "#87143D" }}
                            {...register("eventTime")}
                          />
                          <FieldError message={errors.eventTime?.message} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pickupLocation" className={labelClass} style={labelStyle}>
                          Pickup Location <span style={{ color: "#E32973" }}>*</span>
                        </label>
                        <input
                          id="pickupLocation"
                          type="text"
                          placeholder="e.g. Snellville — The Shoppes at Webb Gin"
                          className={inputClass(!!errors.pickupLocation)}
                          style={{ color: "#87143D" }}
                          {...register("pickupLocation")}
                        />
                        <FieldError message={errors.pickupLocation?.message} />
                      </div>

                      <div>
                        <label className={labelClass} style={labelStyle}>
                          How many guests? <span style={{ color: "#E32973" }}>*</span>
                        </label>
                        <Controller
                          control={control}
                          name="guestCount"
                          render={({ field }) => (
                            <CustomSelect
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              hasError={!!errors.guestCount}
                              options={GUEST_COUNTS}
                              placeholder="Select…"
                            />
                          )}
                        />
                        <FieldError message={errors.guestCount?.message} />
                      </div>
                    </div>
                  </div>

                  {/* ── PRODUCTS AND FLAVORS ────────────────────── */}
                  <div>
                    <SectionHeading>Products and Flavors</SectionHeading>
                    <div className="space-y-8">

                      {/* Signature Flavors */}
                      <div>
                        <p className="font-raleway font-bold text-[14px] uppercase tracking-wider mb-2" style={{ color: "#87143D" }}>
                          Flavors
                        </p>
                        <p className="font-raleway font-bold text-[14px] mb-3" style={{ color: "#87143D" }}>
                          Signature Cake Flavors | Select one or more <span style={{ color: "#E32973" }}>*</span>
                        </p>
                        <Controller
                          control={control}
                          name="signatureFlavors"
                          render={({ field }) => (
                            <CheckboxArrayField
                              options={SIGNATURE_FLAVORS}
                              value={field.value ?? []}
                              onChange={field.onChange}
                              columns={2}
                            />
                          )}
                        />
                        <FieldError message={errors.signatureFlavors?.message} />
                      </div>

                      {/* Special Flavors */}
                      <div>
                        <p className="font-raleway font-bold text-[14px] mb-3" style={{ color: "#87143D" }}>
                          Special Cake Flavors | Select one or more <span style={{ color: "#E32973" }}>*</span>
                        </p>
                        <Controller
                          control={control}
                          name="specialFlavors"
                          render={({ field }) => (
                            <CheckboxArrayField
                              options={SPECIAL_FLAVORS}
                              value={field.value ?? []}
                              onChange={field.onChange}
                              columns={3}
                            />
                          )}
                        />
                        <p className="font-raleway text-[14px] leading-[1.6] mt-2" style={{ color: "#87143D" }}>
                          *** Requires a minimum of 12 of each flavor
                        </p>
                        <FieldError message={errors.specialFlavors?.message} />
                      </div>

                      {/* Frosting Flavors */}
                      <div>
                        <p className="font-raleway font-bold text-[14px] mb-3" style={{ color: "#87143D" }}>
                          Frosting Flavors | Select one or more <span style={{ color: "#E32973" }}>*</span>
                        </p>
                        <Controller
                          control={control}
                          name="frostingFlavors"
                          render={({ field }) => (
                            <CheckboxArrayField
                              options={FROSTING_FLAVORS}
                              value={field.value ?? []}
                              onChange={field.onChange}
                              columns={2}
                            />
                          )}
                        />
                        <FieldError message={errors.frostingFlavors?.message} />
                      </div>

                      {/* Products — field array */}
                      <div>
                        <p className="font-raleway font-bold text-[13px] uppercase tracking-wider mb-4" style={{ color: "#87143D" }}>
                          Products
                        </p>
                        <div className="space-y-4">
                          {productFields.map((field, index) => (
                            <div key={field.id}>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                                <div>
                                  <label className={labelClass} style={labelStyle}>
                                    Select {index === 0 ? "1st" : "2nd"} Product{" "}
                                    <span style={{ color: "#E32973" }}>*</span>
                                  </label>
                                  <Controller
                                    control={control}
                                    name={`products.${index}.productType`}
                                    render={({ field: f }) => (
                                      <CustomSelect
                                        value={f.value ?? ""}
                                        onChange={f.onChange}
                                        onBlur={f.onBlur}
                                        hasError={!!errors.products?.[index]?.productType}
                                        options={PRODUCT_TYPES}
                                        placeholder="Select…"
                                      />
                                    )}
                                  />
                                  <FieldError message={errors.products?.[index]?.productType?.message} />
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="flex-1">
                                    <label htmlFor={`qty-${index}`} className={labelClass} style={labelStyle}>
                                      Quantity ({index === 0 ? "1st" : "2nd"} product){" "}
                                      <span style={{ color: "#E32973" }}>*</span>
                                    </label>
                                    <input
                                      id={`qty-${index}`}
                                      type="number"
                                      min={12}
                                      placeholder="Min. 12"
                                      className={inputClass(!!errors.products?.[index]?.quantity)}
                                      style={{ color: "#87143D" }}
                                      {...register(`products.${index}.quantity`)}
                                    />
                                    <FieldError message={errors.products?.[index]?.quantity?.message} />
                                  </div>
                                  {productFields.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeProduct(index)}
                                      className="mt-7 w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-red-50 cursor-pointer"
                                      style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}
                                      aria-label="Remove product"
                                    >
                                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                          {productFields.length < 2 && (
                            <button
                              type="button"
                              onClick={() => appendProduct({ productType: "", quantity: "" })}
                              className="inline-flex items-center gap-1.5 font-raleway font-bold text-[14px] hover:opacity-70 cursor-pointer"
                              style={{ color: "#E32973" }}
                            >
                              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1.5a.75.75 0 01.75.75V7h4.75a.75.75 0 010 1.5H8.75v4.75a.75.75 0 01-1.5 0V8.5H2.5a.75.75 0 010-1.5h4.75V2.25A.75.75 0 018 1.5z" />
                              </svg>
                              Add 2nd product
                            </button>
                          )}

                          {/* Array-level error (min/max) */}
                          <FieldError message={(errors.products as { message?: string } | undefined)?.message} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── EXTRA DETAILS ──────────────────────────── */}
                  <div>
                    <SectionHeading>Extra Details</SectionHeading>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-baseline mb-1.5">
                          <label htmlFor="orderDetails" className={labelClass} style={{ ...labelStyle, marginBottom: 0 }}>
                            Order Details <span style={{ color: "#E32973" }}>*</span>
                          </label>
                          <span
                            className="font-raleway text-[11px]"
                            style={{ color: detailsLen > 1800 ? "#E32973" : "rgba(135,20,61,0.4)" }}
                          >
                            {detailsLen}/2000
                          </span>
                        </div>
                        <textarea
                          id="orderDetails"
                          rows={5}
                          placeholder="Share your additional comments — preferences, design requests, color details, etc."
                          className={`${inputClass(!!errors.orderDetails)} resize-none`}
                          style={{ color: "#87143D" }}
                          {...register("orderDetails")}
                        />
                        <p className="mt-1 font-raleway text-[14px] leading-[1.6]" style={{ color: "#87143D" }}>
                          Please provide as much detail of your preferences and design requests as possible here.
                          You will be contacted in 2–3 business days via email to verify your needs.
                        </p>
                        <FieldError message={errors.orderDetails?.message} />
                      </div>

                      {/* Image upload */}
                      <div>
                        <label htmlFor="referenceImage" className={labelClass} style={labelStyle}>
                          Image Upload
                        </label>
                        <p className="font-raleway text-[14px] leading-[1.6] mb-1.5" style={{ color: "#87143D" }}>
                          — Bakers may use as reference
                        </p>
                        <label
                          htmlFor="referenceImage"
                          className="flex items-center gap-3 cursor-pointer w-full"
                        >
                          <span
                            className="font-raleway font-semibold text-[13px] px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                            style={{
                              background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                              color: "#FDE6F2",
                            }}
                          >
                            Choose File
                          </span>
                          <span className="font-raleway text-[14px]" style={{ color: "#87143D" }}>
                            No file selected
                          </span>
                        </label>
                        <input
                          id="referenceImage"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                        />
                        <p className="mt-1.5 font-raleway text-[14px] leading-[1.6]" style={{ color: "#87143D" }}>
                          Please upload images you&apos;d like to be used as a reference. This will help us quote you sooner.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p className="font-raleway text-[13px] text-red-500 text-center -mb-4">{submitError}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white font-raleway font-bold text-[15px] uppercase tracking-wider py-4 rounded-full transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                    style={{
                      background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                      boxShadow: "0 4px 20px rgba(227,41,115,0.32)",
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
        </section>

      </main>
      <Footer />
    </>
  );
}
