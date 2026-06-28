import { motion } from 'framer-motion';

const interests = [
  {
    title: 'Security & VDPs',
    description: 'Active engagement in Vulnerability Disclosure Programs (VDPs) and continuous learning in systems security testing and threat diagnostics.',
    tags: ['VDP Research', 'Security Testing', 'Threat Diagnostics'],
    gradient: 'from-blue-600 to-indigo-600',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-blue-500/10',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Photography & Image Editing',
    description: 'Proficient in advanced image manipulation, dynamic background processing, and high-fidelity stylistic enhancements.',
    tags: ['Photo Editing', 'Visual Design', 'Background Processing'],
    gradient: 'from-violet-600 to-pink-600',
    border: 'border-violet-500/20',
    glow: 'hover:shadow-violet-500/10',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Interests() {
  return (
    <section className="py-20 px-6 md:px-12" style={{ background: 'linear-gradient(180deg, #030712 0%, #080d1a 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="section-label">Beyond Work</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-3">Interests & Pursuits</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interests.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`glass glass-hover rounded-2xl border ${item.border} p-7 group relative overflow-hidden hover:shadow-xl ${item.glow}`}
            >
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${item.gradient}`} />
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg relative`}>
                {item.icon}
              </div>

              <h3 className="font-display font-bold text-white text-xl mb-3">{item.title}</h3>
              <p className="text-slate-300 text-sm mb-5" style={{ lineHeight: 1.75 }}>{item.description}</p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 glass rounded-full text-xs text-slate-400 border border-white/8 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
