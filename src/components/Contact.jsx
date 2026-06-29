import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

function RadarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const cx = W/2, cy = H/2;

    const rings = [
      { r:0, maxR:Math.min(W,H)*0.45, speed:0.6, color:'#b94fff', delay:0 },
      { r:0, maxR:Math.min(W,H)*0.45, speed:0.6, color:'#ff2d78', delay:60 },
      { r:0, maxR:Math.min(W,H)*0.45, speed:0.6, color:'#00e5ff', delay:120 },
    ];
    rings.forEach((r,i) => r.r = (r.delay / 180) * r.maxR);

    const PCOUNT = 35;
    const particles = Array.from({ length:PCOUNT }, () => {
      const angle = Math.random()*Math.PI*2;
      const rad = 60 + Math.random()*Math.min(W,H)*0.38;
      return { x:cx+Math.cos(angle)*rad, y:cy+Math.sin(angle)*rad, vx:(Math.random()-.5)*0.3, vy:(Math.random()-.5)*0.3, size:1+Math.random()*1.5, color:['#b94fff','#ff2d78','#00e5ff'][Math.floor(Math.random()*3)], opacity:0.3+Math.random()*0.5 };
    });

    const onResize = () => { W=canvas.offsetWidth; H=canvas.offsetHeight; canvas.width=W; canvas.height=H; };
    window.addEventListener('resize', onResize);

    let raf, t=0;
    const animate = () => {
      t++;
      ctx.clearRect(0,0,W,H);
      // Rings
      rings.forEach(ring => {
        ring.r += ring.speed;
        if (ring.r > ring.maxR) ring.r = 0;
        const alpha = 1 - ring.r/ring.maxR;
        ctx.beginPath(); ctx.arc(cx,cy,ring.r,0,Math.PI*2);
        ctx.strokeStyle = ring.color; ctx.globalAlpha = alpha*0.6; ctx.lineWidth = 1.5; ctx.stroke(); ctx.globalAlpha = 1;
        // Inner glow ring
        ctx.beginPath(); ctx.arc(cx,cy,ring.r,0,Math.PI*2);
        ctx.strokeStyle = ring.color; ctx.globalAlpha = alpha*0.15; ctx.lineWidth = 6; ctx.stroke(); ctx.globalAlpha = 1;
      });
      // Static inner rings
      [40,80,120].forEach((r,i) => {
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
        ctx.strokeStyle = ['#b94fff','#ff2d78','#00e5ff'][i]; ctx.globalAlpha = 0.06; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;
      });
      // Core glow
      const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,50);
      grad.addColorStop(0,'rgba(185,79,255,0.15)'); grad.addColorStop(1,'transparent');
      ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        const dx=p.x-cx, dy=p.y-cy, dist=Math.sqrt(dx*dx+dy*dy);
        if (dist > Math.min(W,H)*0.44) { p.vx *= -1; p.vy *= -1; }
        if (dist < 30) { p.vx += dx/dist*0.1; p.vy += dy/dist*0.1; }
        ctx.globalAlpha = p.opacity*(0.7+0.3*Math.sin(t*0.03));
        ctx.fillStyle = p.color; ctx.shadowBlur=6; ctx.shadowColor=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        ctx.shadowBlur=0; ctx.globalAlpha=1;
      });
      // Cross-hair lines
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = '#b94fff'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx,0); ctx.lineTo(cx,H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,cy); ctx.lineTo(W,cy); ctx.stroke();
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity:0.8 }} />;
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background:'#04010f' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{ background:'rgba(185,79,255,0.04)', border:'1px solid rgba(185,79,255,0.15)', minHeight:480 }}>

          <RadarCanvas />

          {/* Neon border lines */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#b94fff,#ff2d78,#00e5ff,transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#00e5ff,#ff2d78,#b94fff,transparent)' }} />

          {/* Corner brackets */}
          {[['top-4 left-4','border-t-2 border-l-2'],['top-4 right-4','border-t-2 border-r-2'],['bottom-4 left-4','border-b-2 border-l-2'],['bottom-4 right-4','border-b-2 border-r-2']].map(([pos,bord],i)=>(
            <div key={i} className={`absolute ${pos} w-6 h-6 ${bord}`} style={{ borderColor:'rgba(185,79,255,0.4)' }} />
          ))}

          <div className="relative z-10">
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
              className="text-xs font-mono tracking-widest uppercase mb-5" style={{ color:'#00e5ff' }}>
              GET IN TOUCH
            </motion.div>

            <motion.h2 initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:0.15, duration:0.7 }}
              className="font-display font-bold text-4xl md:text-6xl leading-tight mb-6" style={{ color:'#ece6ff' }}>
              Let's build something{' '}
              <span style={{ background:'linear-gradient(135deg,#b94fff,#ff2d78,#00e5ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', backgroundSize:'200%', animation:'shimmer 4s linear infinite' }}>
                exceptional.
              </span>
            </motion.h2>

            <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.22 }}
              className="text-base max-w-md mx-auto mb-10" style={{ lineHeight:1.8, color:'#9d8fbf' }}>
              Whether you have an opportunity, a collaboration in mind, or just want to talk operations — I'd love to hear from you.
            </motion.p>

            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:rtripathi3113998@gmail.com"
                className="btn-neon px-8 py-4 rounded-2xl font-display font-bold text-white inline-flex items-center gap-3 justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Send Me an Email
              </a>
              <a href="https://linkedin.com/in/rtripathi97" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl font-display font-bold inline-flex items-center gap-3 justify-center transition-all duration-300"
                style={{ color:'#ece6ff', background:'rgba(185,79,255,0.08)', border:'1px solid rgba(185,79,255,0.2)' }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 25px rgba(185,79,255,0.3)';e.currentTarget.style.borderColor='rgba(185,79,255,0.5)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='rgba(185,79,255,0.2)';}}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Profile
              </a>
            </motion.div>

            <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.45 }}
              className="flex flex-wrap gap-3 justify-center mt-8">
              {[{icon:'📧',text:'rtripathi3113998@gmail.com'},{icon:'📍',text:'Gurgaon, India'}].map((c,i)=>(
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
                  style={{ background:'rgba(185,79,255,0.06)', border:'1px solid rgba(185,79,255,0.15)', color:'#7a6a9a' }}>
                  <span>{c.icon}</span><span>{c.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
