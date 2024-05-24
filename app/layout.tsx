import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; 

const inter = Inter({ subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
 });

export const metadata: Metadata = {
  title: "BukBlend",
  description: "Streamline textbook transactions for students with our easy-to-use online marketplace. Buy and sell textbooks effortlessly, connecting with fellow students hassle-free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
