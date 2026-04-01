"use client";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  const isSpecial = isAdmin || isLogin;

  return (
    <LenisProvider>
      <CursorFollower />
      <ScrollProgress />
      {!isSpecial && <Navbar />}
      <main>{children}</main>
      {!isSpecial && <Footer />}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0e0e1e",
            color: "#f0f0f2",
            border: "1px solid rgba(200,146,15,0.2)",
            fontFamily: "Outfit,sans-serif",
          },
        }}
      />
    </LenisProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>LUXE TRAVEL — Cinematic Journeys</title>
        <meta
          name="description"
          content="Discover extraordinary destinations with immersive 3D experiences. Luxury travel, hotels, and flight booking redefined."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
