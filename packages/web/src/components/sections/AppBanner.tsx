import { motion } from 'framer-motion'
import { profile } from '@rjp/shared'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: 'easeOut' } }),
}

export default function AppBanner() {
  return (
    <div className="w-full max-w-md">
      <motion.div
        variants={fadeUp} custom={0} initial="hidden" animate="show"
        className="rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{
          background: 'rgba(192,192,192,0.05)',
          border: '1px solid rgba(192,192,192,0.12)',
        }}
      >
        <div className="flex-1">
          <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-accent)' }}>
            Now Available
          </p>
          <p className="text-sm font-semibold text-white">RJP Portfolio App</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
            AI chat · GitHub feed · iOS & Android
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* App Store badge */}
          <a
            href={profile.appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-opacity duration-200 hover:opacity-80"
            style={{ background: '#000', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <svg width="18" height="22" viewBox="0 0 814 1000" fill="white">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.7 268.5-317.7 99.8 0 182.6 65.8 244.8 65.8 60.1 0 154.1-69.1 268.4-69.1zm-126.7-175c59.5-69.7 91.5-139.5 91.5-207.8 0-9.7 0-19.4-1.3-29.1-89.5 3.2-194.7 60-258.4 142.7-48.1 60.4-93.7 149.5-93.7 240.8 0 11 1.9 21.9 2.6 25.2 5.8.6 15.5 1.9 25.2 1.9 80 0 178.6-53.7 234.1-173.7z"/>
            </svg>
            <span className="flex flex-col leading-tight">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px' }}>Download on the</span>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600, letterSpacing: '0.01em' }}>App Store</span>
            </span>
          </a>

          {/* Google Play badge */}
          <a
            href={profile.googlePlayUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-opacity duration-200 hover:opacity-80"
            style={{ background: '#000', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <svg width="18" height="20" viewBox="0 0 512 512">
              <path fill="#4CAF50" d="M64 0L352 256 64 512z"/>
              <path fill="#F44336" d="M0 0h64l288 256L64 512H0z" opacity=".8"/>
              <path fill="#FFEB3B" d="M352 256l96-56 64 56-64 56z"/>
              <path fill="#2196F3" d="M448 200l-96 56L64 512l288-312z"/>
              <path fill="#4CAF50" d="M64 0l288 200-96 56z"/>
            </svg>
            <span className="flex flex-col leading-tight">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px' }}>Get it on</span>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600, letterSpacing: '0.01em' }}>Google Play</span>
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
