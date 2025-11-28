'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import { motion } from 'framer-motion';
import { containerStagger, fadeIn, fadeInUp, hoverLift } from '@/lib/motion';

import { experienceCarousel, favThingsSection, introExperience, introExperienceBox, linkRedirect, main, me, resumeDownload, techCard } from './styles';
import meImg from '../../public/images/me.png';

import jsIcon from '../../public/images/js.svg';
import reactIcon from '../../public/images/react.svg';
import nextjsIcon from '../../public/images/nextjs.svg';
import figmaIcon from '../../public/images/figma.svg';

import { SkillsCarousel } from './components/SkillsCarousel';

export default function Home() {
  const [ref] = useKeenSlider<HTMLDivElement>({    
    mode: "free-snap",
    breakpoints: {
      '(min-width: 320px)': {
        slides: {
          perView: 1.5,
          spacing: 25,
        },
      },
      '(min-width: 1280px)': {        
        slides: {          
          perView: 2.5,
          spacing: 35,
        },
      },
      '(min-width: 1920)': {        
        slides: {          
          perView: 2.5,
          spacing: 45,
        },
      },
    },
  })

  return (
    <main className={main}>
      <section className={me}>
        <motion.div variants={fadeIn} initial="hidden" animate="show">
          <Image src={meImg} alt="Profile photo" />
        </motion.div>
        <motion.div variants={containerStagger} initial="hidden" animate="show">
          <motion.h1 variants={fadeInUp} style={{ whiteSpace: 'nowrap' }}>Hi, I&#39;m Ahmad</motion.h1>
          <motion.p variants={fadeInUp}>
            My journey as a <strong style={{color: 'white'}}>Frontend Developer</strong> has been about more than just building websites—it&apos;s about creating experiences that work <strong style={{color: 'white'}}>seamlessly</strong>. I enjoy  <strong style={{color: 'white'}}>collaborating</strong> with different teams to shape features and deliver applications that make a real difference.
          </motion.p>

          <motion.div variants={containerStagger}>
            <motion.a
              variants={fadeInUp} 
              whileHover={hoverLift.whileHover}
              whileTap={hoverLift.whileTap}
              className={resumeDownload}
              href="/downloads/ahmad-frontend-se.pdf"
              download
            >
              Download
            </motion.a>
            <motion.div variants={fadeInUp}>
              <Link className={linkRedirect} href="/experience">See experiences</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section className={introExperience} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className={introExperienceBox} variants={fadeInUp}>
          <p>Web</p>
          <strong>Dev</strong>
          <p>React & Next.js</p>
        </motion.div>

        <motion.div className={experienceCarousel} variants={fadeInUp}>
          <div ref={ref} className="keen-slider">
            <li className={`keen-slider__slide ${techCard({ theme: 'js'})}`}>
              <Image src={jsIcon} alt='JavaScript Icon' />
              <span>JavaScript</span>
            </li>

            <li className={`keen-slider__slide ${techCard({ theme: 'react'})}`}>
              <Image src={reactIcon} alt='React Icon' />
              <span>React</span>
            </li>

            <li className={`keen-slider__slide ${techCard({ theme: 'nextjs'})}`}>
              <Image src={nextjsIcon} alt='Next.JS Icon' />
              <span>Next.JS</span>
            </li>

            <li className={`keen-slider__slide ${techCard({ theme: 'figma'})}`}>
              <Image src={figmaIcon} alt='Figma Icon' />
              <span>Figma</span>
            </li>
          </div>
        </motion.div>    
      </motion.section>

      <motion.section className={favThingsSection} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
        <div>
          <h2>React</h2>
          <h2>Next.js</h2>
          <h2>Nights 🌙</h2>
        </div>
      </motion.section>

      <SkillsCarousel />
    </main>
  )
}