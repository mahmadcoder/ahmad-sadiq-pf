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

import { getSiteUrl } from "@/app/lib/site";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ahmad Sadiq | Full Stack & Next.js Developer",
    template: "%s | Ahmad Sadiq",
  },
  description:
    "Ahmad Sadiq is a Full Stack Developer & Next.js specialist building fast, scalable, and visually stunning web applications with modern architectures.",
  keywords: [
    "Ahmad Sadiq",
    "Ahmad Sadiq developer",
    "Ahmad Sadiq portfolio",
    "Muhammad Ahmad Sadiq",
    "Next.js Developer",
    "Full Stack Developer",
    "Frontend Engineer",
    "React Developer",
    "TypeScript",
    "GSAP Animation",
    "TailwindCSS",
    "Web Developer Pakistan",
    "Freelance Next.js Developer",
  ],
  authors: [{ name: "Ahmad Sadiq", url: SITE_URL }],
  creator: "Ahmad Sadiq",
  publisher: "Ahmad Sadiq",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Ahmad Sadiq | Full Stack & Next.js Developer",
    description:
      "Ahmad Sadiq is a Full Stack Developer & Next.js specialist building fast, scalable, and visually stunning web applications.",
    siteName: "Ahmad Sadiq Portfolio",
    images: [
      {
        url: "/projects/physician-meds.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Sadiq — Portfolio & Selected Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Sadiq | Full Stack & Next.js Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, TypeScript, and modern web architectures.",
    images: ["/projects/physician-meds.png"],
    creator: "@mahmadcoder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ahmad Sadiq",
      alternateName: ["Muhammad Ahmad Sadiq", "mahmadcoder"],
      url: SITE_URL,
      jobTitle: "Full Stack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
      sameAs: [
        "https://github.com/mahmadcoder",
        "https://www.linkedin.com/in/devahmad-sadiq/",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "GSAP",
        "TailwindCSS",
        "Full Stack Web Development",
        "Node.js",
        "Supabase",
      ],
      description:
        "Full Stack Developer specializing in Next.js, TypeScript, and modern web applications.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ahmad Sadiq - Full Stack & Next.js Developer",
      description:
        "Official portfolio of Ahmad Sadiq, Full Stack Developer & Next.js Engineer.",
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
