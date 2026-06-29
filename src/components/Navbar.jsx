import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}
      >
        <div
          className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${scrolled ? 'px-6 py-3 shadow-2xl' : 'px-6 py-0'}`}
          style={scrolled ? {
            background: 'rgba(8,2,26,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(185,79,255,0.15)',
            boxShadow: '0 0 30px rgba(185,79,255,0.1)',
          } : {}}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="font-display font-bold text-lg tracking-tight group">
              <span className="text-white">RT</span>
              <span style={{ color: '#b94fff', textShadow: '0 0 10px #b94fff' }}>.</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium transition-colors duration-200 relative group"
                  style={{ color: '#9d8fbf' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#ece6ff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9d8fbf'}
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #b94fff, #ff2d78)' }} />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://linkedin.com/in/rtripathi97"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#9d8fbf' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#b94fff'; e.currentTarget.style.filter = 'drop-shadow(0 0 6px #b94fff)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#9d8fbf'; e.currentTarget.style.filter = 'none'; }}
                className="transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:rtripathi3113998@gmail.com"
                className="animated-border px-5 py-2 rounded-xl text-white text-sm font-semibold font-display transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, rgba(185,79,255,0.2), rgba(255,45,120,0.2))',
                  boxShadow: '0 0 15px rgba(185,79,255,0.2)',
                }}
              >
                Hire Me
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center relative z-[210] transition-colors"
              style={{ color: open ? '#b94fff' : '#9d8fbf' }}
              onClick={() => setOpen(!open)}
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-4 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col md:hidden"
            style={{ background: 'rgb(4,1,15)' }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid rgba(185,79,255,0.15)' }}>
              <a href="#" className="font-display font-bold text-lg">
                <span className="text-white">RT</span>
                <span style={{ color: '#b94fff', textShadow: '0 0 10px #b94fff' }}>.</span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center transition-colors"
                style={{ color: '#9d8fbf' }}
                onMouseEnter={e => e.currentTarget.style.color = '#b94fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#9d8fbf'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Ambient orb */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(185,79,255,0.08) 0%, transparent 70%)' }} />

            {/* Nav links */}
            <div className="flex flex-col flex-1 px-6 pt-10 gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl font-display font-bold py-4 transition-colors"
                  style={{ color: '#ece6ff', borderBottom: '1px solid rgba(185,79,255,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#b94fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#ece6ff'}
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="mailto:rtripathi3113998@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 px-6 py-4 font-bold font-display rounded-2xl text-center text-lg text-white btn-neon"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
