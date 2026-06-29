import { motion, useInView } from 'framer-motion';
import { useRef, useCallback } from 'react';

const certs = [
  {
    title:'Digital Transformation with Google Cloud', issuer:'Google Cloud Skill Boost',
    accent:'#00e5ff', bar:'linear-gradient(135deg,#00e5ff,#4d9fff)',
    icon:(<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>),
  },
  {
    title:'TP BEST – Training & Development Certified', issuer:'Teleperformance',
    accent:'#b94fff', bar:'linear-gradient(135deg,#b94fff,#d280ff)',
    icon:(<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>),
  },
  {
    title:'TP TOPS Certified', issuer:'Teleperformance',
    accent:'#ff2d78', bar:'linear-gradient(135deg,#ff2d78,#b94fff)',
    icon:(<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>),
  },
];

const langs = [
  { lang:'English', level:'Professional', pct:92, accent:'#00e5ff', bar:'linear-gradient(90deg,#00e5ff,#4d9fff)' },
  { lang:'Hindi',   level:'Native',        pct:100,accent:'#b94fff', bar:'linear-gradient(90deg,#b94fff,#ff2d78)' },
];

function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const rx = -((e.clientY-r.top-r.height/2)/r.height)*7;
    const ry =  ((e.clientX-r.left-r.width/2)/r.width)*7;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    el.style.transition = 'transform 0.08s ease';
  },[]);
  const onLeave = useCallback(()=>{ if(ref.current){ref.current.style.transform='perspective(1100px) rotateX(0) rotateY(0) translateZ(0)';ref.current.style.transition='transform 0.5s ease';}},[]);
  return <div ref={ref} style={{ ...style, transformStyle:'preserve-3d' }} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

export default function Credentials() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once:true, margin:'-60px' });

  return (
    <section id="credentials" ref={sectionRef} className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="mb-16">
        <span className="section-label">Education & Certs</span>
        <h2 className="font-display font-bold text-4xl md:text-5xl mt-3" style={{ color:'#ece6ff' }}>
          Credentials &{' '}
          <span style={{ background:'linear-gradient(135deg,#00e5ff,#b94fff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Certifications
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left */}
        <div className="space-y-5">
          {/* Education */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
            <TiltCard className="rounded-2xl p-7 relative overflow-hidden cursor-default"
              style={{ background:'rgba(0,229,255,0.04)', border:'1px solid rgba(0,229,255,0.15)', backdropFilter:'blur(12px)' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:'linear-gradient(90deg,#00e5ff,#4d9fff,transparent)' }} />
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2" style={{ borderColor:'#00e5ff55' }} />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2" style={{ borderColor:'#00e5ff55' }} />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2" style={{ borderColor:'#00e5ff55' }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2" style={{ borderColor:'#00e5ff55' }} />

              <div className="flex gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(0,229,255,0.12)', border:'1px solid rgba(0,229,255,0.3)', color:'#00e5ff', boxShadow:'0 0 20px rgba(0,229,255,0.2)' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
                    <path d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 4.97-4.03 9-9 9s-9-4.03-9-9c0-.608.065-1.2.184-1.772L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color:'#00e5ffaa' }}>Education</div>
                  <div className="font-display font-bold text-lg" style={{ color:'#ece6ff' }}>Bachelor of Commerce</div>
                  <div className="font-semibold text-sm mt-0.5" style={{ color:'#00e5ff' }}>University of Delhi, New Delhi</div>
                  <div className="text-sm mt-1.5" style={{ color:'#4a3a6a' }}>2016 – 2020</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Language bars */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}>
            <TiltCard className="rounded-2xl p-7 relative overflow-hidden cursor-default"
              style={{ background:'rgba(185,79,255,0.04)', border:'1px solid rgba(185,79,255,0.15)', backdropFilter:'blur(12px)' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:'linear-gradient(90deg,#b94fff,#ff2d78,transparent)' }} />
              <div className="text-xs font-mono tracking-widest uppercase mb-6" style={{ color:'#b94fffaa' }}>Languages</div>
              <div className="space-y-5">
                {langs.map((l,i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-display font-semibold text-sm" style={{ color:'#ece6ff' }}>{l.lang}</span>
                      <span className="text-xs font-mono" style={{ color:l.accent }}>{l.level} · {l.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        initial={{ width:0 }}
                        animate={inView ? { width:`${l.pct}%` } : {}}
                        transition={{ duration:1.5, ease:[0.16,1,0.3,1], delay:i*0.2+0.3 }}
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background:l.bar }}
                      >
                        <div className="absolute inset-0 opacity-60" style={{ background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.4) 50%,transparent 100%)', animation:'shimmer 2s linear infinite', backgroundSize:'200% 100%' }} />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Right: Certs */}
        <div>
          <div className="text-xs font-mono tracking-widest uppercase mb-5" style={{ color:'#b94fffaa' }}>Certifications</div>
          <div className="space-y-4">
            {certs.map((cert, i) => (
              <motion.div key={i} initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.12, duration:0.6 }}>
                <TiltCard className="rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden cursor-default group"
                  style={{ background:'rgba(185,79,255,0.04)', border:`1px solid ${cert.accent}22`, backdropFilter:'blur(12px)', transition:'border-color 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${cert.accent}55`; e.currentTarget.style.boxShadow=`0 0 30px ${cert.accent}18`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${cert.accent}22`; e.currentTarget.style.boxShadow='none'; }}
                >
                  {/* Holographic shimmer overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.05) 50%,transparent 60%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s linear infinite' }} />
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:cert.bar }} />

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${cert.accent}18`, border:`1px solid ${cert.accent}35`, color:cert.accent, boxShadow:`0 0 16px ${cert.accent}30` }}>
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm leading-snug" style={{ color:'#ece6ff' }}>{cert.title}</div>
                    <div className="text-xs mt-1 font-mono" style={{ color:'#7a6a9a' }}>{cert.issuer}</div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background:`${cert.accent}15`, border:`1px solid ${cert.accent}40` }}>
                      <svg className="w-3 h-3" fill="none" stroke={cert.accent} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
