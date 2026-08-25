import type { Metadata } from "next";
import { display, sans } from "@/lib/fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { clinic } from "@/content/clinic";
import "./globals.css";

const title = `${clinic.name} — Calm, clear dental care`;
const description =
  "A three-dentist practice offering general, orthodontic, children's, restorative, and surgical care — with clear explanations and costs before treatment begins.";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: title,
    template: `%s · ${clinic.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: clinic.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-porcelain font-sans text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal-io')`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-teal focus:px-5 focus:py-3 focus:font-semibold focus:text-porcelain"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <noscript>
          <style>{`.reveal,.reveal-stagger>*{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Footer />
      </body>
    </html>
  );
}
