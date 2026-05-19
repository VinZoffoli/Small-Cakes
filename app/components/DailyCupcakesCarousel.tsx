"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { classifyMenuCategories } from "@/lib/menuCategories";
import Image from "next/image";
import Link from "next/link";
import { CaretLeftIcon, CaretRightIcon, BagIcon } from "@phosphor-icons/react";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

type SlotCfg = {
  scale: number;
  translateY: number;
  translateX: number;
  opacity: number;
  zIndex: number;
  rotate: number;
};

const DESKTOP: Record<string, SlotCfg> = {
  "-1": { scale: 0.72, translateY: 32, translateX: -370, opacity: 0.82, zIndex: 2, rotate: -4 },
  "0":  { scale: 1.00, translateY:  0, translateX:    0, opacity: 1.00, zIndex: 5, rotate:  0 },
  "1":  { scale: 0.72, translateY: 32, translateX:  370, opacity: 0.82, zIndex: 2, rotate:  4 },
};

const MOBILE: Record<string, SlotCfg> = {
  "-1": { scale: 0.62, translateY: 26, translateX: -165, opacity: 0.75, zIndex: 2, rotate: -4 },
  "0":  { scale: 1.00, translateY:  0, translateX:    0, opacity: 1.00, zIndex: 5, rotate:  0 },
  "1":  { scale: 0.62, translateY: 26, translateX:  165, opacity: 0.75, zIndex: 2, rotate:  4 },
};

export default function DailyCupcakesCarousel() {
  const [items, setItems]     = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive]   = useState(0);
  const [mobile, setMobile]   = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    (async () => {
      const { dailyCatIds } = await classifyMenuCategories();
      if (!dailyCatIds.length) { setLoading(false); return; }
      const { data } = await supabase
        .from("menu_items")
        .select("id, name, description, image_url, sort_order")
        .in("category_id", dailyCatIds)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      setItems(data ?? []);
      setLoading(false);
    })();
  }, []);

  const n      = items.length;
  const prev   = () => setActive((i) => (i - 1 + n) % n);
  const next   = () => setActive((i) => (i + 1) % n);
  const slots  = mobile ? MOBILE : DESKTOP;
  const maxOff = Math.min(1, Math.floor((n - 1) / 2));

  const offsetOf = (idx: number) => {
    let off = ((idx - active) % n + n) % n;
    if (off > n / 2) off -= n;
    return off;
  };

  const SectionTitle = () => (
    <>
      <h2
        className="font-boorsok font-normal text-[42px] text-brand uppercase text-center"
        style={{ lineHeight: "29px", WebkitTextStrokeWidth: "1.2px", WebkitTextStrokeColor: "#E32973" }}
      >
        Daily Cupcakes
      </h2>
      <div className="flex justify-center mt-2 mb-8">
        <img src="/assets/fondo_titulos.webp" alt="" style={{ height: "12px", width: "auto" }} />
      </div>
    </>
  );

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <SectionTitle />
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!n) return null;

  const cur = items[active];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionTitle />

        {/* Arc carousel */}
        <div
          className="relative mx-auto"
          style={{ height: mobile ? "290px" : "420px", maxWidth: "1100px" }}
        >
          {items.map((item, idx) => {
            const off = offsetOf(idx);
            if (Math.abs(off) > maxOff) return null;
            const c = slots[String(off)];
            const isCenter = off === 0;
            return (
              <div
                key={item.id}
                onClick={() => !isCenter && setActive(idx)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: mobile ? "200px" : "380px",
                  transform: `translate(calc(-50% + ${c.translateX}px), calc(-50% + ${c.translateY}px)) scale(${c.scale}) rotate(${c.rotate}deg)`,
                  opacity: c.opacity,
                  zIndex: c.zIndex,
                  transition: "all 0.44s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  cursor: isCenter ? "default" : "pointer",
                  transformOrigin: "center center",
                }}
              >
                {item.image_url ? (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="220px"
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-brand-light/30 rounded-2xl">
                    <span className="font-boorsok text-[12px] text-brand text-center px-2">{item.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active item info */}
        <div className="text-center mt-3 min-h-[40px]">
          <p
            className="font-raleway font-bold text-[17px] md:text-[19px] leading-tight uppercase"
            style={{ color: "#2D0A14", letterSpacing: "0.08em" }}
          >
            {cur.name}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-colors shadow"
          >
            <CaretLeftIcon size={18} weight="duotone" />
          </button>

          <div className="flex gap-1.5 items-center">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to item ${i + 1}`}
                style={{
                  width: i === active ? "22px" : "8px",
                  height: "8px",
                  background: i === active ? "#E32973" : "rgba(227,41,115,0.25)",
                  borderRadius: "9999px",
                  transition: "all 0.3s ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-colors shadow"
          >
            <CaretRightIcon size={18} weight="duotone" />
          </button>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/menu?tab=daily"
            className="inline-flex items-center gap-2 text-[#F8FAFC] font-raleway font-bold text-[16px] capitalize rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", padding: "12px 32px", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
          >
            <BagIcon size={18} weight="duotone" />
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
