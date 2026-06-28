import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-display font-bold text-xl text-white">RT</span>
          <span className="text-blue-500 font-bold text-xl">.</span>
          <p className="text-slate-600 text-xs mt-1 font-mono">Assistant Manager – Operations & Strategy</p>
        </motion.div>

        <div className="flex items-center gap-6">
          <a href="mailto:rtripathi3113998@gmail.com" className="text-slate-600 hover:text-blue-400 text-sm transition-colors duration-200">Email</a>
          <a href="https://linkedin.com/in/rtripathi97" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-400 text-sm transition-colors duration-200">LinkedIn</a>
          <a href="#hero" className="text-slate-600 hover:text-slate-300 text-sm transition-colors duration-200">Top ↑</a>
        </div>

        <p className="text-slate-700 text-xs font-mono">© {new Date().getFullYear()} Rahul Tripathi. All rights reserved.</p>
      </div>
    </footer>
  );
}
