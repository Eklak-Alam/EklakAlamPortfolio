import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Head from 'next/head';
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Eklak Alam | Full Stack Developer & Designer",
  description: "Portfolio of Eklak Alam - Full Stack Developer, Designer, and Content Creator specializing in modern web technologies and creative digital solutions.",
  keywords: "Eklak Alam, portfolio, developer, designer, full stack, web development, React, Next.js, JavaScript",
  author: "Eklak Alam",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#1e293b",
  openGraph: {
    title: "Eklak Alam | Full Stack Developer & Designer",
    description: "Portfolio of Eklak Alam showcasing professional projects and skills",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* font link here  */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Outfit:wght@100..900&family=Quicksand:wght@300..700&family=Rubik:ital,wght@0,300..900;1,300..900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />



        
        {/* Preload important resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" 
          rel="stylesheet"
        />
      </Head>
      
      <body className="bg-slate-900 text-slate-100 antialiased">
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          
          {/* Global loading indicator (optional) */}
          <div id="global-loader" className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}