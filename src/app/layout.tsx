import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Session from "@/context/session-provider";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "10 tips",
  description: "Get advice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          "dark:bg-black bg-white text-black dark:text-white min-h-screen"
        }
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Session>
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-between ">
              {children}
            </div>
            <Footer />
          </Session>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
