import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";

// 1. METADATA: Full Stack + DevOps Focused
export const metadata = {
  title: {
    default: "Eklak Alam | Full Stack & DevOps Engineer",
    template: "%s | Eklak Alam"
  },
  description: "Eklak Alam is a Full Stack Engineer & Cloud Practitioner. Building end-to-end applications with Next.js, deploying on AWS/Kubernetes, and automating pipelines.",
  applicationName: "Eklak Alam Portfolio",
  authors: [{ name: "Eklak Alam", url: "https://eklakaalam.vercel.app" }],
  generator: "Next.js 15",
  keywords: [
    "Full Stack Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Kubernetes",
    "Docker",
    "AWS",
    "Next.js",
    "React",
    "Node.js",
    "CI/CD Pipelines",
    "Infrastructure as Code",
    "System Design"
  ],
  creator: "Eklak Alam",
  publisher: "Eklak Alam",
  metadataBase: new URL('https://eklakaalam.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Eklak Alam | Code, Cloud & Infrastructure",
    description: "Full Stack Engineer specializing in modern web apps and cloud-native deployments.",
    url: "https://eklakaalam.vercel.app",
    siteName: "Eklak Alam | Engineering Portfolio",
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Eklak Alam - Full Stack & DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eklak Alam | Full Stack & DevOps",
    description: "Building scalable apps and the infrastructure they run on.",
    creator: "@dev_eklak", 
    images: ["/og-image.jpg"],
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

// 2. Viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" }, 
  ],
};

// 3. SCHEMA: Accurate Role Definition
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eklak Alam",
  jobTitle: "Full Stack & DevOps Engineer",
  url: "https://eklakaalam.vercel.app",
  image: "https://eklakaalam.vercel.app/avatar.jpg",
  sameAs: [
    "https://github.com/Eklak-Alam",
    "https://www.linkedin.com/in/eklak-alam/",
    "https://x.com/dev_eklak"
  ],
  knowsAbout: [
    { "@type": "SoftwareApplication", name: "Full Stack Development" },
    { "@type": "SoftwareApplication", name: "Cloud Computing" },
    { "@type": "SoftwareApplication", name: "DevOps" },
    { "@type": "SoftwareApplication", name: "Kubernetes" },
    { "@type": "SoftwareApplication", name: "AWS" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts: Inter (UI), JetBrains Mono (Code), Space Grotesk (Headers) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Theme Script */}
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
            
            /* Custom Scrollbar */
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
          
          {/* SYSTEM BOOT LOADER (Engineering Style) */}
          <div 
            id="global-loader" 
            className="fixed inset-0 bg-white dark:bg-[#050505] z-[9999] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Technical Loader */}
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

          {/* Console Error Trap */}
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