'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { containerStagger, fadeIn, fadeInUp } from "@/lib/motion";

import { projects } from "@/data/projects";
import { section, grid, card, cardImageWrap, cardContent, tag, title, desc, cta, techList, techBadge, buttonsRow, githubBtn } from "./styles";

export default function Projects() {
  return (
    <main>
      <motion.section className={section} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.h1 variants={fadeInUp}>Selected <strong>Project</strong></motion.h1>

        <motion.ul className={grid} variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {projects.map((p) => (
            <motion.li
              key={p.id}
              variants={fadeInUp}
              className={card({ theme: p.theme, align: p.align })}
            >
              <motion.div className={cardImageWrap({ theme: p.theme })} variants={fadeIn}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={960}
                  height={620}
                  priority={p.id === 1}
                />
              </motion.div>

              <div className={cardContent}>
                <span className={tag}>{p.category}</span>
                <h2 className={title}>{p.title}</h2>
                <p className={desc}>{p.description}</p>

                {p.technologies && p.technologies.length > 0 && (
                  <ul className={techList}>
                    {p.technologies.map((t) => (
                      <li key={t} className={techBadge}>{t}</li>
                    ))}
                  </ul>
                )}

                {(p.link || p.github) && (
                  <div className={buttonsRow}>
                    {p.link && (
                      <Link href={p.link} target="_blank" className={cta}>
                        View
                      </Link>
                    )}

                    {p.github && (
                      <Link href={p.github} target="_blank" className={githubBtn}>
                        <Image src="/images/github.svg" alt="GitHub" width={16} height={16} />
                        GitHub
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
    </main>
  );
}
