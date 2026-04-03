"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { PROJECTS } from "../lib/constants";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
    });
    tl.fromTo(".proj-header", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".proj-row", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }, "-=0.3")
      .fromTo(".proj-footer", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, "-=0.2");
  }, { scope: sectionRef });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!floatingRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left - 175;
    const maxX = rect.width * 0.45; // Keep image in left ~45% so it never covers right-side links
    gsap.to(floatingRef.current, {
      x: Math.min(rawX, maxX),
      y: e.clientY - rect.top - 125,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  const showImage = useCallback(() => {
    if (!floatingRef.current) return;
    gsap.to(floatingRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  }, []);

  const hideImage = useCallback(() => {
    if (!floatingRef.current) return;
    gsap.to(floatingRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power3.in" });
  }, []);

  const handleEnter = useCallback((id: number) => {
    setHoveredId(id);
    showImage();
  }, [showImage]);

  const handleLeave = useCallback(() => {
    setHoveredId(null);
    hideImage();
  }, [hideImage]);

  // Modal open/close
  const openModal = useCallback(() => {
    setModalOpen(true);
    lenis?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => {
      if (!modalRef.current) return;
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(".modal-card", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.15 });
    });
  }, [lenis]);

  const closeModal = useCallback(() => {
    if (!modalRef.current) return;
    gsap.to(".modal-card", { y: 30, opacity: 0, duration: 0.25, stagger: 0.04, ease: "power2.in" });
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.3, delay: 0.15, ease: "power2.in",
      onComplete: () => {
        setModalOpen(false);
        lenis?.start();
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    });
  }, [lenis]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape" && modalOpen) closeModal(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalOpen, closeModal]);

  // Clean up on unmount just in case
  useEffect(() => {
    return () => {
      if (modalOpen) {
        lenis?.start();
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, [modalOpen, lenis]);

  // Prevent scroll propagation from modal to body
  useEffect(() => {
    if (!modalOpen) return;

    const handleWheel = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Prevent scroll from propagating when at bounds
      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    // Also block any touch-based scrolling on body
    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent if the touch target is NOT inside the scroll container
      if (container && !container.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [modalOpen]);

  // Modal content - rendered via portal to escape parent scroll context
  const modalContent = modalOpen ? createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[999]"
      style={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={closeModal} />

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 h-full overflow-y-auto"
        style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
        data-lenis-prevent="true"
      >
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-black text-white mb-2">All Projects</h2>
              <p className="text-gray-500 text-sm">Everything I&apos;ve built — browse the full collection.</p>
            </div>
            <button
              onClick={closeModal}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pb-8">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="modal-card group rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 overflow-hidden transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-[200px] sm:h-[240px] overflow-hidden border-b border-white/[0.06]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#aec6ff] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Visit Live <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
                      title="View on GitHub"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto"
      onMouseMove={handleMouseMove}
    >
      {/* ============ Floating Preview Image (Desktop) ============ */}
      <div
        ref={floatingRef}
        className="hidden lg:block absolute w-[350px] h-[250px] rounded-2xl overflow-hidden pointer-events-none z-50 shadow-2xl shadow-black/60 border border-white/10"
        style={{ opacity: 0, transform: "scale(0.8)", top: 0, left: 0 }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className={`absolute inset-0 transition-opacity duration-300 ${hoveredId === p.id ? "opacity-100" : "opacity-0"}`}
          >
            <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
          </div>
        ))}
      </div>

      {/* ============ Section Header ============ */}
      <div className="proj-header mb-16 md:mb-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Selected Work
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base max-w-lg">
              Handpicked projects that showcase what I build — from idea to deployment.
            </p>
          </div>
          <a
            className="hidden md:flex font-label text-sm font-bold text-primary items-center gap-2 group border-b border-primary/30 pb-1 cursor-pointer"
            href="https://github.com/mahmadcoder?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            Full Archive
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
          </a>
        </div>
      </div>

      {/* ============ Desktop: Typography List ============ */}
      <div className="hidden lg:block group/list border-t border-white/[0.07]">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="proj-row group/item border-b border-white/[0.07] transition-opacity duration-500 group-hover/list:opacity-[0.18] hover:!opacity-100"
            onMouseEnter={() => handleEnter(project.id)}
            onMouseLeave={handleLeave}
          >
            <div className="py-8 xl:py-10 px-2 flex items-center gap-6 xl:gap-8">
              {/* Number */}
              <span className="font-mono text-sm tracking-[0.15em] w-8 text-white/20 group-hover/item:text-[#aec6ff] transition-colors duration-[400ms]">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Name + Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4">
                  <h3 className="font-headline text-4xl xl:text-[3.5rem] font-black tracking-tight leading-none text-white group-hover/item:text-[#aec6ff] transition-colors duration-[400ms]">
                    {project.title}
                  </h3>
                </div>
                {/* Reveal description on hover */}
                <div className="overflow-hidden transition-all duration-500 ease-out max-h-0 opacity-0 group-hover/item:max-h-20 group-hover/item:opacity-100 group-hover/item:mt-3">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{project.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-end max-w-[280px] shrink-0">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-full border text-gray-500 border-white/[0.08] bg-white/[0.02] group-hover/item:text-[#aec6ff] group-hover/item:border-[#aec6ff]/25 group-hover/item:bg-[#aec6ff]/[0.06] transition-all duration-[400ms]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <div className="relative group/badge flex items-center">
                    <span
                      className="text-[11px] font-bold px-3 py-1.5 rounded-full border text-[#aec6ff] border-[#aec6ff]/30 bg-[#aec6ff]/10 shadow-[0_0_10px_rgba(174,198,255,0.1)] group-hover/badge:bg-[#aec6ff]/20 group-hover/item:border-[#aec6ff]/50 transition-all duration-[400ms] cursor-default"
                    >
                      +{project.tags.length - 3}
                    </span>
                    {/* Custom Tooltip */}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-max px-3 py-2.5 bg-[#1c1b1b] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible group-hover/badge:translate-x-0 -translate-x-2 transition-all duration-300 z-[100] flex gap-1.5">
                      {/* Tooltip Arrow pointing left */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1c1b1b] border-l border-b border-white/10 rotate-45"></div>
                      {project.tags.slice(3).map((tag) => (
                        <span key={tag} className="text-[10px] whitespace-nowrap font-medium text-gray-300 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-md relative z-10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 shrink-0 min-w-[130px] justify-end">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-white/25 group-hover/item:text-white hover:!text-[#aec6ff] transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
                <span className="text-white/10">|</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white/25 group-hover/item:text-white hover:!text-[#aec6ff] hover:!bg-white/10 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                  title="View on GitHub"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
              </div>

              {/* Arrow */}
              <span className="material-symbols-outlined text-lg text-white/10 group-hover/item:text-[#aec6ff] group-hover/item:translate-x-1 transition-all duration-[400ms]">
                arrow_outward
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ============ Mobile/Tablet: Project Cards ============ */}
      <div className="lg:hidden space-y-5 border-t border-white/[0.07] pt-6">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="proj-row rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-[200px] sm:h-[240px] overflow-hidden border-b border-white/[0.06]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 font-label text-[10px] tracking-widest uppercase text-[#aec6ff] bg-black/50 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                Selected Project
              </span>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs text-white/25 tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{project.title}</h3>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4 pl-7 sm:pl-9">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 pl-7 sm:pl-9 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pl-7 sm:pl-9">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Visit Live <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-white/15 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/5 hover:border-white/30 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============ Footer CTA ============ */}
      <div className="proj-footer mt-16 flex justify-center">
        <button
          onClick={openModal}
          className="group/btn relative flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-white font-label font-bold text-sm cursor-pointer overflow-hidden transition-all duration-500 hover:border-[#aec6ff]/40 hover:shadow-[0_0_30px_rgba(174,198,255,0.12)] active:scale-95"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#aec6ff]/0 via-[#aec6ff]/[0.06] to-[#aec6ff]/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <span className="material-symbols-outlined relative z-10">apps</span>
          <span className="relative z-10">View All Projects</span>
        </button>
      </div>

      {/* Modal rendered via portal */}
      {modalContent}
    </section>
  );
}
