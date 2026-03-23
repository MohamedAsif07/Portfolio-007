import type { Metadata } from "next";
import { Syne_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const syneMono = Syne_Mono({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-syne-mono",
});

export const metadata: Metadata = {
  title: "Mohamed Asif | Android Dev & Cybersecurity",
  description: "Portfolio of Mohamed Asif — Android developer, cybersecurity enthusiast, and automation engineer from Chennai.",
  openGraph: {
    images: ['/og-image.png']
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syneMono.variable} antialiased bg-[#121212] text-white selection:bg-[#00FF94] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
