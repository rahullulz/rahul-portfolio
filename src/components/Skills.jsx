import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = [
  {
    title:'Operations & Leadership', accent:'#b94fff',
    bar:'linear-gradient(90deg,#b94fff,#ff2d78)',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
    skills:['P&L / KPI Ownership','Customer Success','Churn & Utilization','Attrition & Shrinkage','Performance Management','PIP Frameworks','Calibration','WBR / MBR / QBR','Escalation Management','Team Leadership','Coaching & Mentoring'],
  },
  {
    title:'L&D & Enablement', accent:'#00e5ff',
    bar:'linear-gradient(90deg,#00e5ff,#4d9fff)',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>),
    skills:['Training Delivery','TNI','Instructional Design','LMS Administration','SOP & Playbook Dev','Onboarding Optimization','Roleplay Simulations','Curriculum Design'],
  },
  {
    title:'Cloud & Analytics', accent:'#ff2d78',
    bar:'linear-gradient(90deg,#ff2d78,#b94fff)',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>),
    skills:['Google Cloud Platform','Google Workspace','Looker','Digital Transformation','Data-Driven Decisions','QA Metrics','CSAT / AHT / NPS','Google Sites'],
  },
  {
    title:'Sales & CRM', accent:'#d280ff',
    bar:'linear-gradient(90deg,#d280ff,#00e5ff)',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>),
    skills:['B2B Sales','Business Development','Pipeline Management','Salesforce CRM','LinkedIn Sales Nav.','ZoomInfo','BANT Qualification','C-Suite Engagement'],
  },
];

function HUDPanel({ cat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay:index*0.12, duration:0.7, ease:[0.16,1,0.3,1] }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background:'rgba(4,1,15,0.8)',
        border:`1px solid ${cat.accent}22`,
        backdropFilter:'blur(16px)',
        transition:'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=`${cat.accent}55`; e.currentTarget.style.boxShadow=`0 0 40px ${cat.accent}18`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=`${cat.accent}22`; e.currentTarget.style.boxShadow='none'; }}
    >
      {/* Animated grid bg */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage:`linear-gradient(${cat.accent}08 1px,transparent 1px),linear-gradient(90deg,${cat.accent}08 1px,transparent 1px)`,
        backgroundSize:'32px 32px',
      }} />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:cat.bar }} />

      {/* Boot scan line */}
      {inView && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ background:`linear-gradient(90deg,transparent,${cat.accent},transparent)`, zIndex:5 }}
          initial={{ top:0, opacity:0 }}
          animate={{ top:'100%', opacity:[0,0.8,0.8,0] }}
          transition={{ duration:1.2, ease:'linear', delay:index*0.12+0.1 }}
        />
      )}

      {/* HUD corner brackets */}
      {[['top-2 left-2','border-t-2 border-l-2'],['top-2 right-2','border-t-2 border-r-2'],['bottom-2 left-2','border-b-2 border-l-2'],['bottom-2 right-2','border-b-2 border-r-2']].map(([pos, bord], i) => (
        <div key={i} className={`absolute ${pos} w-3.5 h-3.5 ${bord} opacity-50`} style={{ borderColor:cat.accent }} />
      ))}

      <div className="relative z-10 p-7">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background:`${cat.accent}18`, border:`1px solid ${cat.accent}35`, color:cat.accent }}>
            {cat.icon}
          </div>
          <div>
            <div className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color:cat.accent+'aa' }}>MODULE.{String(index+1).padStart(2,'0')}</div>
            <h3 className="font-display font-bold text-base" style={{ color:'#ece6ff' }}>{cat.title}</h3>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {cat.skills.map((skill, j) => (
            <motion.span
              key={j}
              initial={{ opacity:0, scale:0.8 }}
              animate={inView ? { opacity:1, scale:1 } : {}}
              transition={{ delay:index*0.08 + j*0.03 + 0.3, duration:0.35 }}
              className="px-2.5 py-1 rounded-lg text-xs font-mono cursor-default select-none transition-all duration-200"
              style={{ background:`${cat.accent}0d`, border:`1px solid ${cat.accent}25`, color:`${cat.accent}cc` }}
              onMouseEnter={e => { e.currentTarget.style.background=`${cat.accent}22`; e.currentTarget.style.color=cat.accent; e.currentTarget.style.boxShadow=`0 0 10px ${cat.accent}44`; }}
              onMouseLeave={e => { e.currentTarget.style.background=`${cat.accent}0d`; e.currentTarget.style.color=`${cat.accent}cc`; e.currentTarget.style.boxShadow='none'; }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 relative overflow-hidden" style={{ background:'linear-gradient(180deg,#04010f 0%,#080118 50%,#04010f 100%)' }}>
      {/* Background hex grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage:`radial-gradient(circle, rgba(185,79,255,0.15) 1px, transparent 1px)`,
        backgroundSize:'48px 48px',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="mb-16">
          <span className="section-label">Competencies</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3" style={{ color:'#ece6ff' }}>
            Core{' '}
            <span style={{ background:'linear-gradient(135deg,#b94fff,#00e5ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Skills
            </span>
          </h2>
          <p className="mt-3 text-sm font-mono" style={{ color:'#4a3a6a' }}>// 4 modules · {categories.reduce((a,c)=>a+c.skills.length,0)} capabilities</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat, i) => <HUDPanel key={i} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
