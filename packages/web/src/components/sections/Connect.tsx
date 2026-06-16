import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { profile, socialLinks } from '@rjp/shared'
import SocialIcons from '../ui/SocialIcons'

export default function Connect() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [toastVisible, setToastVisible] = useState(false)

  function handleEmailClick() {
    navigator.clipboard.writeText(profile.email)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  return (
    <section id="connect" className="py-16 px-6 scroll-mt-20" ref={ref}>
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
            03.
          </p>
          <h2 className="text-4xl font-bold">Let's Connect</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-base leading-relaxed max-w-md"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is open.
        </motion.p>

        {/* Email CTA */}
        <motion.button
          onClick={handleEmailClick}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-8 py-4 rounded-2xl font-mono text-base tracking-wide transition-all duration-200 cursor-pointer"
          style={{
            background: 'rgba(192,192,192,0.07)',
            border: '1px solid rgba(192,192,192,0.25)',
            color: 'var(--color-accent)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(192,192,192,0.07)' }}
        >
          Say Hello →
        </motion.button>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <SocialIcons links={socialLinks} />
        </motion.div>

        {/* Blog link */}
        <motion.a
          href={profile.blogUrl}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          Read my Blog ↗
        </motion.a>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center font-mono text-xs mt-20"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        Built & designed by {profile.name}
      </motion.p>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 glass rounded-2xl px-6 py-4 flex flex-col gap-1 z-50"
            style={{ border: '1px solid rgba(192,192,192,0.15)', minWidth: '260px' }}
          >
            <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
              Email copied to clipboard!
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {profile.email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
