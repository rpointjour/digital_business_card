import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { profile, skills } from '@rjp/shared'
import profilePhoto from '../../assets/profile.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="pt-8 pb-16 px-6 scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="mb-8"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
            01.
          </p>
          <h2 className="text-4xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Bio — left (3 cols) */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            <div className="glass glass-card rounded-2xl p-6 flex flex-col gap-4">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tech stack chips */}
            <div>
              <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Technologies
              </p>
              <motion.div
                variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill) => (
                  <motion.div key={skill.name} variants={fadeUp}>
                    {skill.url ? (
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noreferrer"
                        className="glass rounded-full px-3 py-1 text-xs font-mono transition-all duration-200 hover:scale-105 inline-block"
                        style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                      >
                        {skill.name}
                      </a>
                    ) : (
                      <span
                        className="glass rounded-full px-3 py-1 text-xs font-mono inline-block"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {skill.name}
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Photo — right (2 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="md:col-span-2 flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Glow ring — blurred, no hard border */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-25 blur-xl pointer-events-none"
                style={{ background: 'var(--color-accent)' }}
              />
              <img
                src={profilePhoto}
                alt="Roody Pointjour"
                className="relative w-64 h-80 object-cover object-top block"
                style={{ border: 'none', outline: 'none' }}
              />
              {/* Tooltip badge */}
              <div
                className="absolute -bottom-3 -right-3 glass rounded-xl px-3 py-1.5 text-xs font-mono"
                style={{ color: 'var(--color-accent)' }}
              >
                Nice to meet you!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
