// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOEFL CBT - Piksi Ganesha",
  description: "Computer Based Test and AI Learning Analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50/50">
        <main>{children}</main>
      </body>
    </html>
  );
}
