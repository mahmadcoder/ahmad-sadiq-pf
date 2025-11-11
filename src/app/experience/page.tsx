'use client'
import { experience, intro, resumeDownload } from "./styles";
import { motion } from "framer-motion";
import { containerStagger, fadeIn, fadeInUp, hoverLift } from "@/lib/motion";

export default function Experience() {
  return (
    <main>
      <motion.header className={intro} variants={fadeIn} initial="hidden" animate="show">
        <p>
        {'< '}
        Get to know me better and explore my journey as a <strong>Front-End Developer</strong>
        {' />'}
        </p>
        <motion.a
          className={resumeDownload}
          href="/downloads/ahmad-frontend-se.pdf"
          download
          whileHover={hoverLift.whileHover}
          whileTap={hoverLift.whileTap}
        >
          Download
        </motion.a>
      </motion.header>

      <motion.ul className={experience} variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.li variants={fadeInUp} whileHover={hoverLift.whileHover}>
          <div className="experience-details">
            <h2>Frontend Developer</h2>
            <span>Full-time</span>
            <time>April 2025 - Present</time>
            <address>Lahore, Pakistan</address>
          </div>

          <div className="experience-activity">
            <h3>Sovanza</h3>
            <p>• Developed dynamic web applications using React.js and Next.js with complete CRUD functionality for data management.</p>
            <p>• Integrated REST APIs to handle data flow between frontend and backend systems.</p>
          </div>
        </motion.li>

        <motion.li variants={fadeInUp} whileHover={hoverLift.whileHover}>
          <div className="experience-details">
            <h2>Frontend Developer (Remote)</h2>
            <span>Intern</span>
            <time>Jun 2024 - Aug 2024</time>
            <address>Islamabad, Pakistan (Remote)</address>
          </div>

          <div className="experience-activity">
            <h3>NovaSyn Dynamics</h3>
            <p>• Developed and implemented cutting-edge user interface designs using React, Next.js, and Tailwind CSS.</p>
            <p>• Utilized API integration techniques to streamline data retrieval, reducing load times by 30% and improving overall user experience.</p>
          </div>
        </motion.li>
      </motion.ul>
    </main>
  )
}