import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/utils/fonts";



export const metadata: Metadata = {
  title: "Rudraksha",
  description: "A simple e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen text-black overflow-x-hidden` }
      >
        {children}
      </body>
    </html>
  );
}
