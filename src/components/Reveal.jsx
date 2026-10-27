import { motion } from 'framer-motion'

// Fade-in + slide-up ringan saat elemen masuk layar. MotionConfig reducedMotion="user" mematikannya bila diminta.
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const M = motion[as]
  return (
    <M
      {...rest}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
