import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Connect from './components/sections/Connect'

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-base)', color: 'var(--color-text)' }}
    >
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Connect />
      </main>
    </div>
  )
}
