'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, hoverLift, containerStagger } from '@/lib/motion';

import ghIcon from '../../../../public/images/github.svg';
import inIcon from '../../../../public/images/linkedin.svg';
import { container } from './styles';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // This will only run on the client side
    setYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer className={container} variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <section>
        <motion.div variants={containerStagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.strong variants={fadeInUp}>Follow me</motion.strong>
          <span>
            <motion.a
              whileHover={hoverLift.whileHover}
              whileTap={hoverLift.whileTap}
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mahmadcoder"
            >
              <Image src={ghIcon} alt="GitHub" width={24} height={24} />
            </motion.a>
            <motion.a
              whileHover={hoverLift.whileHover}
              whileTap={hoverLift.whileTap}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/devahmad-sadiq/"
            >
              <Image src={inIcon} alt="LinkedIn" width={24} height={24} />
            </motion.a>
          </span>
        </motion.div>
      </section>
      <motion.p variants={fadeInUp}>ahmad{year ? ` © ${year}` : ''}</motion.p>
    </motion.footer>
  );
}