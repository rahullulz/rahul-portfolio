import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const highlights = [
  {
    label: 'Currently',
    value: 'Asst. Manager – Operations',
    sub: 'Teleperformance, Gurgaon',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 21h18M3 21H1m20 0h2M9 21V11h6v10" />
      </svg>
    ),
    accent: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-500/40',
  },
  {
    label: 'Education',
    value: 'B.Com — University of Delhi',
    sub: '2016 – 2020',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-.608.065-1.2.184-1.772L12 14z" />
      </svg>
    ),
    accent: 'text-violet-400',
    border: 'border-violet-500/20 hover:border-violet-500/40',
  },
  {
    label: 'Languages',
    value: 'English · Hindi',
    sub: 'Professional · Native',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    accent: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 items-center">

        {/* Left: Text */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="section-label">About Me</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-8"
          >
            Operations leader who makes{' '}
            <span className="text-gradient-blue">numbers move.</span>
          </motion.h2>

          {['With over 9 years across BPO operations, learning & development, and B2B cloud sales, I specialize in owning commercial KPIs end-to-end — not just reporting them.',
            'At Teleperformance, I lead cross-functional teams directly influencing Churn, Utilization, and Incremental ACV. Before operations, I built commercial instincts generating $3M+ in cloud pipeline, hitting 198% of quota.',
            'I believe the best operations leaders are translators: turning data into decisions, and execution into stakeholder confidence.'].map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-slate-300 mb-4" style={{ lineHeight: 1.75 }}
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-3 mt-8"
          >
            <a
              href="mailto:rtripathi3113998@gmail.com"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-display font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
            >
              Get in Touch
            </a>
            <a
              href="https://linkedin.com/in/rtripathi97"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 glass hover:bg-white/6 text-slate-300 text-sm font-display font-semibold rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 hover:-translate-y-0.5"
            >
              LinkedIn Profile
            </a>
          </motion.div>
        </div>

        {/* Right: Cards */}
        <div className="space-y-4">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`glass rounded-2xl p-5 border transition-all duration-300 ${h.border} flex items-center gap-5 group cursor-default`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${h.accent} bg-current/10`}
                style={{ background: 'rgba(99,102,241,0.08)' }}>
                <span className={h.accent}>{h.icon}</span>
              </div>
              <div>
                <div className="section-label mb-0.5">{h.label}</div>
                <div className="font-display font-semibold text-white">{h.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{h.sub}</div>
              </div>
            </motion.div>
          ))}

          {/* Quote card */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 border border-violet-500/15 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 to-transparent" />
            <p className="text-slate-300 italic font-light leading-relaxed text-sm">
              "Turning operational performance into explicit business value — that's the mission."
            </p>
            <p className="section-label mt-3">— Rahul Tripathi</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
