'use client';

import Link from "next/link";
import Image from "next/image";

import ghIcon from '../../../../public/images/github.svg';
import inIcon from '../../../../public/images/linkedin.svg';

import { container } from "./styles";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { containerStagger, fadeIn, fadeInUp, hoverLift } from "@/lib/motion";

const navLinks = [
  { name: 'ahmad.', href: '/' },
  { name: 'experience', href: '/experience' },
  { name: 'projects', href: '/projects' },
  { name: 'education', href: '/education' },
]

export function MenuNav() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return href === pathname;
  }

  return (
    <motion.header
      className={container}
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <nav>
        <motion.ul variants={containerStagger} initial="hidden" animate="show">
          {navLinks.map((link =>  (
              <motion.li
                variants={fadeInUp}
                whileHover={hoverLift.whileHover}
                whileTap={hoverLift.whileTap}
                key={link.name}
                className={isActive(link.href) ? "activeLink" : ''}
              >
                <Link href={link.href}>{link.name}</Link>
              </motion.li>
            )
          ))}

          <motion.span variants={fadeInUp}>
            <motion.a
              whileHover={hoverLift.whileHover}
              whileTap={hoverLift.whileTap}
              target="_blank"
              href="https://github.com/mahmadcoder"
              rel="noreferrer"
            >
              <Image src={ghIcon} alt="GitHub Icon" />
            </motion.a>
            <motion.a
              whileHover={hoverLift.whileHover}
              whileTap={hoverLift.whileTap}
              target="_blank"
              href="https://www.linkedin.com/in/devahmad-sadiq/"
              rel="noreferrer"
            >
              <Image src={inIcon} alt="LinkedIn Icon" />
            </motion.a>
          </motion.span>
        </motion.ul>
      </nav>
    </motion.header>
  )
}