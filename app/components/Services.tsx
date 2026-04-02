"use client";

import { motion } from "framer-motion";
import { SERVICES, SEO_STATS } from "@/app/lib/constants";
import type { Service, ServiceStat } from "@/app/lib/types";

export default function Services() {
  const s01 = SERVICES[0];
  const s02 = SERVICES[1];
  const s03 = SERVICES[2];
  const s04 = SERVICES[3];

  return (
    <section id="services" className="py-24 px-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="font-label text-primary-fixed tracking-[0.2em] uppercase text-xs mb-4 block">
              Specializations
            </span>
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight text-white">
              Our Services
            </h2>
          </div>
          <div className="md:text-right">
            <p className="font-body text-on-surface-variant max-w-md text-lg leading-relaxed">
              Engineering digital experiences that combine architectural
              precision with fluid aesthetics for global enterprise clients.
            </p>
          </div>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 01 — Performance (wide) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 bg-surface-container-low p-8 md:p-12 rounded-xl group hover:bg-surface-container-highest transition-all duration-500 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 flex items-center justify-center ${s01.iconBg} rounded-full`}>
                <span className={`material-symbols-outlined ${s01.iconColor}`}>{s01.icon}</span>
              </div>
              <span className="font-label text-sm text-outline tracking-widest uppercase">
                {s01.id} / {s01.category}
              </span>
            </div>
            <h3 className="font-headline text-3xl font-bold mb-6 text-white">{s01.title}</h3>
            <p className="font-body text-on-surface-variant text-lg max-w-xl mb-8">{s01.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {s01.tags?.map((tag: string) => (
              <span key={tag} className="px-4 py-1 bg-surface-container-highest border border-outline-variant/20 rounded-full font-label text-[10px] uppercase text-on-surface-variant">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 02 — UI/UX (narrow) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-4 bg-surface-container-low p-8 rounded-xl group hover:bg-surface-container-highest transition-all duration-500"
        >
          <div className={`w-12 h-12 flex items-center justify-center ${s02.iconBg} rounded-full mb-8`}>
            <span className={`material-symbols-outlined ${s02.iconColor}`}>{s02.icon}</span>
          </div>
          <span className="font-label text-xs text-outline tracking-widest uppercase block mb-4">
            {s02.id} / {s02.category}
          </span>
          <h3 className="font-headline text-2xl font-bold mb-4 text-white">{s02.title}</h3>
          <p className="font-body text-on-surface-variant mb-8 text-sm leading-relaxed">
            {s02.description}
          </p>
          <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3 group-hover:w-full transition-all duration-1000" />
          </div>
        </motion.div>

        {/* 03 — Architecture (narrow) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-4 bg-surface-container-low p-8 rounded-xl group hover:bg-surface-container-highest transition-all duration-500 order-last md:order-none"
        >
          <div className={`w-12 h-12 flex items-center justify-center ${s03.iconBg} rounded-full mb-8`}>
            <span className={`material-symbols-outlined ${s03.iconColor}`}>{s03.icon}</span>
          </div>
          <span className="font-label text-xs text-outline tracking-widest uppercase block mb-4">
            {s03.id} / {s03.category}
          </span>
          <h3 className="font-headline text-2xl font-bold mb-4 text-white">{s03.title}</h3>
          <p className="font-body text-on-surface-variant mb-6 text-sm leading-relaxed">
            {s03.description}
          </p>
          <div className="p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 font-label text-[10px] text-primary-fixed-dim">
            <code>{`const structure = "Modular";`}</code>
            <br />
            <code>{`const scale = true;`}</code>
          </div>
        </motion.div>

        {/* 04 — SEO (wide with stats) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="md:col-span-8 bg-surface-container-low p-8 md:p-12 rounded-xl group hover:bg-surface-container-highest transition-all duration-500 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="md:w-1/2">
            <div className={`w-12 h-12 flex items-center justify-center ${s04.iconBg} rounded-full mb-8`}>
              <span className={`material-symbols-outlined ${s04.iconColor}`}>{s04.icon}</span>
            </div>
            <span className="font-label text-sm text-outline tracking-widest uppercase block mb-4">
              {s04.id} / {s04.category}
            </span>
            <h3 className="font-headline text-3xl font-bold mb-4 text-white">{s04.title}</h3>
            <p className="font-body text-on-surface-variant text-lg">{s04.description}</p>
          </div>
          <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
            {SEO_STATS.map((stat: ServiceStat) => (
              <div
                key={stat.label}
                className={`bg-surface-container-lowest p-6 rounded-lg text-center ${stat.colSpan === 2 ? "col-span-2" : ""}`}
              >
                <div className="font-headline text-2xl font-black text-primary mb-1">{stat.value}</div>
                <div className="font-label text-[10px] uppercase text-outline">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-24 bg-surface-container-lowest p-12 rounded-xl text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 pulse-gradient opacity-10 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to architect your vision?
          </h2>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
            I am currently accepting select projects. Let&apos;s discuss how we
            can build something exceptional together.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="pulse-gradient text-on-primary-container px-10 py-4 rounded-lg font-label font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95"
            >
              Start a Project
            </button>
            <button className="bg-transparent border border-outline-variant text-white px-10 py-4 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:bg-surface-container-high transition-all">
              View My Stack
            </button>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
