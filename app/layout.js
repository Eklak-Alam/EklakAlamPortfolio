import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";

// --- 1. CONFIGURATION ---
const SITE_DOMAIN = "https://eklak.site"; 
const SITE_NAME = "Eklak Alam";
const SOCIAL_HANDLE = "@eklak__alam";

// --- 2. METADATA (Professional & SEO Optimized) ---
export const metadata = {
  metadataBase: new URL(SITE_DOMAIN),
  title: {
    default: "Eklak Alam | DevOps & Full Stack Engineer",
    template: "%s | Eklak Alam"
  },
  // REFINED DESCRIPTION: Professional, standard-level (No "Portfolio" spam)
  description: "Building scalable cloud infrastructure and high-performance web applications. Specializing in Next.js, Kubernetes, AWS, and automated CI/CD pipelines for modern engineering teams.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_DOMAIN }],
  generator: "Next.js 15",
  keywords: [
    "DevOps Engineer",
    "Full Stack Architecture",
    "Cloud Native Computing",
    "Kubernetes Orchestration",
    "AWS Infrastructure",
    "Next.js Performance",
    "CI/CD Automation",
    "Docker Containerization",
    "System Design",
    "React Engineering"
  ],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  // ICONS: This makes your Square Logo look perfect in the browser tab
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  // OPEN GRAPH: Optimized for sharing on LinkedIn/WhatsApp
  openGraph: {
    title: "Eklak Alam | Cloud & Software Engineering",
    description: "Architecting scalable systems with Next.js and Cloud Native technologies.",
    url: SITE_DOMAIN,
    siteName: SITE_NAME,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/logo.png", // Using your square logo
        width: 800,       // Setting distinct dimensions
        height: 800,      // to prevent stretching
        alt: "Eklak Alam - Engineering",
      },
    ],
  },
  twitter: {
    card: "summary", // Changed to 'summary' (better for square logos than 'large_image')
    title: "Eklak Alam | Cloud & Code",
    description: "Building scalable infrastructure and modern web apps.",
    creator: SOCIAL_HANDLE, 
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// --- 3. VIEWPORT ---
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" }, 
  ],
};

// --- 4. SCHEMA (Rich Results) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "DevOps & Full Stack Engineer",
  url: SITE_DOMAIN,
  image: `${SITE_DOMAIN}/logo.png`, // Using logo as your primary entity image
  sameAs: [
    "https://github.com/Eklak-Alam",
    "https://www.linkedin.com/in/eklak-alam/",
    "https://x.com/eklak__alam"
  ],
  knowsAbout: [
    { "@type": "SoftwareApplication", name: "Cloud Computing" },
    { "@type": "SoftwareApplication", name: "DevOps Automation" },
    { "@type": "SoftwareApplication", name: "Full Stack Development" },
    { "@type": "SoftwareApplication", name: "Distributed Systems" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Next.js handles metadata. Only adding Fonts & Scripts here. */}
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Theme Script (Anti-Flicker) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var preferredTheme = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;
                  
                  document.documentElement.classList.toggle('dark', preferredTheme === 'dark');
                  document.documentElement.classList.toggle('light', preferredTheme === 'light');
                  document.documentElement.style.colorScheme = preferredTheme;
                  document.documentElement.style.backgroundColor = preferredTheme === 'dark' ? '#050505' : '#ffffff';
                } catch (e) {}
              })()
            `,
          }}
        />
        
        {/* Engineering Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .js-focus-visible :focus:not(.focus-visible) { outline: none; }
            .focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
            ::-webkit-scrollbar { width: 10px; }
            ::-webkit-scrollbar-track { background: #050505; }
            ::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; border: 2px solid #050505; }
            ::-webkit-scrollbar-thumb:hover { background: #555; }
            html.lenis-stopped { overflow: hidden; }
          `
        }} />
      </head>
      
      <body className="antialiased transition-colors duration-300 ease-in-out bg-white dark:bg-[#050505] text-neutral-900 dark:text-neutral-200 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider>
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen relative flex flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <Analytics />
          
          {/* Boot Loader */}
          <div 
            id="global-loader" 
            className="fixed inset-0 bg-white dark:bg-[#050505] z-[9999] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-12 h-12">
                  <div className="absolute inset-0 border-t-2 border-l-2 border-neutral-200 dark:border-neutral-800 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-b-2 border-r-2 border-black dark:border-white rounded-full animate-spin duration-500"></div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-black dark:text-white">System Boot</p>
                <p className="text-[10px] font-mono text-neutral-400 mt-1">Initializing Environment...</p>
              </div>
            </div>
          </div>

          {/* Error Trap */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  window.addEventListener('error', (e) => console.error('SYS_ERR:', e.error));
                })()
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}