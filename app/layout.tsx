"use client";
import { Lora } from "next/font/google";
import Header from "@/components/header"
import './globals.css';

const lora = Lora({
  variable: "--Lora",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
