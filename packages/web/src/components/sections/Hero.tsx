import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, socialLinks } from '@rjp/shared'
import SocialIcons from '../ui/SocialIcons'

function useTypewriter(words: readonly string[], speed = 100, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx % words.length]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, display.length + 1))
        if (display.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        setDisplay(current.slice(0, display.length - 1))
        if (display.length - 1 === 0) {
          setDeleting(false)
          setWordIdx((i) => (i + 1) % words.length)
        }
      }
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, words, speed, pause])

  return display
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: 'easeOut' } }),
}

export default function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full gap-6">
        {/* Greeting */}
        <motion.p
          variants={fadeUp} custom={0.1} initial="hidden" animate="show"
          className="font-mono text-sm tracking-widest uppercase"
          style={{ color: 'var(--color-accent)' }}
        >
          &gt; {profile.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp} custom={0.2} initial="hidden" animate="show"
          className="text-5xl sm:text-7xl font-bold tracking-tight leading-none"
        >
          <span
            style={{
              background: 'linear-gradient(135deg, var(--color-text) 40%, #C0C0C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {profile.name}
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={fadeUp} custom={0.35} initial="hidden" animate="show"
          className="font-mono text-xl sm:text-2xl h-8"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          I am a{' '}
          <span style={{ color: 'var(--color-accent)' }} className="glow-text">
            {role}
            <span className="animate-pulse">▋</span>
          </span>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={fadeUp} custom={0.45} initial="hidden" animate="show">
          <SocialIcons links={socialLinks} />
        </motion.div>

        {/* Stats card */}
        <motion.div
          variants={fadeUp} custom={0.55} initial="hidden" animate="show"
          className="glass glass-card glow rounded-2xl px-6 py-4 flex flex-col w-full max-w-md mt-2"
        >
          {profile.stats.map((stat, i) => (
            <div key={stat.label}>
              {i > 0 && <div style={{ borderTop: '1px solid rgba(192,192,192,0.1)' }} />}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-6 py-3">
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {stat.label}
                </span>
                <span className="font-mono font-semibold text-sm sm:text-right" style={{ color: 'var(--color-accent)' }}>
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
