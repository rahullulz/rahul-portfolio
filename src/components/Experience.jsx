import { motion } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

const experiences = [
  {
    role: 'Assistant Manager – Operations', company: 'Teleperformance',
    period: 'Mar 2026 – Present', tag: 'Promoted',
    tagStyle: { background:'rgba(185,79,255,0.12)', color:'#d280ff', border:'1px solid rgba(185,79,255,0.3)' },
    bar: 'from-purple-500 to-pink-500', dot: '#b94fff',
    location: 'Gurgaon, India',
    highlights: ['Lead 3 TLs & 28 FTEs', 'Churn ≤ 11%', 'Utilization > 80%'],
    bullets: [
      'Lead 3 Team Leads and 28 FTEs across 2 LOBs with full operational accountability for attrition, shrinkage, and utilization.',
      'Own Customer Success KPIs — Churn ≤ 11%, Utilization > 80%, driving positive Incremental ACV growth YoY.',
      'Authored a pilot process playbook from scratch, adopted as the reference framework across team and clients.',
      'Run performance-management cycles (coaching, PIPs, calibration, WBR/MBR/QBR) and serve as primary escalation point.',
    ],
  },
  {
    role: 'Cloud BI Process Trainer', company: 'Teleperformance',
    period: 'Oct 2024 – Feb 2026', tag: 'L&D',
    tagStyle: { background:'rgba(0,229,255,0.08)', color:'#00e5ff', border:'1px solid rgba(0,229,255,0.25)' },
    bar: 'from-cyan-400 to-blue-500', dot: '#00e5ff',
    location: 'Gurgaon, India',
    highlights: ['33% ramp-up reduction', '100% CSAT & NPS', 'GCP & Workspace lead'],
    bullets: [
      'Designed & delivered end-to-end training on Google Workspace & Cloud — cutting ramp-up from 3 weeks to 2 (33% reduction).',
      'Achieved 100% CSAT and NPS across all training cohorts.',
      'Conducted TNI using QA-score data to diagnose skill gaps and deploy targeted interventions.',
      'Built a library of product decks, SOPs, and documentation; used LMS to track learner progress.',
    ],
  },
  {
    role: 'Business Development Representative – Cloud', company: 'Webhelp India (now Concentrix)',
    period: 'Jan 2022 – Sep 2024', tag: 'Sales',
    tagStyle: { background:'rgba(255,45,120,0.10)', color:'#ff6fa0', border:'1px solid rgba(255,45,120,0.25)' },
    bar: 'from-pink-500 to-rose-500', dot: '#ff2d78',
    location: 'Gurgaon, India',
    highlights: ['$3M+ pipeline', '198.69% of target Q2', 'Top performer 116%'],
    bullets: [
      'Drove outbound pipeline targeting C-suite executives through cold calling, email, and LinkedIn — $3M+ total pipeline.',
      'Achieved 198.69% of pipeline target (Q2 2024, top performer); 116% of quota.',
      'Qualified leads using BANT and partnered with Account Managers on high-value opportunities.',
      'Managed prospecting across Salesforce, LinkedIn Sales Navigator, ZoomInfo, Lusha, and Crunchbase.',
    ],
  },
  {
    role: 'Team Lead – AMCC', company: 'Teleperformance India',
    period: 'Jan 2020 – Dec 2021', tag: 'Leadership',
    tagStyle: { background:'rgba(251,191,36,0.10)', color:'#fbbf24', border:'1px solid rgba(251,191,36,0.25)' },
    bar: 'from-amber-400 to-orange-500', dot: '#f59e0b',
    location: 'Gurgaon, India',
    highlights: ['Team performance ownership', 'QA audits & calibration', 'CSAT / AHT / NPS / Sales'],
    bullets: [
      'Managed daily team performance, resolving behavioral, attendance, and productivity issues via PIP frameworks.',
      'Ran call/chat quality audits and live calibration sessions to maintain QA benchmarks.',
      'Drove CSAT, AHT, NPS, and Sales targets through consistent coaching and motivational leadership.',
    ],
  },
  {
    role: 'Senior Operations Representative', company: 'Concentrix Daksh Services',
    period: 'Jan 2018 – Dec 2019', tag: 'Operations',
    tagStyle: { background:'rgba(148,163,184,0.08)', color:'#94a3b8', border:'1px solid rgba(148,163,184,0.2)' },
    bar: 'from-slate-400 to-slate-500', dot: '#94a3b8',
    location: 'Gurgaon, India',
    highlights: ['First-point resolution', 'Exceeded CSAT monthly', 'High NPS sustained'],
    bullets: [
      'Served as first point of resolution for orders, account management, product queries, and payment issues.',
      'Consistently exceeded monthly customer-satisfaction targets, achieving high NPS scores.',
    ],
  },
  {
    role: 'Sales Advisor', company: 'PolicyBazaar.com',
    period: '2016 – 2017', tag: 'Sales',
    tagStyle: { background:'rgba(255,45,120,0.08)', color:'#ff6fa0', border:'1px solid rgba(255,45,120,0.2)' },
    bar: 'from-pink-400 to-rose-500', dot: '#ff2d78',
    location: 'Gurgaon, India',
    highlights: ['Health insurance outbound', 'Consistent targets', 'Referral network'],
    bullets: [
      'Pitched and closed health-insurance policies on outbound leads, consistently meeting individual sales targets.',
      'Simplified complex insurance concepts to build trust and drive repeat referrals.',
    ],
  },
];

function TiltCard({ children, style, className, onClick, isExpanded }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = -((y - r.height/2) / r.height) * 8;
    const ry =  ((x - r.width/2)  / r.width)  * 8;
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    el.style.transition = 'transform 0.1s ease';
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) { ref.current.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)'; ref.current.style.transition = 'transform 0.5s ease'; }
  }, []);
  return (
    <div ref={ref} style={{ ...style, transformStyle:'preserve-3d' }} className={className} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </div>
  );
}

export default function Experience() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
        transition={{ duration:0.7 }} className="mb-16">
        <span className="section-label">Career Timeline</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl mt-3 leading-tight" style={{ color:'#ece6ff' }}>
          Professional Journey
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-[22px] top-4 bottom-4 w-px hidden md:block"
          style={{ background:'linear-gradient(to bottom, #b94fff88, #ff2d7844, transparent)' }} />

        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.07, duration:0.6 }} className="relative md:pl-14">

              <div className="hidden md:flex absolute left-3 top-7 w-5 h-5 rounded-full items-center justify-center ring-4"
                style={{ background:exp.dot, ringColor:'#04010f', boxShadow:`0 0 12px ${exp.dot}88` }}>
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </div>

              <TiltCard
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: expanded===i ? 'rgba(185,79,255,0.07)' : 'rgba(185,79,255,0.03)',
                  border: `1px solid ${expanded===i ? 'rgba(185,79,255,0.3)' : 'rgba(185,79,255,0.1)'}`,
                  backdropFilter:'blur(12px)',
                  boxShadow: expanded===i ? `0 0 40px rgba(185,79,255,0.12)` : 'none',
                  transition:'background 0.3s, border 0.3s, box-shadow 0.3s',
                }}
                onClick={() => setExpanded(expanded===i ? null : i)}
              >
                <div className={`h-0.5 w-full bg-gradient-to-r ${exp.bar}`} />
                <div className="p-6">
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-display font-bold" style={exp.tagStyle}>{exp.tag}</span>
                    <span className="text-sm mt-0.5" style={{ color:'#7a6a9a' }}>{exp.period}</span>
                    <span className="text-sm mt-0.5" style={{ color:'#4a3a6a' }}>· {exp.location}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-xl mb-1" style={{ color:'#ece6ff' }}>{exp.role}</h3>
                      <p className="font-semibold text-sm" style={{ color:'#b94fff' }}>{exp.company}</p>
                    </div>
                    <motion.div animate={{ rotate: expanded===i ? 45 : 0 }} transition={{ duration:0.25 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background:'rgba(185,79,255,0.08)', border:'1px solid rgba(185,79,255,0.2)', color:'#b94fff' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.highlights.map((h,j) => (
                      <span key={j} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{ background:'rgba(185,79,255,0.06)', border:'1px solid rgba(185,79,255,0.12)', color:'#9d8fbf' }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  <motion.div initial={false}
                    animate={{ height: expanded===i ? 'auto' : 0, opacity: expanded===i ? 1 : 0 }}
                    transition={{ duration:0.35, ease:[0.16,1,0.3,1] }} className="overflow-hidden">
                    <ul className="mt-5 space-y-2.5 pt-4" style={{ borderTop:'1px solid rgba(185,79,255,0.1)' }}>
                      {exp.bullets.map((b,j) => (
                        <li key={j} className="flex gap-3 text-sm" style={{ lineHeight:1.7, color:'#9d8fbf' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background:exp.dot }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
