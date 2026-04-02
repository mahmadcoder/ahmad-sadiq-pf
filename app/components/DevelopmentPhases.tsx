"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DEVELOPMENT_PHASES } from "../lib/constants";

export default function DevelopmentPhases() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(".phases-header", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".phase-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left center" }, "-=0.4")
      .fromTo(".phase-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" }, "-=0.6");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-8 max-w-7xl mx-auto">
      <div className="phases-header text-center mb-24">
        <p className="font-label text-sm text-primary tracking-[0.3em] uppercase mb-4">The Methodology</p>
        <h2 className="font-headline text-4xl md:text-5xl font-black text-white">Predictable Excellence.</h2>
      </div>
      
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Connecting Line */}
        <div className="phase-line absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent hidden md:block -z-10"></div>
        
        {DEVELOPMENT_PHASES.map((phase) => (
          <div key={phase.step} className="phase-card relative p-10 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
            <div className="absolute -top-6 left-10 w-12 h-12 bg-background border border-outline-variant/10 rounded-xl flex items-center justify-center font-headline font-bold text-primary shadow-lg">
              {phase.step}
            </div>
            <div className="mb-8 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <span className="material-symbols-outlined text-primary group-hover:text-[#002e6b] text-3xl transition-colors">
                {phase.icon}
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-white mb-4">{phase.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
