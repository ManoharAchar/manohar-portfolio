import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { NavigationDock } from "@/components/NavigationDock";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { LoadingProvider } from "@/context/LoadingContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Product Designer",
    default: "Manohar | Product Designer",
  },
  description: "Product designer with an engineering backbone and a systems-first mindset.",
  openGraph: {
    title: "Manohar | Product Designer",
    description: "Product designer with an engineering backbone and a systems-first mindset.",
    type: "website",
    locale: "en_US",
    siteName: "Manohar Portfolio",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-[#F6F4EF] font-sans antialiased text-foreground selection:bg-accent selection:text-accent-foreground",
          inter.variable,
          archivo.variable
        )}
      >
        <LoadingProvider>
          {/* Global Loading Provider used for sync */}
          <Preloader />
          <SmoothScroll />
          <TopBar />
          <main id="main-content" className="flex-grow pt-24 min-h-screen">
            {children}
          </main>
          <NavigationDock />
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
