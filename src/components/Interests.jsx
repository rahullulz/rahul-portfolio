import { motion } from 'framer-motion';
import { useRef, useEffect, useCallback } from 'react';

const interests = [
  {
    title:'Security & VDPs', accent:'#00e5ff',
    bar:'linear-gradient(135deg,#00e5ff,#4d9fff)',
    description:'Active engagement in Vulnerability Disclosure Programs (VDPs) and continuous learning in systems security testing and threat diagnostics.',
    tags:['VDP Research','Security Testing','Threat Diagnostics'],
    icon:(<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>),
  },
  {
    title:'Photography & Image Editing', accent:'#ff2d78',
    bar:'linear-gradient(135deg,#ff2d78,#b94fff)',
    description:'Proficient in advanced image manipulation, dynamic background processing, and high-fidelity stylistic enhancements.',
    tags:['Photo Editing','Visual Design','Background Processing'],
    icon:(<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
  },
];

function ParticleCard({ item }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const activeRef = useRef(false);

  const startParticles = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    activeRef.current = true;
    const particles = [];
    const cx = canvas.width / 2, cy = canvas.height * 0.35;
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2;
      particles.push({ x:cx, y:cy, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed - 1, life:1, maxLife:0.6+Math.random()*0.4, size:1+Math.random()*2.5 });
    }
    const draw = () => {
      if (!activeRef.current) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.life -= 0.018;
        if (p.life > 0) { alive = true;
          ctx.globalAlpha = p.life * 0.8;
          ctx.fillStyle = item.accent;
          ctx.shadowBlur = 8; ctx.shadowColor = item.accent;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      ctx.globalAlpha = 1;
      if (alive) rafRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    };
    rafRef.current = requestAnimationFrame(draw);
  }, [item.accent]);

  const stopParticles = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const canvas = canvasRef.current;
    if (canvas) canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
  }, []);

  useEffect(() => () => stopParticles(), [stopParticles]);

  const cardRef = useRef(null);
  const onMove = useCallback((e) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = -((e.clientY-r.top-r.height/2)/r.height)*8;
    const ry =  ((e.clientX-r.left-r.width/2)/r.width)*8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    el.style.transition = 'transform 0.1s ease';
  }, []);
  const onLeave = useCallback(() => {
    stopParticles();
    if (cardRef.current) { cardRef.current.style.transform='perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'; cardRef.current.style.transition='transform 0.5s ease'; }
  }, [stopParticles]);

  return (
    <div ref={cardRef} style={{ transformStyle:'preserve-3d', position:'relative' }}
      onMouseEnter={startParticles} onMouseMove={onMove} onMouseLeave={onLeave}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex:5, borderRadius:'1rem' }} />
      <div className="relative rounded-2xl overflow-hidden p-8"
        style={{ background:'rgba(4,1,15,0.85)', border:`1px solid ${item.accent}22`, backdropFilter:'blur(16px)', transition:'border-color 0.3s, box-shadow 0.3s' }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${item.accent}55`; e.currentTarget.style.boxShadow=`0 0 50px ${item.accent}18`; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${item.accent}22`; e.currentTarget.style.boxShadow='none'; }}>

        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:item.bar }} />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage:`radial-gradient(circle, ${item.accent}20 1px, transparent 1px)`,
          backgroundSize:'28px 28px',
        }} />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ background:`${item.accent}15`, border:`1px solid ${item.accent}35`, color:item.accent, boxShadow:`0 0 30px ${item.accent}30` }}>
            {item.icon}
          </div>
          <h3 className="font-display font-bold text-xl mb-3" style={{ color:'#ece6ff' }}>{item.title}</h3>
          <p className="text-sm mb-6" style={{ lineHeight:1.8, color:'#9d8fbf' }}>{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag,j) => (
              <span key={j} className="px-3 py-1 rounded-full text-xs font-mono"
                style={{ background:`${item.accent}0d`, border:`1px solid ${item.accent}25`, color:`${item.accent}cc` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Interests() {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background:'linear-gradient(180deg,#04010f,#080118,#04010f)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-15" style={{
        backgroundImage:'linear-gradient(rgba(185,79,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(185,79,255,0.12) 1px,transparent 1px)',
        backgroundSize:'60px 60px',
      }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }} className="mb-12">
          <span className="section-label">Beyond Work</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl mt-3" style={{ color:'#ece6ff' }}>
            Interests &{' '}
            <span style={{ background:'linear-gradient(135deg,#ff2d78,#b94fff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Pursuits
            </span>
          </h2>
          <p className="mt-2 text-sm font-mono" style={{ color:'#4a3a6a' }}>// hover to interact</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interests.map((item, i) => (
            <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.15, duration:0.7 }}>
              <ParticleCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
