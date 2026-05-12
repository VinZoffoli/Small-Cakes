"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { supabase, supabaseClientId } from "@/lib/supabase";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  items: MenuItem[];
}

interface MenuTab {
  id: string;
  name: string;
  categories: MenuCategory[];
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-lg border border-brand-soft overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {item.image_url && (
        <div className="aspect-square overflow-hidden bg-brand-soft">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-raleway font-black text-[18px] text-brand-medium leading-tight">
          {item.name}
        </h3>
        {item.description && (
          <p className="font-raleway text-[16px] text-brand-text mt-1 leading-[24px]">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

function MenuContent() {
  const [tabs, setTabs] = useState<MenuTab[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function loadMenu() {
      const { data: menus, error: menusErr } = await supabase
        .from("menus")
        .select("id, name, sort_order")
        .eq("restaurant_id", supabaseClientId)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (menusErr || !menus || menus.length === 0) {
        setError("Menu currently unavailable. Please check back soon.");
        setLoading(false);
        return;
      }

      const menuIds = menus.map((m) => m.id);

      const { data: categories, error: catsErr } = await supabase
        .from("menu_categories")
        .select("id, menu_id, name, sort_order")
        .in("menu_id", menuIds)
        .order("sort_order", { ascending: true });

      if (catsErr || !categories || categories.length === 0) {
        setError("Menu currently unavailable. Please check back soon.");
        setLoading(false);
        return;
      }

      const catIds = categories.map((c) => c.id);

      const { data: items, error: itemsErr } = await supabase
        .from("menu_items")
        .select("id, category_id, name, description, image_url, sort_order")
        .in("category_id", catIds)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (itemsErr) {
        setError("Menu currently unavailable. Please check back soon.");
        setLoading(false);
        return;
      }

      const result: MenuTab[] = menus.map((menu) => {
        const menuCats = categories
          .filter((c) => c.menu_id === menu.id)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((cat) => ({
            id: cat.id,
            name: cat.name,
            sort_order: cat.sort_order,
            items: (items ?? [])
              .filter((item) => item.category_id === cat.id)
              .map((item) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                image_url: item.image_url,
                sort_order: item.sort_order,
              })),
          }));

        return {
          id: menu.id,
          name: menu.name,
          categories: menuCats,
        };
      });

      setTabs(result);
      setLoading(false);
    }

    loadMenu();
  }, []);

  const headerHeight = scrolled ? 60 : 80;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft to-white py-20 md:py-28">
          <div className="max-w-[1140px] mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-4">
            <Image
              src="/assets/icono_hero_menu.webp"
              alt=""
              width={90}
              height={90}
              className="object-contain h-[80px] w-auto"
              aria-hidden="true"
            />
            <h1 className="font-boorsok text-[48px] md:text-[60px] text-brand leading-[1.05]">
              Our Menu
            </h1>
            <p className="font-raleway text-[16px] md:text-[18px] text-brand-text font-light max-w-[400px] leading-relaxed">
              Fresh-baked daily — gourmet cupcakes, creamy ice cream, and rotating monthly specials.
            </p>
          </div>
        </section>

        {/* Sticky Tabs */}
        {!loading && !error && tabs.length > 0 && (
          <div
            className="sticky z-40 bg-white border-b border-brand-light shadow-sm"
            style={{ top: `${headerHeight}px` }}
          >
            <div
              ref={tabsRef}
              className="max-w-[1140px] mx-auto px-4 md:px-6 overflow-x-auto scrollbar-hide"
            >
              <div className="flex items-center gap-2 md:gap-3 py-3 whitespace-nowrap justify-start md:justify-center">
                {tabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 md:px-10 py-2.5 rounded-[10px] font-raleway font-black text-[14px] md:text-[15px] transition-colors shrink-0 ${
                      activeTab === idx
                        ? "bg-brand text-white"
                        : "bg-brand-light text-brand hover:bg-brand hover:text-white"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-[1140px] mx-auto px-4 md:px-6 py-12 pb-20">
          {loading && <LoadingSpinner />}

          {error && (
            <p className="text-center font-raleway text-brand-text py-20">{error}</p>
          )}

          {!loading && !error && tabs[activeTab] && (
            <div>
              {tabs[activeTab].categories.map((cat) => (
                <div key={cat.id} className="mb-16">
                  <h2 className="font-boorsok text-[28px] md:text-[32px] text-brand mb-8 text-center">
                    {cat.name}
                  </h2>
                  {cat.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.items.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-center font-raleway text-brand-text/60 italic py-8">
                      Coming soon...
                    </p>
                  )}
                </div>
              ))}

              {tabs[activeTab].categories.length === 0 && (
                <p className="text-center font-raleway text-brand-text/60 italic py-20">
                  Coming soon...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Order CTA */}
        <section className="py-16 bg-brand-soft text-center">
          <h2 className="font-boorsok text-[28px] md:text-[32px] text-brand mb-4">
            Ready to Order?
          </h2>
          <p className="font-raleway text-[16px] text-brand-text mb-8 max-w-[380px] mx-auto leading-relaxed">
            Order online for pickup — skip the line and enjoy fresh cupcakes on your schedule.
          </p>
          <a
            href="https://www.smallcakesgwinnettshop.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-raleway font-bold text-[15px] uppercase tracking-wide px-10 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #E32973 0%, #C41254 100%)", boxShadow: "0 4px 14px rgba(227,41,115,0.28)" }}
          >
            Order Online
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense>
      <MenuContent />
    </Suspense>
  );
}
