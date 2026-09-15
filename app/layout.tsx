import type { Metadata } from "next";
import { inter } from "./fonts";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import TCursor from "@/components/TCursor";

export const metadata: Metadata = {
  title: "Dhaka Visuals",
  description: "Premium Audio Visual Production Company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} flex min-h-screen flex-col bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}>
        <TCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}