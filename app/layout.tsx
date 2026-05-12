import type { Metadata } from "next";
import "./globals.css";
import ScrollToTopButton from "./components/ScrollToTopButton";

export const metadata: Metadata = {
  title: "Smallcakes Cupcakery & Creamery – Gwinnett | Gourmet Cupcakes & Ice Cream",
  description:
    "Home of the Smallcakes Smash. Gourmet cupcakes & small batch ice cream in Snellville and Buford, GA. Award-winning cupcakery for 8 consecutive years.",
  keywords: [
    "smallcakes",
    "cupcakes",
    "gwinnett",
    "snellville",
    "buford",
    "georgia",
    "ice cream",
    "bakery",
    "gourmet cupcakes",
    "smallcakes smash",
  ],
  openGraph: {
    title: "Smallcakes Cupcakery & Creamery – Gwinnett",
    description:
      "Home of the Smallcakes Smash. Gourmet cupcakes & small batch ice cream in Snellville and Buford, GA.",
    url: "https://smallcakesgwinnett.com",
    siteName: "Smallcakes Gwinnett",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smallcakes Cupcakery & Creamery – Gwinnett",
    description: "Home of the Smallcakes Smash. Gourmet cupcakes & small batch ice cream.",
  },
  metadataBase: new URL("https://smallcakesgwinnett.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased font-raleway text-brand-text bg-white">
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
