"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { supabase, supabaseClientId } from "@/lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────
interface FlatItem {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  tag: string | null;
}

interface MenuTab {
  id: string;
  name: string;
  items: FlatItem[];
}

// ── Tab icons ─────────────────────────────────────────────────────────────
function IceCreamIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx="21" cy="21" r="21" fill="white" />
      <circle cx="20.9998" cy="20.9999" r="19.0682" stroke="#E32973" />
      <ellipse cx="21" cy="16.5" rx="7.2" ry="6.8" fill="#F96DAF" />
      <ellipse cx="18.5" cy="14" rx="2.2" ry="1.6" fill="white" fillOpacity="0.35" />
      <path d="M14.2 20.5 L21 33 L27.8 20.5 Z" fill="#B22447" />
      <path d="M17.5 20.5 L21 33 L14.2 20.5 Z" fill="#87143D" fillOpacity="0.25" />
      <line x1="17.5" y1="20.5" x2="20.2" y2="30.5" stroke="#87143D" strokeWidth="0.6" strokeOpacity="0.45" />
      <line x1="21" y1="20.5" x2="21" y2="33" stroke="#87143D" strokeWidth="0.6" strokeOpacity="0.45" />
      <line x1="22" y1="22.5" x2="25" y2="20.5" stroke="#87143D" strokeWidth="0.6" strokeOpacity="0.35" />
      <line x1="20.5" y1="26" x2="26.5" y2="22.5" stroke="#87143D" strokeWidth="0.6" strokeOpacity="0.35" />
    </svg>
  );
}

function CupcakeIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <circle cx="21" cy="21" r="21" fill="white" />
      <circle cx="20.9998" cy="20.9999" r="19.0682" stroke="#E32973" />
      <path d="M18.1964 24.4446C16.7837 24.5344 15.3911 24.34 14.0571 23.8668C13.1594 23.5798 12.3829 22.9207 11.9473 22.0667C11.2478 20.5389 12.0238 18.7899 13.1453 17.8395C13.6966 17.3942 14.302 17.0423 14.9521 16.792C14.8487 16.7247 14.7475 16.6521 14.651 16.5742C14.2134 16.2478 13.9278 15.7537 13.8655 15.2124L13.8632 15.1769L13.861 15.1413C13.874 14.6665 14.0428 14.2022 14.3344 13.832C15.2966 12.4534 16.5912 11.306 18.0739 10.5186L18.1011 10.5067C18.8199 10.1782 18.9414 10.1297 19.0086 10.1076L19.2228 10.0379C19.4338 9.95826 19.6759 9.88935 19.917 9.84345L21.7578 9.53025L20.5756 10.9661C20.4047 11.1579 20.2298 11.3245 20.0461 11.4738C19.9008 11.5875 19.7717 11.7154 19.6584 11.8526C19.5196 12.0296 19.4706 12.257 19.5218 12.3429C19.5473 12.3846 19.6242 12.5148 20.0394 12.4884C20.5761 12.4543 21.3062 12.1836 21.9493 11.944C22.3651 11.7672 22.8061 11.6271 23.2551 11.5323C23.446 11.4972 23.6202 11.4785 23.7949 11.4674C24.8354 11.4013 25.8831 11.6889 26.7442 12.2789C27.3077 12.6661 27.7003 13.2451 27.8521 13.9132L27.8591 13.9434C27.9694 14.6397 27.8054 15.3381 27.3943 15.9096C27.2825 16.0696 27.136 16.2445 26.9622 16.4288L27.1863 16.356C27.6613 16.1908 28.0973 16.0509 28.52 16.0241C28.7099 16.012 28.8835 16.0239 29.0535 16.059C29.6836 16.2151 30.1844 16.6547 30.4148 17.2415C31.0422 18.6337 30.6399 20.3029 29.3294 21.6807C28.0642 23.0097 26.5518 23.3708 25.1028 23.5674C24.649 23.6268 24.1976 23.6835 23.7461 23.7377L23.2467 23.8C21.9956 23.9509 20.7749 24.1024 19.6002 24.2968C19.1777 24.367 18.7462 24.4173 18.3158 24.4447L18.1943 24.4524L18.1964 24.4446Z" fill="#F96DAF" />
      <path d="M30.0867 23.8412C30.0472 23.78 29.979 23.7461 29.9081 23.7506L29.1815 23.7968C29.1106 23.8013 29.0472 23.8435 29.0157 23.9067C28.9955 23.9487 26.8351 28.232 25.9106 29.5241C25.5745 29.994 25.0312 30.4439 23.3805 30.5488C23.3501 30.5507 20.378 30.7396 18.3508 31.0391L18.2243 31.0472C17.6683 31.1386 17.0921 31.2312 16.4258 29.8262C15.6532 28.1884 13.8719 24.8767 13.8521 24.8449C13.8147 24.7759 13.7409 24.7347 13.6649 24.7395L13.0599 24.778C12.951 24.7849 12.8655 24.8795 12.8726 24.9912C12.8742 25.0166 12.8809 25.0416 12.8899 25.064L15.9657 31.5449C16.0143 31.6692 16.2754 32.2184 17.4222 32.1455L17.5133 32.1397L18.375 32.0594C19.8579 31.9142 22.3459 31.6669 25.2993 31.5429C25.3347 31.5407 26.1698 31.5615 26.6456 30.5298C27.0658 29.6214 30.0622 24.095 30.0917 24.0396C30.1285 23.9787 30.1287 23.9022 30.0918 23.8408L30.0867 23.8412Z" fill="#B22447" />
      <path d="M18.4632 28.9249C18.415 28.6858 18.3492 28.2909 18.2769 27.8731C18.1703 27.115 18.0207 26.3623 17.8262 25.6201C17.7356 25.3554 17.3352 25.2547 17.0721 25.3538C16.8081 25.4787 16.6801 25.7856 16.7767 26.0653C16.8059 26.2051 16.8395 26.3729 16.8773 26.5688C17.0294 27.4811 17.2516 28.3786 17.5413 29.2564C17.6226 29.4573 17.8237 29.581 18.0386 29.5622C18.302 29.548 18.5038 29.324 18.4894 29.0571C18.4865 29.0109 18.4785 28.9651 18.463 28.9223L18.4632 28.9249Z" fill="#B22447" />
      <path d="M22.1453 24.7411C21.9377 24.6745 21.7076 24.7329 21.5577 24.8944C20.7372 26.1826 20.3218 29.4049 20.3027 29.5452C20.2965 29.6074 20.3133 29.6707 20.3543 29.7171C20.39 29.7586 20.4397 29.7812 20.4929 29.7778L20.9115 29.7254C20.9568 29.7174 20.9958 29.6917 21.0241 29.6565C21.269 29.3113 21.701 27.749 22.2569 25.0173C22.2857 24.9099 22.2429 24.7967 22.1453 24.7411Z" fill="#B22447" />
      <path d="M26.233 24.641C26.1838 24.4278 26.0352 24.2492 25.8365 24.1614C25.7611 24.1353 25.676 24.1562 25.6241 24.2187C25.1592 24.6242 23.6622 27.7453 23.5501 28.901C23.5379 29.0692 23.6417 29.2222 23.7975 29.2741C23.8394 29.2947 23.886 29.3071 23.932 29.3119C24.0294 29.3238 24.1225 29.2689 24.1573 29.1766C24.6547 28.084 25.6902 25.9399 26.1871 24.9993C26.2437 24.8901 26.2585 24.763 26.2281 24.6439L26.233 24.641Z" fill="#B22447" />
    </svg>
  );
}

// ── Menu item card ────────────────────────────────────────────────────────
function MenuItemCard({ item, nameColor = "#87143D" }: { item: FlatItem; nameColor?: string }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-full aspect-square mb-4 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #FDE8F2 0%, #fff0f6 100%)" }}
          >
            <CupcakeIcon size={64} />
          </div>
        )}
      </div>

      <h3
        className="font-raleway text-[17px] md:text-[18px] leading-tight mb-2"
        style={{ color: nameColor, fontWeight: 700 }}
      >
        {item.name}
      </h3>

      {item.tag && (
        <span
          className="inline-block font-raleway font-bold text-[11px] uppercase tracking-wide px-3 py-1 rounded-full mb-3"
          style={{
            background: "rgba(227,41,115,0.08)",
            color: "#E32973",
            border: "1px solid rgba(227,41,115,0.18)",
          }}
        >
          {item.tag}
        </span>
      )}

      {item.description && (
        <p
          className="font-raleway text-[13px] leading-relaxed"
          style={{ color: "#87143D" }}
        >
          {item.description}
        </p>
      )}
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex justify-center py-24">
      <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── Keyword sets ──────────────────────────────────────────────────────────
const ICE_KW = ["ice", "cream", "helado", "heladeria", "nieve", "frozen", "sorbete"];
const MONTHLY_KW = [
  "monthly", "special", "especial", "mes",
  "january", "february", "march", "april", "june", "july",
  "august", "september", "october", "november", "december",
  "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
  "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DAILY_KW = [
  "daily", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo",
];

const isIceName    = (s: string) => { const n = s.toLowerCase(); return ICE_KW.some((k)     => n.includes(k)); };
const isMonthlyName = (s: string) => { const n = s.toLowerCase(); return MONTHLY_KW.some((k) => n.includes(k)); };
const isDailyName   = (s: string) => { const n = s.toLowerCase(); return DAILY_KW.some((k)   => n.includes(k)); };

// ── Shared helpers ────────────────────────────────────────────────────────
function toFlatItem(item: {
  id: string; name: string; description: string | null;
  image_url: string | null; tags: string | null;
}): FlatItem {
  return {
    id: item.id, name: item.name, description: item.description,
    image_url: item.image_url,
    tag: item.tags ? String(item.tags).split(",")[0].trim() : null,
  };
}

async function fetchItemsByCatIds(catIds: string[]): Promise<FlatItem[]> {
  if (catIds.length === 0) return [];
  const { data } = await supabase
    .from("menu_items")
    .select("id, category_id, name, description, image_url, sort_order, tags")
    .in("category_id", catIds)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return (data ?? []).map(toFlatItem);
}

// ── Main menu content ─────────────────────────────────────────────────────
function MenuContent() {
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLElement>(null);

  const [tabs, setTabs] = useState<MenuTab[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMenu() {
      try {
        // 1. Fetch all active menus
        const { data: allMenus } = await supabase
          .from("menus")
          .select("id, name, sort_order")
          .eq("restaurant_id", supabaseClientId)
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (!allMenus || allMenus.length === 0) {
          setError("Menu currently unavailable. Please check back soon.");
          setLoading(false);
          return;
        }

        // 2. Identify ice cream menu(s) by menu name
        const iceMenuIds = allMenus.filter((m) => isIceName(m.name)).map((m) => m.id);
        const cupcakeMenuIds = allMenus.filter((m) => !isIceName(m.name)).map((m) => m.id);

        // 3. Fetch ALL categories across all menus in one query
        const { data: allCats } = await supabase
          .from("menu_categories")
          .select("id, name, menu_id, sort_order")
          .in("menu_id", allMenus.map((m) => m.id))
          .order("sort_order", { ascending: true });

        const cats = allCats ?? [];

        // 4. Separate ice cream categories
        let iceCatIds = cats.filter((c) => iceMenuIds.includes(c.menu_id)).map((c) => c.id);
        // If ice menus found nothing, look for ice cream by category name
        if (iceCatIds.length === 0) {
          iceCatIds = cats.filter((c) => isIceName(c.name)).map((c) => c.id);
        }

        // 5. Cupcake categories (not ice cream)
        const cupcakeCats = cats.filter(
          (c) => cupcakeMenuIds.includes(c.menu_id) && !iceCatIds.includes(c.id)
        );

        // 6. Try to split cupcake categories into monthly vs daily by category name
        let monthlyCatIds = cupcakeCats.filter((c) => isMonthlyName(c.name)).map((c) => c.id);
        let dailyCatIds   = cupcakeCats.filter((c) => isDailyName(c.name)).map((c) => c.id);

        // 7. Fallback: if category names don't help, split by menu position
        if (monthlyCatIds.length === 0 && dailyCatIds.length === 0) {
          if (cupcakeMenuIds.length >= 2) {
            monthlyCatIds = cupcakeCats.filter((c) => c.menu_id === cupcakeMenuIds[0]).map((c) => c.id);
            dailyCatIds   = cupcakeCats.filter((c) => c.menu_id === cupcakeMenuIds[1]).map((c) => c.id);
          } else {
            // Single cupcake menu: split categories in half by sort_order
            const half = Math.ceil(cupcakeCats.length / 2);
            monthlyCatIds = cupcakeCats.slice(0, half).map((c) => c.id);
            dailyCatIds   = cupcakeCats.slice(half).map((c) => c.id);
          }
        } else if (monthlyCatIds.length === 0) {
          // All matched daily — put the rest in monthly
          const dailySet = new Set(dailyCatIds);
          monthlyCatIds = cupcakeCats.filter((c) => !dailySet.has(c.id)).map((c) => c.id);
        } else if (dailyCatIds.length === 0) {
          // All matched monthly — put the rest in daily
          const monthlySet = new Set(monthlyCatIds);
          dailyCatIds = cupcakeCats.filter((c) => !monthlySet.has(c.id)).map((c) => c.id);
        }

        // 8. Fetch items for all 3 tabs in parallel
        const [monthlyItems, dailyItems, iceItems] = await Promise.all([
          fetchItemsByCatIds(monthlyCatIds),
          fetchItemsByCatIds(dailyCatIds),
          fetchItemsByCatIds(iceCatIds),
        ]);

        const result: MenuTab[] = [
          { id: "monthly", name: "Monthly Cupcakes", items: monthlyItems },
          { id: "daily",   name: "Daily Cupcakes",   items: dailyItems },
          { id: "ice",     name: "Ice Creams",        items: iceItems },
        ];
        setTabs(result);
        const tabParam = searchParams.get("tab");
        if (tabParam) {
          const idx = result.findIndex((t) => t.id === tabParam);
          if (idx !== -1) setActiveTab(idx);
        }
      } catch {
        setError("Menu currently unavailable. Please check back soon.");
      }
      setLoading(false);
    }
    loadMenu();
  }, []);

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
            src="/assets/hero_menu.webp"
            alt="Smallcakes menu"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <Image
              src="/assets/icono_hero_menu.webp"
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
              Our Menu
            </h1>
          </div>

          {/* Scalloped bottom edge */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
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

        {/* ─── STICKY TABS ──────────────────────────────────────── */}
        {!loading && !error && (
          <div
            className="sticky z-40 bg-white top-[60px] md:border-b md:shadow-[0_2px_16px_rgba(227,41,115,0.07)]"
            style={{ borderColor: "rgba(227,41,115,0.12)" }}
          >
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-3 py-4 px-4 md:py-5 whitespace-nowrap md:justify-center md:max-w-[1100px] md:mx-auto">
                {tabs.map((tab, idx) => {
                  const isActive = activeTab === idx;
                  const isIceCream = isIceName(tab.name);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(idx);
                        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-raleway font-bold text-[14px] transition-all duration-200 cursor-pointer shrink-0"
                      style={{
                        background: isActive ? "#e22873" : "#fccde7",
                        color: isActive ? "#ffffff" : "#e22873",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.background = "#e22873";
                          (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.background = "#fccde7";
                          (e.currentTarget as HTMLButtonElement).style.color = "#e22873";
                        }
                      }}
                    >
                      {isIceCream ? <IceCreamIcon size={28} /> : <CupcakeIcon size={28} />}
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── MENU CONTENT ─────────────────────────────────────── */}
        <section ref={contentRef} className="bg-white py-14 md:py-18 min-h-[40vh]">
          <div className="max-w-[1100px] mx-auto px-4">
            {loading && <Spinner />}

            {error && (
              <p className="text-center font-raleway py-20" style={{ color: "#87143D" }}>
                {error}
              </p>
            )}

            {!loading && !error && tabs[activeTab] && (
              <>
                {/* Section title */}
                <div className="flex flex-col items-center mb-12">
                  <h2
                    className="font-boorsok uppercase text-center"
                    style={{
                      fontSize: "clamp(26px, 4vw, 38px)",
                      color: "#E32973",
                      fontFeatureSettings: "'liga' off, 'clig' off",
                      textShadow: "0px 2.64px 7.92px rgba(135,20,61,0.35)",
                      WebkitTextStrokeWidth: "0.8px",
                      WebkitTextStrokeColor: "#FFF",
                      lineHeight: "1.15",
                    }}
                  >
                    {tabs[activeTab].name}
                  </h2>
                  <img
                    src="/assets/fondo_titulos.webp"
                    alt=""
                    aria-hidden="true"
                    style={{ height: "12px", width: "auto", marginTop: "8px" }}
                  />
                </div>

                {/* Grid */}
                {tabs[activeTab].items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                    {tabs[activeTab].items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        nameColor={tabs[activeTab].id === "ice" ? "#2E96AC" : "#87143D"}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-center font-raleway py-20 italic"
                    style={{ color: "rgba(135,20,61,0.5)" }}
                  >
                    Coming soon…
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {/* ─── ORDER CTA ────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20 text-center"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fff0f6 50%, #ffffff 100%)",
          }}
        >
          <div className="max-w-[1100px] mx-auto px-4">
            <div
              className="w-20 h-20 rounded-full relative overflow-hidden mx-auto mb-5"
              style={{ border: "2px dashed rgba(227,41,115,0.45)" }}
            >
              <Image
                src="/assets/icono_cupcake.webp"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <h2
              className="font-boorsok uppercase mb-3"
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                color: "#E32973",
                fontFeatureSettings: "'liga' off, 'clig' off",
                textShadow: "0px 2.64px 7.92px rgba(135,20,61,0.35)",
                WebkitTextStrokeWidth: "0.6px",
                WebkitTextStrokeColor: "#FFF",
              }}
            >
              Ready To Order?
            </h2>
            <p
              className="font-raleway text-[15px] leading-relaxed mb-8 max-w-[380px] mx-auto"
              style={{ color: "#87143D" }}
            >
              Order online for pickup — skip the line and enjoy fresh cupcakes on your schedule.
            </p>
            <a
              href="https://www.smallcakesgwinnettshop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-raleway font-bold text-[14px] uppercase tracking-wide px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)",
                boxShadow: "0 4px 20px rgba(227,41,115,0.32)",
              }}
            >
              Order Online
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function MenuPage() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}
