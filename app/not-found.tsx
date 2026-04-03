"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Glitch effect on the 404 text
  useGSAP(() => {
    const tl = gsap.timeline();

    // Entrance animations
    tl.fromTo(
      ".notfound-badge",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    )
      .fromTo(
        ".notfound-title",
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".notfound-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".notfound-code",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".notfound-actions",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );

    // Glitch loop on 404 number
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
    glitchTl
      .to(".glitch-text", {
        skewX: 5,
        textShadow: "3px 0 #0070f3, -3px 0 #ff4444",
        duration: 0.08,
      })
      .to(".glitch-text", {
        skewX: -3,
        textShadow: "-2px 0 #0070f3, 2px 0 #ff4444",
        duration: 0.06,
      })
      .to(".glitch-text", {
        skewX: 0,
        textShadow: "none",
        duration: 0.08,
      })
      .to(".glitch-text", {
        skewX: 2,
        textShadow: "1px 0 #aec6ff, -1px 0 #ff6666",
        duration: 0.05,
      })
      .to(".glitch-text", {
        skewX: 0,
        textShadow: "none",
        duration: 0.1,
      });
  }, { scope: containerRef });

  // Spotlight follow cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Radial spotlight that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 112, 243, 0.08), transparent 60%)`,
        }}
      />

      {/* Decorative ambient glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating code fragments */}
      <div className="absolute top-[15%] left-[8%] text-white/[0.04] font-label text-sm rotate-[-12deg] select-none pointer-events-none hidden md:block">
        {"<Route path=\"/*\" />"}
      </div>
      <div className="absolute top-[25%] right-[10%] text-white/[0.04] font-label text-xs rotate-[8deg] select-none pointer-events-none hidden md:block">
        {"throw new Error('NOT_FOUND')"}
      </div>
      <div className="absolute bottom-[20%] left-[12%] text-white/[0.04] font-label text-xs rotate-[6deg] select-none pointer-events-none hidden md:block">
        {"return res.status(404).json({})"}
      </div>
      <div className="absolute bottom-[30%] right-[8%] text-white/[0.04] font-label text-sm rotate-[-5deg] select-none pointer-events-none hidden md:block">
        {"// TODO: fix this route"}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Badge */}
        <div className="notfound-badge inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container-high rounded-full mb-8 border border-white/5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse shadow-[0_0_8px_var(--color-error)]" />
          <span className="font-label text-[10px] tracking-[0.2em] uppercase text-error font-bold">
            Page Not Found
          </span>
        </div>

        {/* Giant 404 */}
        <div ref={glitchRef} className="notfound-title relative mb-4">
          <h1 className="glitch-text font-headline text-[min(40vw,220px)] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/[0.03] select-none">
            404
          </h1>
          {/* Subtle line underneath */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-container to-transparent rounded-full" />
        </div>

        {/* Subtitle */}
        <div className="notfound-subtitle mt-6 mb-8">
          <h2 className="font-headline text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
            Lost in the void
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Code snippet card */}
        <div className="notfound-code w-full max-w-md mb-10">
          <div className="bg-surface-container-low border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-container border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-label text-[10px] text-gray-500 tracking-wider uppercase ml-2">
                terminal
              </span>
            </div>
            {/* Code content */}
            <div className="px-5 py-4 font-label text-xs md:text-sm leading-relaxed">
              <div className="flex gap-2">
                <span className="text-gray-500 select-none">$</span>
                <span className="text-primary">curl</span>
                <span className="text-gray-400">-s this-page</span>
              </div>
              <div className="mt-2 text-error/80">
                {"{"} &quot;status&quot;: <span className="text-error">404</span>, &quot;message&quot;: <span className="text-[#febc2e]">&quot;Not Found&quot;</span> {"}"}
              </div>
              <div className="flex gap-2 mt-3">
                <span className="text-gray-500 select-none">$</span>
                <span className="text-gray-500 animate-pulse">▌</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="notfound-actions flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto glass-gradient text-white font-label text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-0.5">
              arrow_back
            </span>
            Go Home
          </Link>
          <Link
            href="/#contact"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-surface-container-high text-white font-label text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full border border-white/10 hover:border-primary/30 hover:bg-surface-container-highest hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-base text-primary">
              mail
            </span>
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
