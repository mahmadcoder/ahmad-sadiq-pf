'use client'
import { educations as educationItemsStyle } from "./styles";
import { educations } from "@/data/education";
import { motion } from "framer-motion";
import { containerStagger, fadeIn, fadeInUp, hoverLift } from "@/lib/motion";

export default function Education() {
  return (
    <main>
      <motion.ul className={educationItemsStyle} variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        {educations.map((item) => (
          <motion.li key={item.id} variants={fadeInUp}>
            <div>
              <h2>{item.institution}</h2>
              <p>{item.description}</p>
              <time>{item.start_date} - {item.end_date}</time>
            </div>

            {item.links?.certificate_url ? (
              <motion.a
                target="_blank"
                rel="noopener noreferrer"
                href={item.links.certificate_url}
                whileHover={hoverLift.whileHover}
                whileTap={hoverLift.whileTap}
              >
                View certificate
              </motion.a>
            ) : null}
          </motion.li>
        ))}
      </motion.ul>
    </main>
  )
}