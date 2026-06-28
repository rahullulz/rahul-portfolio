import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Operations & Leadership',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-blue-600 to-indigo-600',
    glow: 'shadow-blue-500/20',
    border: 'border-blue-500/20',
    tagBg: 'bg-blue-500/10 text-blue-300 border-blue-500/15',
    skills: ['P&L / KPI Ownership', 'Customer Success', 'Churn & Utilization', 'Attrition & Shrinkage', 'Performance Management', 'PIP Frameworks', 'Calibration', 'WBR / MBR / QBR', 'Escalation Management', 'Team Leadership', 'Coaching & Mentoring'],
  },
  {
    title: 'L&D & Enablement',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/20',
    tagBg: 'bg-violet-500/10 text-violet-300 border-violet-500/15',
    skills: ['Training Delivery', 'TNI', 'Instructional Design', 'LMS Administration', 'SOP & Playbook Dev', 'Onboarding Optimization', 'Roleplay Simulations', 'Curriculum Design'],
  },
  {
    title: 'Cloud & Analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    gradient: 'from-cyan-600 to-blue-600',
    glow: 'shadow-cyan-500/20',
    border: 'border-cyan-500/20',
    tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/15',
    skills: ['Google Cloud Platform', 'Google Workspace', 'Looker', 'Digital Transformation', 'Data-Driven Decisions', 'QA Metrics', 'CSAT / AHT / NPS', 'Google Sites'],
  },
  {
    title: 'Sales & CRM',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: 'from-emerald-600 to-teal-600',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/20',
    tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/15',
    skills: ['B2B Sales', 'Business Development', 'Pipeline Management', 'Salesforce CRM', 'LinkedIn Sales Navigator', 'ZoomInfo', 'BANT Qualification', 'C-Suite Engagement'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12" style={{ background: 'linear-gradient(180deg, #030712 0%, #080d1a 50%, #030712 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="section-label">Competencies</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-3">Core Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`glass glass-hover rounded-2xl border ${cat.border} p-7 relative overflow-hidden group`}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.gradient}`} />

              {/* Glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} bg-opacity-10 flex items-center justify-center shadow-lg ${cat.glow}`}
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span className={`bg-gradient-to-br ${cat.gradient} bg-clip-text`} style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {cat.icon}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 + j * 0.025, duration: 0.4 }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${cat.tagBg} cursor-default hover:scale-105 transition-transform duration-150`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
