import "./global.css";
import 'keen-slider/keen-slider.min.css'

import Script from "next/script";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

import { MenuNav } from "./components/MenuNav";
import { Footer } from "./components/Footer";
import { ClientTransition } from "./components/ClientTransition";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahmad Sadiq",
  description: "Front‑end developer in Multan, Pakistan building fast React & Next.js apps. Passionate about performance, REST API integration, and clean UI with Tailwind CSS.",
};

export default function RootLayout({  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <head>
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ahmad Sadiq - Front-end Developer" />
        <meta
          property="og:description"
          content="Front‑end developer in Multan, Pakistan building fast React & Next.js apps. Passionate about performance, REST API integration, and clean UI with Tailwind CSS."
        />
        <meta
          property="og:image"
          content="/images/cover-site.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="/" />
        <meta name="twitter:title" content="Ahmad Sadiq - Front-end Developer" />
        <meta
          name="twitter:description"
          content="Front‑end developer in Multan, Pakistan building fast React & Next.js apps. Passionate about performance, REST API integration, and clean UI with Tailwind CSS."
        />
        <meta name="twitter:image" content="/images/cover-site.png" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>

      <body className={raleway.className}>
        <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-0T9BHVMG9L" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-0T9BHVMG9L');
            `,
          }}
        />
        <MenuNav />
        <ClientTransition>
          {children}
        </ClientTransition>
        <Footer />
      </body>
    </html>
  );
}
