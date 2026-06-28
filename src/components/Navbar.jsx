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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'glass px-6 py-3 shadow-2xl shadow-black/40'
              : 'px-6 py-0'
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="font-display font-bold text-lg tracking-tight group">
              <span className="text-white group-hover:text-gradient-blue transition-all duration-300">RT</span>
              <span className="text-blue-500 ml-0.5">.</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://linkedin.com/in/rtripathi97"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:rtripathi3113998@gmail.com"
                className="px-5 py-2 animated-border rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold font-display transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-slate-400 hover:text-white w-10 h-10 flex items-center justify-center relative z-[210]"
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

      {/* Full-screen mobile menu overlay — rendered outside header so it covers everything */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col md:hidden"
            style={{ background: 'rgb(8, 12, 22)' }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <a href="#" className="font-display font-bold text-lg">
                <span className="text-white">RT</span>
                <span className="text-blue-500">.</span>
              </a>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white w-10 h-10 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col flex-1 px-6 pt-8 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-2xl font-display font-bold text-slate-200 hover:text-white py-4 border-b border-white/8 transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.a
                href="mailto:rtripathi3113998@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold font-display rounded-2xl text-center text-lg transition-colors"
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
