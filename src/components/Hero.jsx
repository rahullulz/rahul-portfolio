import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Particle Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, raf;
    const mouse = { x: -999, y: -999 };
    const COLORS = ['#b94fff', '#ff2d78', '#00e5ff', '#ffffff', '#4d9fff', '#d280ff'];

    class Particle {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.8 + 0.3;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity = Math.random() * 0.7 + 0.2;
        this.pulseSpeed = Math.random() * 0.025 + 0.008;
        this.pulseOff = Math.random() * Math.PI * 2;
      }
      update(t) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          this.vx += (dx / dist) * force * 0.018;
          this.vy += (dy / dist) * force * 0.018;
        }
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.2) { this.vx = (this.vx / speed) * 1.2; this.vy = (this.vy / speed) * 1.2; }
        this.curOpacity = this.opacity * (0.65 + 0.35 * Math.sin(t * this.pulseSpeed + this.pulseOff));
      }
      draw() {
        ctx.globalAlpha = this.curOpacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    const count = Math.min(160, Math.floor((width * height) / 8000));
    const particles = Array.from({ length: count }, () => new Particle());

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      t++;
      particles.forEach(p => p.update(t));

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            const alpha = (1 - d / 100) * 0.25;
            const grad = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            grad.addColorStop(0, particles[i].color);
            grad.addColorStop(1, particles[j].color);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      particles.forEach(p => p.draw());
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onResize = () => { resize(); };

    canvas.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.75 }}
    />
  );
}

/* ── Glitch Text ── */
function GlitchText({ children, className }) {
  return (
    <span className={`glitch-wrap ${className}`}>
      <span className="glitch-copy glitch-copy-1" aria-hidden="true">{children}</span>
      <span className="glitch-copy glitch-copy-2" aria-hidden="true">{children}</span>
      {children}
    </span>
  );
}

/* ── Counter ── */
function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = setTimeout(() => requestAnimationFrame(step), 800);
    return () => clearTimeout(id);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { prefix: '$', value: 3, suffix: 'M+', label: 'Pipeline Generated', color: 'from-purple-600 to-pink-600', glow: 'rgba(185,79,255,0.3)' },
  { value: 33, suffix: '%', label: 'Ramp-Up Reduced', color: 'from-pink-600 to-rose-600', glow: 'rgba(255,45,120,0.3)' },
  { value: 100, suffix: '%', label: 'CSAT / NPS', color: 'from-cyan-500 to-blue-600', glow: 'rgba(0,229,255,0.3)' },
  { value: 9, suffix: '+', label: 'Years Experience', color: 'from-violet-600 to-purple-600', glow: 'rgba(139,92,246,0.3)' },
];

function StatCard({ stat, index, inView }) {
  const count = useCounter(stat.value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.9 + index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass glass-hover rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500`} />
      <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.color} opacity-60`} />
      <div
        className="font-display font-bold text-4xl text-white tabular-nums mb-1 neon-flicker"
        style={{ letterSpacing: '-0.01em', textShadow: `0 0 20px ${stat.glow}` }}
      >
        {stat.prefix || ''}{count}{stat.suffix}
      </div>
      <div className="text-xs font-medium tracking-wider uppercase mt-1" style={{ fontFamily: "'DM Mono', monospace", color: '#9d8fbf' }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: '#04010f' }}>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Deep space ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(185,79,255,0.14) 0%, transparent 65%)', animation: 'blob 14s infinite' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.10) 0%, transparent 65%)', animation: 'blob 18s infinite 3s' }} />
        <div className="absolute top-[35%] left-[55%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)', animation: 'blob 22s infinite 7s' }} />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute w-full h-px opacity-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(185,79,255,0.8), transparent)', animation: 'scanline 8s linear infinite' }} />
      </div>

      {/* Horizontal grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-full h-px"
            style={{ top: `${(i + 1) * 12.5}%`, background: 'linear-gradient(90deg, transparent 0%, rgba(185,79,255,0.04) 20%, rgba(185,79,255,0.04) 80%, transparent 100%)' }} />
        ))}
      </div>

      {/* Main content — fades on scroll */}
      <motion.div style={{ y, opacity }} className="relative w-full max-w-6xl mx-auto px-6 pt-28 pb-8" style={{ zIndex: 10 }}>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border cursor-default"
            style={{ borderColor: 'rgba(0,229,255,0.25)' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: '#00e5ff' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00e5ff' }} />
            </span>
            <span className="section-label" style={{ color: '#00e5ff' }}>Available for New Opportunities</span>
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="text-center mb-8">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h1 className="font-display font-bold leading-none tracking-tighter">
                <GlitchText className="block text-[clamp(3.5rem,10vw,8.5rem)] text-white">
                  Rahul
                </GlitchText>
                <GlitchText className="block text-[clamp(3.5rem,10vw,8.5rem)] text-shimmer">
                  Tripathi
                </GlitchText>
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="font-display font-medium text-lg md:text-xl tracking-wide" style={{ color: '#ece6ff' }}>
              Assistant Manager
            </span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#b94fff', boxShadow: '0 0 8px #b94fff' }} />
            <span className="font-display font-medium text-lg md:text-xl tracking-wide" style={{ color: '#ece6ff' }}>
              Operations & Strategy
            </span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff2d78', boxShadow: '0 0 8px #ff2d78' }} />
            <span className="font-display font-medium text-lg md:text-xl" style={{ color: '#9d8fbf' }}>
              Gurgaon, India
            </span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="text-center text-base md:text-lg max-w-xl mx-auto mb-12"
          style={{ lineHeight: 1.7, color: '#9d8fbf' }}
        >
          9+ years translating operational performance into measurable business value —
          across BPO operations, L&D enablement, and B2B cloud sales.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#experience"
            className="group relative px-8 py-4 font-display font-bold rounded-2xl text-center text-white btn-neon transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">View My Journey</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass font-display font-bold rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
            style={{
              color: '#ece6ff',
              borderColor: 'rgba(185,79,255,0.25)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(185,79,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            Let's Connect
          </a>
        </motion.div>

      </motion.div>

      {/* Stats grid — outside fading div, always visible */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-20" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative flex flex-col items-center gap-2 pb-8"
        style={{ zIndex: 10 }}
      >
        <span className="section-label">Scroll</span>
        <div className="w-5 h-8 rounded-full flex items-start justify-center p-1"
          style={{ border: '1px solid rgba(185,79,255,0.3)' }}>
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: '#b94fff', boxShadow: '0 0 6px #b94fff' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

    </section>
  );
}
