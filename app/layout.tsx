import type { Metadata } from "next";
import { Work_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { NavigationDock } from "@/components/NavigationDock";
import { Preloader } from "@/components/Preloader";
import { LoadingProvider } from "@/context/LoadingContext";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manoharachar.design"),
  title: {
    template: "%s | Product Designer",
    default: "Manohar | Product Designer",
  },
  description: "Product designer with an engineering backbone and a systems-first mindset.",
  openGraph: {
    title: "Manohar Achar | Product Designer",
    description: "Product designer with an engineering backbone and a systems-first mindset.",
    type: "website",
    locale: "en_US",
    url: "https://manoharachar.design",
    siteName: "Manohar | Product Designer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manohar Achar | Product Designer",
    description: "Product designer with an engineering backbone and a systems-first mindset.",
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
      <body
        className={cn(
          "min-h-screen bg-[#F6F4EF] font-sans antialiased text-foreground selection:bg-accent selection:text-accent-foreground",
          workSans.variable,
          sourceSerif.variable
        )}
      >
        <LoadingProvider>
          {/* Global Loading Provider used for sync */}
          <TopBar />
          <main id="main-content" className="flex-grow pt-24 min-h-screen">
            {children}
          </main>
          <NavigationDock />
          <Footer />
          <Preloader />
        </LoadingProvider>
      </body>
    </html>
  );
}
