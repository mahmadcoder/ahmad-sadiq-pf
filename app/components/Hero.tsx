"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── GSAP Entrance Animation ── */
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3 })
      .fromTo(".hero-title span", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, "-=0.4")
      .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .fromTo(".hero-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 }, "-=0.5")
      .fromTo(".hero-visual", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=1.2")
      .fromTo(".hero-visual-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] pt-32 pb-16 md:pb-24 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 -z-20"></div>
      <div className="absolute inset-0 hero-gradient -z-20"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container/20 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary-container/10 blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none"></div>
      
      <div className="relative z-10 max-w-5xl px-6 md:px-8 text-center mt-8 md:mt-0">
        <div className="hero-badge mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/30 border border-outline-variant/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">Available for new projects</span>
        </div>
        
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-headline font-extrabold tracking-tight text-white mb-6 md:mb-8 leading-[1.05]">
          <span className="inline-block">Engineering the Next Generation of</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container inline-block">Web Apps</span>
        </h1>
        
        <p className="hero-desc text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 md:mb-12 font-body leading-relaxed">
          Hi! I'm Ahmad Sadiq, a Next.js Developer based in Pakistan.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          <a onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) }}
             className="hero-btn cursor-pointer w-full sm:w-auto min-w-[200px] flex justify-center group relative px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-label font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary-container/20" href="#projects">
            <span className="relative z-10 flex items-center gap-2">
              Show my work
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
          </a>
          <a onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }}
             className="hero-btn cursor-pointer w-full sm:w-auto min-w-[200px] flex justify-center px-8 py-4 bg-surface-container-high/50 border border-outline-variant/20 hover:bg-surface-container-highest transition-colors rounded-lg font-label font-bold text-white" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
