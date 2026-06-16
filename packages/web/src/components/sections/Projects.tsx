import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects, profile } from '@rjp/shared'
import type { Project } from '@rjp/shared'

// Vite asset imports for thumbnails
import stockImg       from '../../assets/stock_home.jpg'
import distanceImg    from '../../assets/distance_reader.jpg'
import voxlImg        from '../../assets/voxl.png'
import turtlebotImg   from '../../assets/turtlebot3.jpg'

const thumbnails: Record<string, string> = {
  'stock_home.jpg':       stockImg,
  'distance_reader.jpg':  distanceImg,
  'voxl.png':             voxlImg,
  'turtlebot3.jpg':       turtlebotImg,
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } }),
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.button
      variants={fadeUp}
      whileHover={{ boxShadow: '0 0 24px rgba(255,215,0,0.12)', backgroundColor: 'rgba(255,255,255,0.08)' }}
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden text-left w-full cursor-pointer transition-all duration-300 group"
      aria-label={`View details for ${project.title}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44">
        <img
          src={thumbnails[project.thumbnail]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {project.youtubeEmbedUrl && (
          <div
            className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-mono"
            style={{ background: 'rgba(0,0,0,0.75)', color: 'var(--color-accent)' }}
          >
            ▶ Video
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-accent)' }}>
            {project.subtitle}
          </p>
          <h3 className="text-lg font-semibold">{project.title}</h3>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono rounded-full px-2 py-0.5"
              style={{ background: 'rgba(192,192,192,0.06)', color: 'var(--color-accent)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="glass rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail */}
        <div className="relative h-56">
          <img
            src={thumbnails[project.thumbnail]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 glass rounded-full w-8 h-8 flex items-center justify-center text-sm hover:scale-110 transition-transform"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-5">
            <p className="font-mono text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--color-accent)' }}>
              {project.subtitle}
            </p>
            <h3 className="text-2xl font-bold">{project.title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          <p className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {project.description}
          </p>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-muted)' }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono rounded-full px-3 py-1"
                  style={{ background: 'rgba(192,192,192,0.07)', color: 'var(--color-accent)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.youtubeEmbedUrl && (
            <div className="rounded-xl overflow-hidden aspect-video">
              <iframe
                src={project.youtubeEmbedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-16 px-6 scroll-mt-20" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
            02.
          </p>
          <h2 className="text-4xl font-bold">Featured Projects</h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 gap-6"
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} custom={i} variants={fadeUp}>
              <ProjectCard project={project} onClick={() => setSelected(project)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio PDF */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={`${import.meta.env.BASE_URL}${profile.portfolioUrl}`}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-xl px-6 py-3 font-mono text-sm tracking-wide transition-all duration-200 hover:scale-105"
            style={{ color: 'var(--color-accent)', border: '1px solid rgba(192,192,192,0.2)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
          >
            View Full Portfolio →
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
