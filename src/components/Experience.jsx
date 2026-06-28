import { motion } from 'framer-motion';
import { useState } from 'react';

const experiences = [
  {
    role: 'Assistant Manager – Operations',
    company: 'Teleperformance',
    period: 'Mar 2026 – Present',
    tag: 'Promoted',
    tagColor: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    accentColor: 'from-blue-600 to-indigo-600',
    dotColor: 'bg-blue-500',
    location: 'Gurgaon, India',
    highlights: ['Lead 3 TLs & 28 FTEs across 2 LOBs', 'Churn ≤ 11% · Utilization > 80%', 'Authored company-wide process playbook'],
    bullets: [
      'Lead 3 Team Leads and 28 FTEs across 2 LOBs with full operational accountability for attrition, shrinkage, and utilization.',
      'Own the Customer Success program KPIs — holding Churn ≤ 11%, sustaining Utilization > 80%, and driving positive Incremental ACV growth YoY.',
      'Authored a pilot process playbook from scratch, validated by stakeholders and adopted as the reference framework across team and clients.',
      'Run performance-management cycles (coaching, PIPs, calibration, WBR/MBR/QBR) and serve as primary escalation point.',
    ],
  },
  {
    role: 'Cloud BI Process Trainer',
    company: 'Teleperformance',
    period: 'Oct 2024 – Feb 2026',
    tag: 'L&D',
    tagColor: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
    accentColor: 'from-violet-600 to-purple-600',
    dotColor: 'bg-violet-500',
    location: 'Gurgaon, India',
    highlights: ['33% ramp-up reduction', '100% CSAT & NPS all cohorts', 'GCP & Workspace training lead'],
    bullets: [
      'Designed & delivered end-to-end training on Google Workspace & Cloud — cutting ramp-up from 3 weeks to 2 (33% reduction) via self-paced modules and roleplay simulations.',
      'Achieved 100% CSAT and NPS across all training cohorts.',
      'Conducted TNI using QA-score data to diagnose skill gaps and deploy targeted interventions.',
      'Built a library of product decks, SOPs, and documentation; used LMS to track learner progress and present outcomes in WBR/MBR/QBR.',
    ],
  },
  {
    role: 'Business Development Representative – Cloud',
    company: 'Webhelp India (now Concentrix)',
    period: 'Jan 2022 – Sep 2024',
    tag: 'Sales',
    tagColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    accentColor: 'from-cyan-600 to-blue-600',
    dotColor: 'bg-cyan-500',
    location: 'Gurgaon, India',
    highlights: ['$3M+ total pipeline', '198.69% of target Q2 2024', 'Top performer — 116% quota'],
    bullets: [
      'Drove outbound pipeline targeting C-suite executives through cold calling, email, and LinkedIn — contributing to $3M+ total pipeline.',
      'Achieved 198.69% of pipeline target (Q2 2024, top performer); 116% of quota; 90–105% sustained Q3–Q4 2023.',
      'Qualified leads using BANT and partnered with Account Managers to advance high-value opportunities.',
      'Managed prospecting across Salesforce, LinkedIn Sales Navigator, ZoomInfo, Lusha, and Crunchbase.',
      'Mentored new agents on CRM workflows and MQL handling, reducing average onboarding time.',
    ],
  },
  {
    role: 'Team Lead – AMCC',
    company: 'Teleperformance India',
    period: 'Jan 2020 – Dec 2021',
    tag: 'Leadership',
    tagColor: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    accentColor: 'from-amber-600 to-orange-600',
    dotColor: 'bg-amber-500',
    location: 'Gurgaon, India',
    highlights: ['Managed team performance daily', 'QA audits & calibration', 'CSAT, AHT, NPS & Sales ownership'],
    bullets: [
      'Managed daily team performance, resolving behavioral, attendance, and productivity issues through structured PIP frameworks.',
      'Ran call/chat quality audits and live calibration sessions to maintain QA benchmarks.',
      'Drove CSAT, AHT, NPS, and Sales targets through consistent coaching and motivational leadership.',
    ],
  },
  {
    role: 'Senior Operations Representative',
    company: 'Concentrix Daksh Services',
    period: 'Jan 2018 – Dec 2019',
    tag: 'Operations',
    tagColor: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
    accentColor: 'from-slate-600 to-slate-500',
    dotColor: 'bg-slate-500',
    location: 'Gurgaon, India',
    highlights: ['First point of resolution', 'Exceeded CSAT monthly', 'High NPS scores sustained'],
    bullets: [
      'Served as first point of resolution for orders, account management, product queries, and payment issues.',
      'Consistently exceeded monthly customer-satisfaction targets, achieving high NPS scores.',
    ],
  },
  {
    role: 'Sales Advisor',
    company: 'PolicyBazaar.com',
    period: '2016 – 2017',
    tag: 'Sales',
    tagColor: 'bg-pink-500/15 text-pink-400 border-pink-500/25',
    accentColor: 'from-pink-600 to-rose-600',
    dotColor: 'bg-pink-500',
    location: 'Gurgaon, India',
    highlights: ['Health insurance outbound sales', 'Consistent target achievement', 'Trust-led referral network'],
    bullets: [
      'Pitched and closed health-insurance policies on outbound leads, consistently meeting individual sales targets.',
      'Simplified complex insurance concepts to build trust and drive repeat referrals.',
    ],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="section-label">Career Timeline</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mt-3 leading-tight">
          Professional Journey
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/60 via-violet-500/30 to-transparent hidden md:block" />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:pl-14"
            >
              {/* Dot */}
              <div className={`hidden md:flex absolute left-3 top-7 w-5 h-5 rounded-full ${exp.dotColor} items-center justify-center ring-4 ring-[#030712]`}>
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </div>

              <div
                className={`glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 cursor-pointer
                  hover:border-white/10 hover:shadow-xl hover:shadow-black/30 ${expanded === i ? 'border-white/10' : ''}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                {/* Top accent line */}
                <div className={`h-0.5 w-full bg-gradient-to-r ${exp.accentColor}`} />

                <div className="p-6">
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-display font-bold border ${exp.tagColor}`}>
                      {exp.tag}
                    </span>
                    <span className="text-sm text-slate-400 mt-0.5">{exp.period}</span>
                    <span className="text-sm text-slate-500 mt-0.5">· {exp.location}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white mb-1">{exp.role}</h3>
                      <p className="text-blue-400 font-semibold text-sm">{exp.company}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === i ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-8 h-8 rounded-full glass flex items-center justify-center flex-shrink-0 text-slate-400 mt-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Highlights chips — always visible */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.highlights.map((h, j) => (
                      <span key={j} className="px-2.5 py-1 bg-white/4 rounded-lg text-xs text-slate-400 font-medium border border-white/5">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Expanded bullets */}
                  <motion.div
                    initial={false}
                    animate={{ height: expanded === i ? 'auto' : 0, opacity: expanded === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 space-y-2.5 pt-4 border-t border-white/5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-slate-300 text-sm" style={{ lineHeight: 1.7 }}>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
