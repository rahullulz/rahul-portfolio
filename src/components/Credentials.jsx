import { motion } from 'framer-motion';

const certs = [
  {
    title: 'Digital Transformation with Google Cloud',
    issuer: 'Google Cloud Skill Boost',
    gradient: 'from-blue-600 to-cyan-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'TP BEST – Training & Development Certified',
    issuer: 'Teleperformance',
    gradient: 'from-violet-600 to-purple-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'TP TOPS Certified',
    issuer: 'Teleperformance',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function Credentials() {
  return (
    <section id="credentials" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="section-label">Education & Certs</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-3">Credentials</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left column */}
        <div className="space-y-5">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass glass-hover rounded-2xl border border-white/6 p-7 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
                  <path d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-.608.065-1.2.184-1.772L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
                </svg>
              </div>
              <div>
                <div className="section-label mb-1">Education</div>
                <div className="font-display font-bold text-white text-lg">Bachelor of Commerce</div>
                <div className="text-blue-400 font-semibold text-sm mt-0.5">University of Delhi, New Delhi</div>
                <div className="text-slate-400 text-sm mt-2">2016 – 2020</div>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass glass-hover rounded-2xl border border-white/6 p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-pink-500" />
            <div className="section-label mb-5">Languages</div>
            <div className="space-y-4">
              {[
                { lang: 'English', level: 'Professional Proficiency', pct: 92, color: 'from-blue-500 to-indigo-500' },
                { lang: 'Hindi', level: 'Native Speaker', pct: 100, color: 'from-violet-500 to-purple-500' },
              ].map((l) => (
                <div key={l.lang}>
                  <div className="flex justify-between mb-2">
                    <span className="font-display font-semibold text-white text-sm">{l.lang}</span>
                    <span className="text-slate-500 text-xs font-mono">{l.level}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${l.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Certifications */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-5"
          >
            Certifications
          </motion.div>
          <div className="space-y-4">
            {certs.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass glass-hover rounded-2xl border border-white/6 p-5 flex items-center gap-4 relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  {cert.icon}
                </div>
                <div>
                  <div className="font-display font-semibold text-white text-sm leading-snug">{cert.title}</div>
                  <div className="text-slate-400 text-sm mt-1">{cert.issuer}</div>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
