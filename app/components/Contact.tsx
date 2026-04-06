"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from "../lib/constants";

function CustomSelect({ id, label, options, defaultValue, onChange }: { id: string, label: string, options: string[], defaultValue: string, onChange?: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 pulse-border border-b border-outline-variant pb-2 relative" ref={selectRef}>
      <label className="font-label text-[10px] uppercase tracking-widest text-outline" htmlFor={id}>{label}</label>
      
      <div 
        className="w-full bg-transparent border-none p-0 text-white font-headline font-bold text-xl cursor-pointer flex justify-between items-center group"
        onClick={() => setIsOpen(!isOpen)}
        id={id}
      >
        <span>{selected}</span>
        <span className={`material-symbols-outlined text-outline group-hover:text-primary transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>expand_more</span>
      </div>

      {/* Styled Dropdown Menu */}
      <div 
        className={`absolute top-[calc(100%+8px)] left-0 w-full bg-[#1e1e1e] border border-outline-variant/10 rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}`}
      >
        <div className="flex flex-col py-2">
          {options.map((opt, i) => (
            <div 
              key={i}
              className={`px-6 py-3 font-headline text-lg cursor-pointer transition-all hover:bg-primary/10 hover:text-white ${selected === opt ? 'text-primary bg-primary/5' : 'text-on-surface-variant'}`}
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
                if (onChange) onChange(opt);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("ahmadsadiq2284@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'email_copy', metadata: { location: 'contact_section' } })
      });
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) {
      setStatusMsg("Please fill in all fields.");
      return;
    }
    
    setIsSubmitting(true);
    setStatusMsg("");

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, description, budget, timeline })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg("Message sent successfully! I'll get back to you soon.");
        setName(""); setEmail(""); setDescription("");
      } else {
        setStatusMsg("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatusMsg("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".cta-content", 
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Left Column: Content & Direct Info */}
        <div className="contact-content lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <span className="font-label text-primary-fixed-dim tracking-[0.2em] uppercase text-xs font-bold">Inquiry</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter leading-none text-white">
              Let's build something together
            </h1>
            <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
             Currently accepting new projects. Let's build something together.
            </p>
          </div>
          
          {/* Direct Contact Info */}
          <div className="space-y-8 pt-8">
            <div className="group flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-on-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-outline">Email Address</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-white font-medium">ahmadsadiq2284@gmail.com</p>
                  <div className="relative group/copy">
                    <button onClick={handleCopy} className="text-outline hover:text-primary transition-colors focus:outline-none flex items-center justify-center p-1.5 rounded-lg hover:bg-surface-container cursor-pointer" aria-label="Copy Email">
                      <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                    </button>
                    {/* Tooltip */}
                    <span className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap pointer-events-none transition-all duration-200 ${copied ? 'bg-green-500/90 text-white opacity-100 scale-100' : 'bg-[#1e293b] text-slate-200 opacity-0 scale-95 group-hover/copy:opacity-100 group-hover/copy:scale-100'}`}>
                      {copied ? 'Copied!' : 'Copy Email'}
                      <span className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${copied ? 'border-t-green-500/90' : 'border-t-[#1e293b]'}`}></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-on-primary">
                <span className="material-symbols-outlined">share</span>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-outline">Social Connect</p>
                <div className="flex space-x-4 mt-1">
                  <a className="text-on-surface-variant hover:text-white transition-colors font-headline font-bold" href="https://www.linkedin.com/in/devahmad-sadiq/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <span className="text-outline-variant">/</span>
                  <a className="text-on-surface-variant hover:text-white transition-colors font-headline font-bold" href="https://github.com/mahmadcoder" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Accent */}
          <div className="hidden lg:block pt-12">
            <div className="p-6 bg-surface-container-lowest rounded-xl border-l-4 border-primary/30">
              <pre className="font-label text-[11px] text-primary/60 leading-tight">
                <span className="text-tertiary">const</span> <span className="text-white">project</span> = {"{"}
                {"\n"}  status: <span className="text-primary-fixed">'Available'</span>,
                {"\n"}  stack: [<span className="text-primary-fixed">'Next.js'</span>, <span className="text-primary-fixed">'Tailwind'</span>, <span className="text-primary-fixed">'AWS'</span>],
                {"\n"}  location: <span className="text-primary-fixed">'Remote'</span>
                {"\n"}{"}"};
              </pre>
            </div>
          </div>
        </div>
        
        {/* Right Column: Inquiry Form */}
        <div className="contact-form lg:col-span-7">
          <div className="glass-card rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-visible">
            {/* Subtle Glow Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="space-y-2 pulse-border border-b border-outline-variant pb-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-outline" htmlFor="name">Your Name</label>
                  <input autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-none p-0 text-white placeholder:text-surface-container-highest font-headline font-bold text-base md:text-lg focus:ring-0 text-ellipsis overflow-hidden whitespace-nowrap" id="name" placeholder="John Doe" type="text" />
                </div>
                
                {/* Email Field */}
                <div className="space-y-2 pulse-border border-b border-outline-variant pb-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-outline" htmlFor="email">Email Address</label>
                  <input autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-none p-0 text-white placeholder:text-surface-container-highest font-headline font-bold text-base md:text-lg focus:ring-0 text-ellipsis overflow-hidden whitespace-nowrap" id="email" placeholder="john@example.com" type="email" />
                </div>
              </div>
              
              {/* Project Description */}
              <div className="space-y-2 pulse-border border-b border-outline-variant pb-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-outline" htmlFor="description">Project Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-transparent border-none p-0 text-white placeholder:text-surface-container-highest font-headline font-bold text-xl resize-none focus:ring-0" id="description" placeholder="Tell me about your vision..." rows={3}></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Budget Range - Custom Select */}
                <CustomSelect 
                  id="budget" 
                  label="Budget Range" 
                  defaultValue={budget} 
                  options={BUDGET_OPTIONS} 
                  onChange={setBudget}
                />
                
                {/* Timeline - Custom Select */}
                <CustomSelect 
                  id="timeline" 
                  label="Timeline" 
                  defaultValue={timeline} 
                  options={TIMELINE_OPTIONS} 
                  onChange={setTimeline}
                />
              </div>
              
              {/* CTA & Status */}
              <div className="pt-6 space-y-4">
                <button disabled={isSubmitting} className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed px-10 py-5 font-headline font-black text-sm uppercase tracking-[0.2em] rounded-md shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-4 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100" type="submit">
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  {!isSubmitting && <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>}
                </button>
                {statusMsg && (
                  <p className={`font-medium ${statusMsg.includes('success') ? 'text-primary' : 'text-error'}`}>{statusMsg}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
