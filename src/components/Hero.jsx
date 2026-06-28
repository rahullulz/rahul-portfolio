import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = setTimeout(() => requestAnimationFrame(step), 800);
    return () => clearTimeout(id);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { prefix: '$', value: 3, suffix: 'M+', label: 'Pipeline Generated', color: 'from-blue-600 to-indigo-600' },
  { value: 33, suffix: '%', label: 'Ramp-Up Reduced', color: 'from-violet-600 to-purple-600' },
  { value: 100, suffix: '%', label: 'CSAT / NPS', color: 'from-emerald-600 to-teal-600' },
  { value: 9, suffix: '+', label: 'Years Experience', color: 'from-amber-600 to-orange-600' },
];

function StatCard({ stat, index, inView }) {
  const count = useCounter(stat.value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.9 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass glass-hover rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.color} opacity-40`} />
      <div className="font-display font-bold text-4xl text-white tabular-nums mb-1" style={{ letterSpacing: '-0.01em' }}>
        {stat.prefix || ''}{count}{stat.suffix}
      </div>
      <div className="text-slate-400 text-xs font-medium tracking-wider uppercase mt-1" style={{ fontFamily: "'DM Mono', monospace" }}>{stat.label}</div>
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
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            animation: 'blob 12s infinite',
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            animation: 'blob 15s infinite 3s',
          }}
        />
        <div
          className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
            animation: 'blob 18s infinite 6s',
          }}
        />
      </div>

      {/* Horizontal grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${(i + 1) * 12.5}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.025) 20%, rgba(255,255,255,0.025) 80%, transparent 100%)',
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-16">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-blue-500/20 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="section-label !text-emerald-400">Available for New Opportunities</span>
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
                <span className="block text-[clamp(3.5rem,10vw,8.5rem)] text-white">Rahul</span>
                <span className="block text-[clamp(3.5rem,10vw,8.5rem)] text-shimmer">Tripathi</span>
              </h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <span className="font-display font-medium text-lg md:text-xl text-slate-300 tracking-wide">
              Assistant Manager
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="font-display font-medium text-lg md:text-xl text-slate-300 tracking-wide">
              Operations &amp; Strategy
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="font-display font-medium text-lg md:text-xl text-slate-400 tracking-wide">
              Gurgaon, India
            </span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="text-center text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-12" style={{ lineHeight: 1.7 }}
        >
          9+ years translating operational performance into measurable business value —
          across BPO operations, L&D enablement, and B2B cloud sales.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <a
            href="#experience"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-display font-bold rounded-2xl transition-all duration-300 text-center overflow-hidden shadow-xl shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-1"
          >
            <span className="relative z-10">View My Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 glass hover:bg-white/6 text-white font-display font-bold rounded-2xl transition-all duration-300 text-center border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
          >
            Let's Connect
          </a>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="section-label">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-blue-400 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
