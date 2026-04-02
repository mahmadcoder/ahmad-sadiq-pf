"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "@/app/lib/constants";
import type { NavLink } from "@/app/lib/types";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: headerRef });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = NAV_LINKS.map(link => link.href.substring(1)).filter(Boolean);
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 300)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed z-50 transition-all duration-500 ease-out overflow-hidden rounded-full border top-4 inset-x-0 mx-auto w-[92vw] max-w-6xl ${
        isScrolled 
          ? "bg-[#131313]/90 backdrop-blur-xl border-white/10 shadow-2xl py-3 px-6 md:px-8"
          : "bg-[#131313]/40 backdrop-blur-md border-transparent py-4 md:py-5 px-6 md:px-8"
      }`}
    >
      <div className="flex justify-between items-center w-full gap-4">
        {/* Logo / Name - Always visible */}
        <Link href="/" className="flex items-center gap-3 group whitespace-nowrap shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 group-hover:bg-primary-container border border-primary-container/30 flex items-center justify-center transition-colors shrink-0">
            <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">
              change_history
            </span>
          </div>
          <div className="flex flex-col leading-none font-headline font-black tracking-tighter hidden sm:flex">
            <span className="text-lg text-white group-hover:text-primary-fixed transition-colors">
              Ahmad
            </span>
            <span className="text-lg gradient-text group-hover:text-primary transition-colors">
              Sadiq
            </span>
          </div>
        </Link>

        {/* Right side: Links + CTA tightly grouped to remove massive center gaps */}
        <div className="flex items-center gap-6 md:gap-8 overflow-hidden">
          {/* Links Navigation - Inline, responsive with horizontally scrolling on tiny screens */}
          <nav 
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex items-center gap-4 md:gap-6 overflow-x-auto scroll-smooth flex-nowrap hide-scrollbar"
          >
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            {NAV_LINKS.map((link: NavLink) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors font-headline font-bold text-sm md:text-base ${
                    isActive
                      ? "text-primary"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="shrink-0 glass-gradient text-white px-5 py-2 md:py-2.5 rounded font-label font-bold text-xs md:text-sm tracking-wide shadow-md shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            Work with Me
          </button>
        </div>
      </div>
    </header>
  );
}
