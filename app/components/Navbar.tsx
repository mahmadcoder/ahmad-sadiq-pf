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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <div className="hidden md:flex items-center gap-6 md:gap-8 overflow-hidden">
          {/* Links Navigation - Desktop */}
          <nav className="flex items-center gap-4 md:gap-6">
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
            className="shrink-0 glass-gradient text-white px-5 py-2.5 rounded font-label font-bold text-sm tracking-wide shadow-md shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            Work with Me
          </button>
        </div>

        {/* Mobile controls: CTA + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="shrink-0 glass-gradient text-white px-4 py-2 rounded font-label font-bold text-xs tracking-wide shadow-md shadow-primary-container/20 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            Work with Me
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1 rounded-md hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden flex flex-col justify-center ${
          mobileMenuOpen ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-5 py-5 border-t border-white/10">
          {NAV_LINKS.map((link: NavLink) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`whitespace-nowrap transition-colors font-headline font-bold text-lg ${
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
      </div>
    </header>
  );
}
