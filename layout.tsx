import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DashboardShell } from "@/Component/DashboardShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jb",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paymesh | Payment operations",
  description: "A clear view of your payment operations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
