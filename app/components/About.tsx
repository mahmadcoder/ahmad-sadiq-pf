"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ABOUT_DATA } from "../lib/constants";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const globalCardRef = useRef<HTMLDivElement>(null);
  const globalMapRef = useRef<HTMLDivElement>(null);
  const globalGlowRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleGlobalCardMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!globalCardRef.current || !globalMapRef.current || !globalGlowRef.current) return;

    const rect = globalCardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(globalCardRef.current, {
      rotationY: px * 6,
      rotationX: py * -6,
      transformPerspective: 900,
      transformOrigin: "center center",
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(globalMapRef.current, {
      x: px * 14,
      y: py * 14,
      scale: 1.08,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(globalGlowRef.current, {
      x: px * 24,
      y: py * 24,
      opacity: 0.55,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleGlobalCardLeave = () => {
    if (!globalCardRef.current || !globalMapRef.current || !globalGlowRef.current) return;

    gsap.to(globalCardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.55,
      ease: "power3.out",
    });

    gsap.to(globalMapRef.current, {
      x: 0,
      y: 0,
      scale: 1.03,
      duration: 0.55,
      ease: "power3.out",
    });

    gsap.to(globalGlowRef.current, {
      x: 0,
      y: 0,
      opacity: 0.3,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ABOUT_DATA.cta.email);
      setIsCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1800);
    } catch {
      setIsCopied(false);
    }
  };

  const handleNavigateToContact = () => {
    const section = document.querySelector("#contact");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate header
    gsap.fromTo(".about-header", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
    
    // Stagger bento grid items
    gsap.fromTo(".bento-item", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="about-header mb-16 px-2 md:px-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2a2a2a] rounded-full mb-6 border border-white/5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#aec6ff] animate-pulse shadow-[0_0_8px_#aec6ff]"></span>
          <span className="font-label text-[10px] tracking-widest uppercase text-[#aec6ff] font-bold">{ABOUT_DATA.header.badge}</span>
        </div>
        <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-white leading-[1.1]">
          {ABOUT_DATA.header.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#aec6ff] to-[#0070f3]">{ABOUT_DATA.header.gradientText}</span> at Scale.
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          {ABOUT_DATA.header.subtitle}
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(280px,auto)] md:auto-rows-[240px]">
        {/* Card 1: The Philosophy (8 cols wide) */}
        <div className="bento-item md:col-span-8 md:row-span-1 bg-[#1c1b1b] border border-white/5 shadow-xl p-8 md:p-10 flex flex-col justify-end group overflow-hidden relative rounded-3xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[100px] md:text-9xl">diversity_3</span>
          </div>
          <div className="relative z-10">
            <h3 className="font-headline text-2xl font-bold mb-3 text-white">{ABOUT_DATA.philosophy.title}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              {ABOUT_DATA.philosophy.description}
            </p>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#aec6ff]/10 rounded-full blur-[60px] pointer-events-none"></div>
        </div>

        {/* Card 2: Global Nodes (4 cols wide, 2 rows tall) */}
        <div
          ref={globalCardRef}
          onMouseMove={handleGlobalCardMove}
          onMouseLeave={handleGlobalCardLeave}
          className="bento-item md:col-span-4 md:row-span-2 bg-[#2a2a2a] border border-white/5 shadow-xl overflow-hidden flex flex-col relative rounded-3xl group [transform-style:preserve-3d] will-change-transform"
        >
          <div
            ref={globalGlowRef}
            className="pointer-events-none absolute -top-12 -right-12 w-52 h-52 rounded-full bg-[#aec6ff]/25 blur-[70px] opacity-30 transition-opacity duration-500"
          />
          <div className="min-h-[200px] md:min-h-0 md:h-1/2 w-full bg-[#0e0e0e] relative">
            <div ref={globalMapRef} className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden scale-[1.03]">
              <img className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-700" alt="Global network map" src={ABOUT_DATA.globalNodes.image}/>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent"></div>
          </div>
          <div className="p-8 flex-grow flex flex-col justify-between relative z-10">
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2 text-white drop-shadow-lg">{ABOUT_DATA.globalNodes.title}</h3>
              <p className="text-gray-400 text-sm drop-shadow-md">{ABOUT_DATA.globalNodes.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 bg-black/40 p-3 rounded-xl border border-white/5 w-fit backdrop-blur-md">
              <span className="material-symbols-outlined text-[#aec6ff] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              <span className="font-label text-[10px] tracking-widest uppercase text-[#aec6ff] font-bold">{ABOUT_DATA.globalNodes.badge}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Tech Stack (4 cols wide) */}
        <div className="bento-item md:col-span-4 md:row-span-1 bg-[#1c1b1b] border border-white/5 shadow-xl p-8 flex flex-col justify-between rounded-3xl group">
          <h3 className="font-label text-[10px] tracking-widest uppercase text-gray-500 mb-4 font-bold">{ABOUT_DATA.techStack.title}</h3>
          <div className="grid grid-cols-2 gap-3">
            {ABOUT_DATA.techStack.items.map((tech) => (
              <div key={tech.name} className="bg-[#353534]/50 px-3 py-3 md:py-2 rounded-xl flex items-center gap-2 border border-white/5 group-hover:border-[#aec6ff]/20 transition-colors">
                <span className="material-symbols-outlined text-sm text-[#aec6ff]">{tech.icon}</span>
                <span className="text-xs font-label text-white font-bold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Current Focus (4 cols wide) */}
        <div className="bento-item md:col-span-4 md:row-span-1 bg-[#1c1b1b] border border-white/5 shadow-xl p-8 flex flex-col justify-center relative overflow-hidden rounded-3xl group">
          <div className="absolute -right-4 top-0 bottom-0 flex flex-col justify-center gap-2 opacity-5 translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
            <span className="material-symbols-outlined text-[100px] md:text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>animation</span>
          </div>
          <h3 className="font-headline text-xl font-bold mb-3 text-white">{ABOUT_DATA.focus.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed relative z-10">
            {ABOUT_DATA.focus.description}
          </p>
        </div>

        {/* Card 5: CTA (12 cols wide) */}
        <div className="bento-item md:col-span-12 md:row-span-1 bg-gradient-to-br from-[#0070f3] to-[#2d487d] p-6 md:p-1 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 md:px-12 overflow-hidden relative shadow-2xl rounded-3xl group">
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mixture-blend-overlay" alt="abstract mesh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8e37VrcYkPjPyJ5k6RbNdWXSF8-1Ov92-ktxVmDX7gmgNjHuS9giJqGJk9zpoKM4CWTEdRwHxLEnpTw-yl4QB6J5UtVqmzAcYi3O0r9_CytNoNk8Q6ssHkZRlL4m821weeLQQWPkjAqhtFoiJElb_hcJUir_HGnw0OmBqgJU3zDwilEtRM00V57q1mjKOan0_spLbJZnOy2DvBIN-VvnrP6_D2PPoux3wWtck-Clng8eb8syOpiOb0A9moKD3JwRsy7FuifkEfQA"/>
          </div>
          <div className="relative z-10 text-center md:text-left pt-4 pb-2 md:py-8 px-0 md:px-0 w-full md:w-auto">
            <h2 className="font-headline text-2xl md:text-3xl font-black text-white tracking-tight mb-1.5">{ABOUT_DATA.cta.title}</h2>
            <p className="text-white/80 font-medium text-sm md:text-base">{ABOUT_DATA.cta.subtitle}</p>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4 pb-4 md:py-8 px-0 md:px-0 w-full md:w-auto">
            <div className="bg-[#131313]/20 backdrop-blur-md border border-white/10 px-5 py-2.5 md:px-6 md:py-3 rounded-full flex items-center justify-between sm:justify-center gap-3 w-full md:w-auto">
              <span className="font-label text-xs md:text-sm text-white lowercase truncate">{ABOUT_DATA.cta.email}</span>
              <div className="relative group/copy">
                <button
                  onClick={handleCopyEmail}
                  className={`flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full border transition-all duration-300 cursor-pointer shrink-0 ${
                    isCopied
                      ? "text-[#aec6ff] border-[#aec6ff]/40 bg-[#aec6ff]/10 shadow-[0_0_18px_rgba(174,198,255,0.22)]"
                      : "text-white/60 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5"
                  }`}
                  aria-label={isCopied ? "Email copied" : "Copy to clipboard"}
                  aria-live="polite"
                >
                  <span className="material-symbols-outlined text-sm">{isCopied ? 'check_circle' : 'content_copy'}</span>
                </button>
                {/* Tooltip */}
                <span className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap pointer-events-none transition-all duration-200 ${isCopied ? 'bg-green-500/90 text-white opacity-100 scale-100' : 'bg-[#1e293b] text-slate-200 opacity-0 scale-95 group-hover/copy:opacity-100 group-hover/copy:scale-100'}`}>
                  {isCopied ? 'Copied!' : 'Copy Email'}
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${isCopied ? 'border-t-green-500/90' : 'border-t-[#1e293b]'}`}></span>
                </span>
              </div>
            </div>
            <button
              onClick={handleNavigateToContact}
              className="bg-white text-[#0070f3] font-label text-xs font-bold uppercase tracking-widest px-8 py-3 md:py-3.5 rounded-full shadow-lg hover:shadow-[0_0_26px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 w-full md:w-auto cursor-pointer"
            >
              {ABOUT_DATA.cta.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
