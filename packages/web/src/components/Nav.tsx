import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About',    href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Connect',  href: 'connect' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/5 shadow-lg' : ''
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono font-bold text-sm tracking-widest transition-opacity opacity-90 hover:opacity-100"
          style={{ color: 'var(--color-accent)' }}
          aria-label="Back to top"
        >
          rjp<span style={{ color: 'var(--color-muted)' }}>_</span>dev
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="font-mono text-sm tracking-wide"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-white/5"
          >
            <ul className="flex flex-col list-none m-0 p-0 px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => { scrollTo(link.href); setMenuOpen(false) }}
                    className="font-mono text-sm tracking-wide w-full text-left"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
