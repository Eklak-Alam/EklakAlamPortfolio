import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";
// Removed 'next/head' as it is not used in App Router
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";

// 1. Standard Metadata (SEO)
export const metadata = {
  title: "Eklak Alam | Full Stack Developer",
  description: "Eklak Alam - Full Stack Developer, Designer, and Content Creator specializing in modern web technologies and creative digital solutions.",
  keywords: "Eklak Alam, portfolio, developer, designer, full stack, web development, React, Next.js, JavaScript",
  author: "Eklak Alam",
  openGraph: {
    title: "Eklak Alam | Full Stack Developer & Designer",
    description: "Eklak Alam showcasing professional projects and skills",
    url: "https://eklakaalam.vercel.app",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eklak Alam Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eklak Alam | Full Stack Developer & Designer",
    description: "Portfolio of Eklak Alam showcasing professional projects and skills",
    creator: "@eklakaalam",
    images: ["/og-image.jpg"],
  },
};

// 2. Separate Viewport Export (REQUIRED for Next.js 15)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preload important resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet"
        />

        {/* Prevent flash of unstyled content (Theme Script) */}
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
                  document.documentElement.style.backgroundColor = preferredTheme === 'dark' ? '#000000' : '#ffffff';
                } catch (e) {}
              })()
            `,
          }}
        />
        
        {/* Focus Visible Polyfill */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .js-focus-visible :focus:not(.focus-visible) { outline: none; }
            .focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
          `
        }} />
      </head>
      
      <body className="antialiased transition-colors duration-300 ease-in-out bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider>
          {/* System preference detection */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  function updateTheme() {
                    const savedTheme = localStorage.getItem('theme');
                    const systemPrefersDark = mediaQuery.matches;
                    if (savedTheme === 'system' || !savedTheme) {
                      document.documentElement.classList.toggle('dark', systemPrefersDark);
                      document.documentElement.classList.toggle('light', !systemPrefersDark);
                      document.documentElement.style.colorScheme = systemPrefersDark ? 'dark' : 'light';
                    }
                  }
                  mediaQuery.addEventListener('change', updateTheme);
                  updateTheme();
                })()
              `,
            }}
          />

          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          
          <Analytics />
          
          {/* Global Loading Indicator */}
          <div 
            id="global-loader" 
            className="fixed inset-0 bg-white dark:bg-black z-[9999] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500"
            aria-hidden="true"
          >
            <div className="text-center">
              <div className="w-12 h-12 border-3 border-gray-300 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
            </div>
          </div>

          {/* Error Boundary Recovery Script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  window.addEventListener('error', function(e) {
                    console.log('Global error caught:', e.error);
                  });
                  window.addEventListener('unhandledrejection', function(e) {
                    console.log('Unhandled promise rejection:', e.reason);
                    // e.preventDefault(); // Optional: prevent default console error
                  });
                })()
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}