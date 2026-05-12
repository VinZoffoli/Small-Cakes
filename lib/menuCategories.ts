import { supabase, supabaseClientId } from "./supabase";

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

const isIceName     = (s: string) => { const n = s.toLowerCase(); return ICE_KW.some((k)     => n.includes(k)); };
const isMonthlyName = (s: string) => { const n = s.toLowerCase(); return MONTHLY_KW.some((k) => n.includes(k)); };
const isDailyName   = (s: string) => { const n = s.toLowerCase(); return DAILY_KW.some((k)   => n.includes(k)); };

export interface CategoryIds {
  monthlyCatIds: string[];
  dailyCatIds: string[];
  iceCatIds: string[];
}

let cachedResult: CategoryIds | null = null;

export async function classifyMenuCategories(): Promise<CategoryIds> {
  if (cachedResult) return cachedResult;

  const { data: allMenus } = await supabase
    .from("menus")
    .select("id, name, sort_order")
    .eq("restaurant_id", supabaseClientId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (!allMenus || allMenus.length === 0) {
    return { monthlyCatIds: [], dailyCatIds: [], iceCatIds: [] };
  }

  const iceMenuIds     = allMenus.filter((m) => isIceName(m.name)).map((m) => m.id);
  const cupcakeMenuIds = allMenus.filter((m) => !isIceName(m.name)).map((m) => m.id);

  const { data: allCats } = await supabase
    .from("menu_categories")
    .select("id, name, menu_id, sort_order")
    .in("menu_id", allMenus.map((m) => m.id))
    .order("sort_order", { ascending: true });

  const cats = allCats ?? [];

  // Ice cream: prefer dedicated ice menu, fall back to category names
  let iceCatIds = cats.filter((c) => iceMenuIds.includes(c.menu_id)).map((c) => c.id);
  if (iceCatIds.length === 0) {
    iceCatIds = cats.filter((c) => isIceName(c.name)).map((c) => c.id);
  }

  // Cupcake categories (everything that's not ice cream)
  const cupcakeCats = cats.filter(
    (c) => cupcakeMenuIds.includes(c.menu_id) && !iceCatIds.includes(c.id)
  );

  // Split cupcake categories into monthly vs daily by category name
  let monthlyCatIds = cupcakeCats.filter((c) => isMonthlyName(c.name)).map((c) => c.id);
  let dailyCatIds   = cupcakeCats.filter((c) => isDailyName(c.name)).map((c) => c.id);

  // Fallback when category names give no signal
  if (monthlyCatIds.length === 0 && dailyCatIds.length === 0) {
    if (cupcakeMenuIds.length >= 2) {
      monthlyCatIds = cupcakeCats.filter((c) => c.menu_id === cupcakeMenuIds[0]).map((c) => c.id);
      dailyCatIds   = cupcakeCats.filter((c) => c.menu_id === cupcakeMenuIds[1]).map((c) => c.id);
    } else {
      const half = Math.ceil(cupcakeCats.length / 2);
      monthlyCatIds = cupcakeCats.slice(0, half).map((c) => c.id);
      dailyCatIds   = cupcakeCats.slice(half).map((c) => c.id);
    }
  } else if (monthlyCatIds.length === 0) {
    const dailySet = new Set(dailyCatIds);
    monthlyCatIds = cupcakeCats.filter((c) => !dailySet.has(c.id)).map((c) => c.id);
  } else if (dailyCatIds.length === 0) {
    const monthlySet = new Set(monthlyCatIds);
    dailyCatIds = cupcakeCats.filter((c) => !monthlySet.has(c.id)).map((c) => c.id);
  }

  cachedResult = { monthlyCatIds, dailyCatIds, iceCatIds };
  return cachedResult;
}
