import type { Metadata } from "next";
import { Manrope, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/app/components/ClientWrapper";
import Navbar from "@/app/components/Navbar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "400", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ahmad Sadiq | Next.js Developer",
  description:
    "Full Stack Developer specializing in Next.js, TypeScript, and modern web technologies. I help businesses build fast, scalable, and visually stunning web applications — from idea to deployment.",
     keywords: [
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Ahmad Sadiq",
  ],
  openGraph: {
    title: "Ahmad Sadiq — Digital Architect & Full Stack Developer",
    description:
      "I help businesses build fast, scalable, and visually stunning web applications.",
    url: "https://yourwebsite.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${manrope.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body bg-background text-on-surface selection:bg-primary-container selection:text-white overflow-x-hidden">
        <ClientWrapper>
          <Navbar />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
