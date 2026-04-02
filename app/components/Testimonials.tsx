"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TESTIMONIALS } from "../lib/constants";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".testimonial-header", 
      { y: 40, opacity: 0 },
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

    gsap.fromTo(".testimonial-card", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-slider",
          start: "top 85%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="testimonial" ref={sectionRef} className="py-16 md:py-24 overflow-hidden bg-background relative">
      <style>{`
        @keyframes scrollXTestimonial {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonial {
          animation: scrollXTestimonial 40s linear infinite;
        }
        .pause-wrapper:hover .animate-testimonial {
          animation-play-state: paused;
        }
      `}</style>

      <div className="testimonial-header max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="font-headline text-3xl font-bold text-white">Trusted by forward-thinking teams.</h2>
      </div>
      
      {/* Marquee Window */}
      <div className="testimonial-slider flex overflow-hidden pause-wrapper pointer-events-auto relative group">
        
        {/* Edge Fade Gradients strictly matching bg-background */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Moving Track */}
        <div className="flex w-max animate-testimonial">
          
          {/* Track 1 */}
          <div className="flex shrink-0 gap-8 pr-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={`t1-${idx}`} className="testimonial-card w-[85vw] md:w-[600px] bg-surface-container-low p-8 md:p-10 rounded-[2rem] border border-outline-variant/10 relative shadow-xl hover:border-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary/10 text-7xl absolute top-6 right-8 pointer-events-none">format_quote</span>
                <p 
                  className="font-body text-lg md:text-xl text-white/90 leading-[1.6] mb-8 relative z-10 pr-8"
                  dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }}
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary shadow-inner border border-outline-variant/5">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-white">{t.name}</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 (Duplicate for endless loop) */}
          <div className="flex shrink-0 gap-8 pr-8 aria-hidden">
            {TESTIMONIALS.map((t, idx) => (
              <div key={`t2-${idx}`} className="testimonial-card w-[85vw] md:w-[600px] bg-surface-container-low p-8 md:p-10 rounded-[2rem] border border-outline-variant/10 relative shadow-xl hover:border-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary/10 text-7xl absolute top-6 right-8 pointer-events-none">format_quote</span>
                <p 
                  className="font-body text-lg md:text-xl text-white/90 leading-[1.6] mb-8 relative z-10 pr-8"
                  dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }}
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary shadow-inner border border-outline-variant/5">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-white">{t.name}</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
