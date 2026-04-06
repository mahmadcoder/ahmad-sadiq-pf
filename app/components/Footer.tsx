"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".footer-item", 
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-[#0b0b0b] w-full py-12 md:py-16 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
        
        {/* Left Column: Bio & Social */}
        <div className="footer-item flex flex-col gap-6 relative">
          <div className="text-xl font-bold text-white font-headline tracking-tight">Ahmad Sadiq</div>
          <p className="font-body text-base text-on-surface-variant leading-relaxed max-w-sm">
            Engineering digital infrastructure for brands that refuse to compromise on performance or design.
          </p>
          
          <div className="flex gap-4 mt-4">
            {/* LinkedIn */}
            <a aria-label="LinkedIn" className="group relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-[#0A66C2] md:bg-surface-container-high md:hover:bg-[#0A66C2] hover:-translate-y-1 transition-all duration-300 shadow-sm" href="https://www.linkedin.com/in/devahmad-sadiq/" target="_blank" rel="noopener noreferrer">
              <img 
                src="/images/linkedin.svg?v=final5" 
                alt="LinkedIn" 
                className="w-5 h-5 relative z-10 filter brightness-0 invert transition-transform duration-300 group-hover:scale-110 pointer-events-none" 
              />
              <span className="hidden md:block absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 bg-white text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md pointer-events-none shadow-xl z-50">
                LinkedIn
              </span>
            </a>
            
            {/* GitHub */}
            <a aria-label="GitHub" className="group relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white md:bg-surface-container-high md:hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-sm" href="https://github.com/mahmadcoder" target="_blank" rel="noopener noreferrer">
              {/* filter-none shows the black cat natively. md:brightness-0 md:invert forces it white on desktop default */}
              <img 
                src="/images/github.svg?v=final5" 
                alt="GitHub" 
                className="w-5 h-5 relative z-10 filter-none md:filter md:brightness-0 md:invert md:group-hover:filter-none transition-all duration-300 pointer-events-none group-hover:scale-110" 
              />
              <span className="hidden md:block absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 bg-white text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md pointer-events-none shadow-xl z-50">
                GitHub
              </span>
            </a>
            
            {/* Instagram */}
            <a aria-label="Instagram" className="group relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-transparent md:bg-surface-container-high md:hover:bg-transparent hover:-translate-y-1 transition-all duration-300 shadow-sm" href="#">
              {/* Shows the SVG's native "real colors" on mobile and hover. On desktop default, it's elegantly desaturated */}
              <img 
                src="/images/instagram.svg?v=final5" 
                alt="Instagram" 
                className="w-6 h-6 object-contain relative z-10 filter-none opacity-100 md:filter md:grayscale md:opacity-60 md:group-hover:filter-none md:group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:scale-110" 
              />
              <span className="hidden md:block absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 bg-white text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md pointer-events-none shadow-xl z-50">
                Instagram
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Availability */}
        <div className="footer-item flex flex-col gap-6 md:items-end md:text-right">
          <h5 className="font-label text-[10px] font-bold text-white uppercase tracking-[0.2em] opacity-50">Availability</h5>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-3 bg-surface-container py-2 px-4 rounded-full border border-outline-variant/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
              <span className="font-headline font-bold text-sm text-white">System Status: All Green</span>
            </div>
            <p className="font-body text-sm text-on-surface-variant max-w-xs">Based on Planet Earth. Working Globally.</p>
            <a className="font-headline font-bold text-xl text-white hover:text-primary transition-colors mt-2" href="https://mail.google.com/mail/?view=cm&fs=1&to=ahmadsadiq2284@gmail.com" target="_blank" rel="noopener noreferrer">ahmadsadiq2284@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="footer-item max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-body text-sm text-on-surface-variant opacity-80">© {new Date().getFullYear()} Ahmad Sadiq. Built with precision.</span>
        <div className="flex items-center flex-wrap gap-4 md:gap-8 justify-center">
          <span className="text-[10px] font-label text-white opacity-50 uppercase tracking-[0.2em]">Next.js Expert</span>
          <span className="text-[10px] font-label text-white opacity-50 uppercase tracking-[0.2em]">Full-stack Engineering</span>
        </div>
      </div>
    </footer>
  );
}
