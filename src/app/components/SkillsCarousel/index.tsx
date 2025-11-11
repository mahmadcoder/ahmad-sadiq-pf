'use client'
import { techs } from "@/data/techs";
import { useKeenSlider } from "keen-slider/react"
import { motion } from "framer-motion";
import { containerStagger, fadeIn, fadeInUp, hoverLift } from "@/lib/motion";

import Image from "next/image";
import { skills } from "./styles";


export function SkillsCarousel() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",    
    breakpoints: {
      '(min-width: 320px)': {
        slides: {
          origin: "center", 
          perView: 1.2,
          spacing: 20,
        },
      },
      '(min-width: 1280px)': {        
        slides: {
          origin: "center", 
          perView: 3.5,
          spacing: 80,
        },
      },
    },
  })

  return (
    <motion.section className={skills} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.h2 variants={fadeInUp}>The technologies I’ve been using...</motion.h2>
        
      <div ref={ref} className="keen-slider">
        {techs.map((skill) => (
          <motion.li variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }} key={skill.id} className="keen-slider__slide">
            <motion.h3 variants={fadeInUp}>{skill.role}</motion.h3>

            {skill.techs.map((tech) => (
              <motion.span key={tech.id} variants={fadeInUp} whileHover={hoverLift.whileHover} whileTap={hoverLift.whileTap}>
                <div>
                  <Image src={tech.url} width={20} height={20} alt={tech.label + "Logo"} />
                </div>

                {tech.label}
              </motion.span>    
            ))}                    
          </motion.li>
        ))}        
      </div>
    </motion.section>
  )
}