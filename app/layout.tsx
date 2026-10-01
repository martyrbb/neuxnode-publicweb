import type { Metadata, Viewport } from "next";
import { Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Click from "@/animations/Click";
import { getSiteConfig, AppProvider } from "@/lib/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const config = getSiteConfig();

export const viewport: Viewport = {
  themeColor: config.site.themeColor,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `Neuxnode | Hosting without the chaos`,
    template: `%s | ${config.site.name}`,
  },
  description: config.site.description,
  metadataBase: new URL(config.site.url),
  icons: {
    icon: [
      { url: config.site.logo, href: config.site.logo },
      { url: "/favicon.ico", href: "/favicon.ico" }
    ],
    apple: [
      { url: config.site.logo, href: config.site.logo }
    ],
  },
  openGraph: {
    title: config.site.name,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.name,
    images: [
      {
        url: config.site.ogImage,
        width: 1200,
        height: 630,
        alt: `${config.site.name} - Premium Hosting`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.name,
    description: config.site.description,
    creator: config.site.twitter,
    images: [config.site.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(montserrat.variable, "font-sans", geist.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={`${montserrat.className} antialiased bg-black text-zinc-100 min-h-screen`}>
        <AppProvider config={config}>
          <Click />
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 relative">
              {children}
            </main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}