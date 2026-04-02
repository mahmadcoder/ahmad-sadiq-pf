"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TECH_STACK_ITEMS } from "../lib/constants";

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".tech-header", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(".tech-card", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 90%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-surface-container-lowest border-y border-outline-variant/10 relative">
      <style>{`
        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scrollX 35s linear infinite;
        }
        .pause-wrapper:hover .animate-marquee {
          animation-play-state: paused;
        }
        .tech-icon {
          filter: brightness(0) invert(1);
          opacity: 0.5;
          transition: all 0.4s ease-out;
        }
        .tech-card:hover .tech-icon {
          filter: none;
          opacity: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="tech-header flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <h2 className="font-headline text-3xl font-bold text-white">The precision stack for global scale.</h2>
          <div className="h-[1px] flex-grow mx-8 bg-outline-variant/10 hidden md:block"></div>
          <p className="font-label text-sm text-primary tracking-widest uppercase shrink-0">BUILT TO SCALE</p>
        </div>
        
        {/* Marquee Window */}
        <div className="tech-grid flex overflow-hidden pause-wrapper pointer-events-auto">
          
          {/* Moving Track */}
          <div className="flex w-max animate-marquee">
            
            {/* Track 1 */}
            <div className="flex shrink-0 gap-6 pr-6">
              {TECH_STACK_ITEMS.map((tech) => (
                <div key={tech.name + "-1"} className="tech-card w-44 shrink-0 p-8 rounded-xl bg-background border border-outline-variant/10 flex flex-col items-center gap-4 text-center cursor-default hover:border-primary/40 transition-colors duration-300">
                  <div className="w-16 h-16 flex items-center justify-center bg-surface-container-high rounded-xl mb-2 overflow-hidden hover:bg-surface-container-highest transition-colors duration-300 text-white">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-10 h-10 object-contain tech-icon" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-headline font-bold text-base md:text-lg leading-tight transition-colors duration-300">{tech.name}</span>
                    <span className="text-[10px] font-label text-gray-500 uppercase tracking-wider">{tech.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Track 2 - Exact Duplicate */}
            <div className="flex shrink-0 gap-6 pr-6 aria-hidden">
              {TECH_STACK_ITEMS.map((tech) => (
                <div key={tech.name + "-2"} className="tech-card w-44 shrink-0 p-8 rounded-xl bg-background border border-outline-variant/10 flex flex-col items-center gap-4 text-center cursor-default hover:border-primary/40 transition-colors duration-300">
                  <div className="w-16 h-16 flex items-center justify-center bg-surface-container-high rounded-xl mb-2 overflow-hidden hover:bg-surface-container-highest transition-colors duration-300 text-white">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-10 h-10 object-contain tech-icon" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-headline font-bold text-base md:text-lg leading-tight transition-colors duration-300">{tech.name}</span>
                    <span className="text-[10px] font-label text-gray-500 uppercase tracking-wider">{tech.category}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
