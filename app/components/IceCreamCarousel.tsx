"use client";
import { useState, useEffect, useRef } from "react";
import { supabase, supabaseClientId } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

const ICE_KEYWORDS = ["ice", "cream", "helado", "heladeria", "nieve", "frozen", "sorbete"];

function matchesIce(str: string) {
  const n = str.toLowerCase();
  return ICE_KEYWORDS.some((k) => n.includes(k));
}

export default function IceCreamCarousel() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetch() {
      const { data: allMenus } = await supabase
        .from("menus")
        .select("id, name, sort_order")
        .eq("restaurant_id", supabaseClientId)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!allMenus || allMenus.length === 0) { setLoading(false); return; }

      const monthlyMenuId = allMenus.find((m) => {
        const n = m.name.toLowerCase();
        return n.includes("monthly") || n.includes("special") || n.includes("especial") || n.includes("mes");
      })?.id;

      const nonMonthlyMenus = allMenus.filter((m) => m.id !== monthlyMenuId);

      // 1. Try to find a dedicated ice cream menu by name
      const iceCreamMenu = allMenus.find((m) => matchesIce(m.name));

      let categoryIds: string[] = [];

      if (iceCreamMenu) {
        const { data: cats } = await supabase
          .from("menu_categories")
          .select("id")
          .eq("menu_id", iceCreamMenu.id);
        categoryIds = (cats ?? []).map((c) => c.id);
      } else {
        // 2. Search for ice cream categories across all non-monthly menus
        const nonMonthlyIds = nonMonthlyMenus.map((m) => m.id);
        if (nonMonthlyIds.length > 0) {
          const { data: allCats } = await supabase
            .from("menu_categories")
            .select("id, name")
            .in("menu_id", nonMonthlyIds);
          categoryIds = (allCats ?? [])
            .filter((c) => matchesIce(c.name))
            .map((c) => c.id);
        }
      }

      if (categoryIds.length === 0) { setLoading(false); return; }

      const { data: menuItems } = await supabase
        .from("menu_items")
        .select("id, name, description, image_url, sort_order")
        .in("category_id", categoryIds)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      setItems(menuItems ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 294, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center gap-4">
            <Image src="/assets/icono_helado.webp" alt="" width={36} height={36} className="object-contain opacity-80" />
            <h2
              className="font-boorsok font-normal text-[36px] text-brand uppercase"
              style={{ lineHeight: "29px", WebkitTextStrokeWidth: "1.2px", WebkitTextStrokeColor: "#E32973" }}
            >
              Ice Cream
            </h2>
            <Image src="/assets/icono_helado.webp" alt="" width={36} height={36} className="object-contain opacity-80" />
          </div>
          <div className="flex justify-center mt-2 mb-10">
            <img src="/assets/fondo_titulos.webp" alt="" style={{ height: "12px", width: "auto" }} />
          </div>
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-aqua border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-center gap-4">
          <Image src="/assets/icono_helado.webp" alt="" width={36} height={36} className="object-contain opacity-80" />
          <h2
            className="font-boorsok font-normal text-[36px] text-brand uppercase"
            style={{ lineHeight: "29px", WebkitTextStrokeWidth: "1.2px", WebkitTextStrokeColor: "#E32973" }}
          >
            Ice Cream
          </h2>
          <Image src="/assets/icono_helado.webp" alt="" width={36} height={36} className="object-contain opacity-80" />
        </div>
        <div className="flex justify-center mt-2 mb-10">
          <img src="/assets/fondo_titulos.webp" alt="" style={{ height: "12px", width: "auto" }} />
        </div>

        <div className="relative px-8">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="absolute left-0 top-[38%] z-10 w-9 h-9 rounded-full bg-brand text-[#F8FAFC] flex items-center justify-center text-2xl leading-none hover:bg-brand-dark transition-colors shadow"
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[210px] md:w-[270px] text-center"
              >
                <div className="mb-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full aspect-square object-contain"
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center">
                      <span className="font-boorsok text-[13px] text-aqua-dark text-center px-3">
                        {item.name}
                      </span>
                    </div>
                  )}
                </div>
                <p
                  className="font-raleway font-bold text-[15px] md:text-[16px] text-aqua-dark leading-tight"
                  style={{ fontWeight: 700, WebkitTextStrokeWidth: "0.7px", WebkitTextStrokeColor: "#276477" }}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="absolute right-0 top-[38%] z-10 w-9 h-9 rounded-full bg-brand text-[#F8FAFC] flex items-center justify-center text-2xl leading-none hover:bg-brand-dark transition-colors shadow"
          >
            ›
          </button>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[#F8FAFC] font-raleway font-bold text-[16px] capitalize rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", padding: "12px 32px", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C9.24 2 7 4.24 7 7H6a1 1 0 0 0-1 1v1c0 .55.45 1 1 1h12a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1c0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3H9c0-1.65 1.35-3 3-3zM6.5 11l1.5 9h8l1.5-9h-11z"/>
            </svg>
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
