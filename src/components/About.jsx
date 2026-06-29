import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';

const fadeUp = {
  hidden: { opacity:0, y:40 },
  visible: (i=0) => ({ opacity:1, y:0, transition:{ delay:i*0.12, duration:0.7, ease:[0.16,1,0.3,1] } }),
};

const highlights = [
  {
    label:'Currently', value:'Asst. Manager – Operations', sub:'Teleperformance, Gurgaon',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M3 21h18M9 21V11h6v10" /></svg>),
    accent:'#b94fff', border:'rgba(185,79,255,0.15)', borderHover:'rgba(185,79,255,0.4)', glow:'rgba(185,79,255,0.1)',
  },
  {
    label:'Education', value:'B.Com — University of Delhi', sub:'2016 – 2020',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-.608.065-1.2.184-1.772L12 14z" /></svg>),
    accent:'#00e5ff', border:'rgba(0,229,255,0.12)', borderHover:'rgba(0,229,255,0.35)', glow:'rgba(0,229,255,0.08)',
  },
  {
    label:'Languages', value:'English · Hindi', sub:'Professional · Native',
    icon:(<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>),
    accent:'#ff2d78', border:'rgba(255,45,120,0.12)', borderHover:'rgba(255,45,120,0.35)', glow:'rgba(255,45,120,0.08)',
  },
];

function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = -((e.clientY-r.top-r.height/2)/r.height)*6;
    const ry =  ((e.clientX-r.left-r.width/2)/r.width)*6;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    el.style.transition = 'transform 0.1s ease';
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) { ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'; ref.current.style.transition = 'transform 0.5s ease'; }
  }, []);
  return (
    <div ref={ref} style={{ ...style, transformStyle:'preserve-3d' }} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20 items-center">

        <div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once:true }} className="mb-6">
            <span className="section-label">About Me</span>
          </motion.div>

          <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once:true }}
            className="font-display font-bold text-4xl md:text-5xl leading-tight mb-8" style={{ color:'#ece6ff' }}>
            Operations leader who makes{' '}
            <span style={{ background:'linear-gradient(135deg, #b94fff, #ff2d78)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              numbers move.
            </span>
          </motion.h2>

          {[
            'With over 9 years across BPO operations, learning & development, and B2B cloud sales, I specialize in owning commercial KPIs end-to-end — not just reporting them.',
            'At Teleperformance, I lead cross-functional teams directly influencing Churn, Utilization, and Incremental ACV. Before operations, I built commercial instincts generating $3M+ in cloud pipeline, hitting 198% of quota.',
            'I believe the best operations leaders are translators: turning data into decisions, and execution into stakeholder confidence.',
          ].map((p,i) => (
            <motion.p key={i} variants={fadeUp} custom={i+2} initial="hidden" whileInView="visible" viewport={{ once:true }}
              className="mb-4" style={{ lineHeight:1.75, color:'#9d8fbf' }}>{p}</motion.p>
          ))}

          <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once:true }} className="flex gap-3 mt-8">
            <a href="mailto:rtripathi3113998@gmail.com"
              className="btn-neon px-6 py-3 text-white text-sm font-display font-bold rounded-xl">
              Get in Touch
            </a>
            <a href="https://linkedin.com/in/rtripathi97" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-display font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ color:'#9d8fbf', background:'rgba(185,79,255,0.06)', border:'1px solid rgba(185,79,255,0.15)' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(185,79,255,0.35)';e.currentTarget.style.color='#ece6ff';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(185,79,255,0.15)';e.currentTarget.style.color='#9d8fbf';}}>
              LinkedIn Profile
            </a>
          </motion.div>
        </div>

        <div className="space-y-4">
          {highlights.map((h,i) => (
            <motion.div key={i} variants={fadeUp} custom={i+1} initial="hidden" whileInView="visible" viewport={{ once:true }}>
              <TiltCard
                className="rounded-2xl p-5 flex items-center gap-5 cursor-default transition-all duration-300"
                style={{ background:'rgba(185,79,255,0.04)', border:`1px solid ${h.border}`, backdropFilter:'blur(12px)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:`${h.accent}14`, border:`1px solid ${h.accent}30`, color:h.accent }}>
                  {h.icon}
                </div>
                <div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-0.5" style={{ color:h.accent }}>{h.label}</div>
                  <div className="font-display font-semibold" style={{ color:'#ece6ff' }}>{h.value}</div>
                  <div className="text-xs mt-0.5" style={{ color:'#4a3a6a' }}>{h.sub}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <TiltCard
              className="rounded-2xl p-6 relative overflow-hidden cursor-default"
              style={{ background:'rgba(185,79,255,0.05)', border:'1px solid rgba(185,79,255,0.18)', backdropFilter:'blur(12px)' }}
            >
              <div className="absolute top-0 left-0 w-full h-0.5"
                style={{ background:'linear-gradient(90deg, #b94fff, #ff2d78, #00e5ff, transparent)' }} />
              <p className="italic font-light leading-relaxed text-sm" style={{ color:'#9d8fbf' }}>
                "Turning operational performance into explicit business value — that's the mission."
              </p>
              <p className="text-xs font-mono tracking-widest uppercase mt-3" style={{ color:'#b94fff' }}>— Rahul Tripathi</p>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
