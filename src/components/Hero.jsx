import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function HoloCore() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    const isMobile = W < 768;
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const anchor = new THREE.Group();
    anchor.position.x = isMobile ? 0 : 1.8;
    scene.add(anchor);

    const add = (geo, col, wire, op, blend) => {
      const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: !!wire, transparent: true, opacity: op, blending: blend || THREE.NormalBlending });
      const m = new THREE.Mesh(geo, mat);
      anchor.add(m);
      return { m, mat };
    };

    const { m: icosa, mat: icosaMat } = add(new THREE.IcosahedronGeometry(1.1, 2), 0xb94fff, true, 0.75);
    const { m: shell }                = add(new THREE.IcosahedronGeometry(1.55, 1), 0xff2d78, true, 0.22, THREE.AdditiveBlending);
    const { m: knot }                 = add(new THREE.TorusKnotGeometry(0.55, 0.1, 80, 12, 2, 3), 0x00e5ff, true, 0.5, THREE.AdditiveBlending);

    const addSphere = (r, col, op) => { const { m } = add(new THREE.SphereGeometry(r, 16, 16), col, false, op, THREE.AdditiveBlending); return m; };
    const core1 = addSphere(0.22, 0x00e5ff, 0.9);
    const core2 = addSphere(0.38, 0x00e5ff, 0.25);
    addSphere(0.60, 0xb94fff, 0.08);

    const addRing = (r, t, col, op, rx, ry, rz) => {
      const { m } = add(new THREE.TorusGeometry(r, t, 8, 120), col, false, op, THREE.AdditiveBlending);
      m.rotation.set(rx, ry, rz); return m;
    };
    const ring1 = addRing(1.85, 0.007, 0x00e5ff, 0.65, Math.PI*0.38, 0, 0);
    const ring2 = addRing(2.15, 0.005, 0xff2d78, 0.38, Math.PI*0.68, Math.PI*0.2, 0);
    const ring3 = addRing(1.60, 0.006, 0xb94fff, 0.45, 0, 0, Math.PI*0.5);

    const PALETTE = [[0.73,0.31,1.0],[1.0,0.18,0.47],[0.0,0.90,1.0],[1.0,1.0,1.0],[0.30,0.62,1.0]];
    const PC = isMobile ? 1200 : 2500;
    const pPos = new Float32Array(PC*3), pCol = new Float32Array(PC*3);
    for (let i = 0; i < PC; i++) {
      const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1), r = 2.5+Math.random()*5.5;
      pPos[i*3] = r*Math.sin(ph)*Math.cos(th); pPos[i*3+1] = r*Math.sin(ph)*Math.sin(th); pPos[i*3+2] = r*Math.cos(ph);
      const c = PALETTE[Math.floor(Math.random()*PALETTE.length)];
      pCol[i*3] = c[0]; pCol[i*3+1] = c[1]; pCol[i*3+2] = c[2];
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    ptGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    const pts = new THREE.Points(ptGeo, new THREE.PointsMaterial({ size: 0.022, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    anchor.add(pts);

    const SC = 800, sP = new Float32Array(SC*3);
    for (let i=0;i<SC;i++){sP[i*3]=(Math.random()-.5)*40;sP[i*3+1]=(Math.random()-.5)*40;sP[i*3+2]=(Math.random()-.5)*40;}
    const sGeo = new THREE.BufferGeometry(); sGeo.setAttribute('position', new THREE.BufferAttribute(sP,3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ size: 0.03, color: 0xffffff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })));

    const onMouse = (e) => { mouseRef.current = { x: (e.clientX/window.innerWidth)*2-1, y: -(e.clientY/window.innerHeight)*2+1 }; };
    window.addEventListener('mousemove', onMouse);
    const onResize = () => { W=canvas.offsetWidth; H=canvas.offsetHeight; camera.aspect=W/H; camera.updateProjectionMatrix(); renderer.setSize(W,H); };
    window.addEventListener('resize', onResize);

    let raf, t=0, cx=0, cy=0;
    const animate = () => {
      t += 0.005;
      icosa.rotation.x = t*0.38; icosa.rotation.y = t*0.55;
      shell.rotation.x = -t*0.28; shell.rotation.y = t*0.44;
      knot.rotation.x  = t*0.6;  knot.rotation.y  = t*0.4;
      ring1.rotation.z = t*0.18; ring2.rotation.z = -t*0.14; ring3.rotation.y = t*0.22;
      pts.rotation.y   = t*0.04; pts.rotation.x   = t*0.015;
      const pulse = 0.85 + 0.15*Math.sin(t*3.5);
      core1.scale.setScalar(pulse); core2.scale.setScalar(pulse*1.05);
      icosaMat.opacity = 0.5 + 0.28*Math.sin(t*1.8);
      cx += (mouseRef.current.y*0.5 - cx)*0.04;
      cy += (mouseRef.current.x*0.5 - cy)*0.04;
      camera.position.x = cy; camera.position.y = cx;
      camera.lookAt(isMobile ? 0 : 1.0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMouse); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function GlitchText({ children, className }) {
  return (
    <span className={`glitch-wrap ${className}`}>
      <span className="glitch-copy glitch-copy-1" aria-hidden="true">{children}</span>
      <span className="glitch-copy glitch-copy-2" aria-hidden="true">{children}</span>
      {children}
    </span>
  );
}

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null;
    const ease = t => t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const step = ts => { if(!s)s=ts; const p=Math.min((ts-s)/duration,1); setCount(Math.floor(ease(p)*target)); if(p<1)requestAnimationFrame(step); };
    const id = setTimeout(()=>requestAnimationFrame(step), 800);
    return () => clearTimeout(id);
  }, [start, target, duration]);
  return count;
}

const stats = [
  { prefix:'$', value:3,   suffix:'M+', label:'Pipeline',   glow:'#b94fff', bar:'from-purple-500 to-pink-500' },
  {             value:33,  suffix:'%',  label:'Ramp-Up ↓',  glow:'#ff2d78', bar:'from-pink-500 to-rose-500'   },
  {             value:100, suffix:'%',  label:'CSAT / NPS',  glow:'#00e5ff', bar:'from-cyan-400 to-blue-500'   },
  {             value:9,   suffix:'+',  label:'Yrs Exp',     glow:'#b94fff', bar:'from-violet-500 to-purple-500'},
];

function StatCard({ stat, index, inView }) {
  const count = useCounter(stat.value, 2000, inView);
  return (
    <motion.div
      initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ delay:0.9+index*0.1, duration:0.6, ease:[0.16,1,0.3,1] }}
      className="relative rounded-2xl p-5 overflow-hidden cursor-default"
      style={{ background:'rgba(185,79,255,0.05)', border:'1px solid rgba(185,79,255,0.15)', backdropFilter:'blur(12px)', transition:'all 0.3s ease' }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 30px ${stat.glow}44`;e.currentTarget.style.borderColor=`${stat.glow}55`;}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='rgba(185,79,255,0.15)';}}
    >
      <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.bar}`} />
      <div className="font-display font-bold text-3xl text-white tabular-nums" style={{ textShadow:`0 0 20px ${stat.glow}99`, letterSpacing:'-0.02em' }}>
        {stat.prefix||''}{count}{stat.suffix}
      </div>
      <div className="text-xs font-mono tracking-widest uppercase mt-1.5" style={{ color:'#7a6a9a' }}>{stat.label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] });
  const y       = useTransform(scrollYProgress, [0,1],    ['0%','20%']);
  const opacity = useTransform(scrollYProgress, [0,0.65], [1,0]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setInView(true); }, { threshold:0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col overflow-hidden" style={{ background:'#04010f' }}>
      <HoloCore />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex:2 }}>
        <div className="absolute w-full h-px opacity-[0.07]"
          style={{ background:'linear-gradient(90deg,transparent,#b94fff,#00e5ff,transparent)', animation:'scanline 10s linear infinite' }} />
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ zIndex:1 }}>
        <div className="absolute top-[-20%] left-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(185,79,255,0.12) 0%,transparent 65%)', animation:'blob 16s infinite' }} />
        <div className="absolute bottom-[-15%] left-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(255,45,120,0.08) 0%,transparent 65%)', animation:'blob 20s infinite 4s' }} />
      </div>

      <div className="relative flex flex-col flex-1" style={{ zIndex:10 }}>
        <motion.div style={{ y, opacity }}
          className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-8 items-center gap-12"
        >
          <div className="flex flex-col justify-center">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} className="mb-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full cursor-default"
                style={{ background:'rgba(0,229,255,0.06)', border:'1px solid rgba(0,229,255,0.2)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background:'#00e5ff' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background:'#00e5ff' }} />
                </span>
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color:'#00e5ff' }}>Available for New Opportunities</span>
              </div>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1 initial={{ y:'100%' }} animate={{ y:0 }} transition={{ duration:1, ease:[0.16,1,0.3,1], delay:0.1 }}
                className="font-display font-bold leading-none tracking-tighter">
                <GlitchText className="block text-[clamp(3rem,8vw,7rem)] text-white">Rahul</GlitchText>
                <GlitchText className="block text-[clamp(3rem,8vw,7rem)] text-shimmer">Tripathi</GlitchText>
              </motion.h1>
            </div>

            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.7 }}
              className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-display font-semibold text-base md:text-lg" style={{ color:'#ece6ff' }}>Assistant Manager</span>
              <span className="w-1 h-1 rounded-full" style={{ background:'#b94fff', boxShadow:'0 0 6px #b94fff' }} />
              <span className="font-display font-semibold text-base md:text-lg" style={{ color:'#ece6ff' }}>Operations & Strategy</span>
              <span className="w-1 h-1 rounded-full" style={{ background:'#ff2d78', boxShadow:'0 0 6px #ff2d78' }} />
              <span className="font-mono text-sm" style={{ color:'#7a6a9a' }}>Gurgaon, India</span>
            </motion.div>

            <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.7 }}
              className="text-sm md:text-base max-w-md mb-10" style={{ lineHeight:1.8, color:'#9d8fbf' }}>
              9+ years translating operational performance into measurable business value —
              across BPO operations, L&D enablement, and B2B cloud sales.
            </motion.p>

            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.78, duration:0.6 }}
              className="flex flex-wrap gap-4">
              <a href="#experience" className="btn-neon px-7 py-3.5 rounded-xl font-display font-bold text-sm text-white">View My Journey</a>
              <a href="#contact" className="px-7 py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-300"
                style={{ color:'#ece6ff', background:'rgba(185,79,255,0.08)', border:'1px solid rgba(185,79,255,0.2)' }}
                onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 0 20px rgba(185,79,255,0.25)';e.currentTarget.style.borderColor='rgba(185,79,255,0.5)';}}
                onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='rgba(185,79,255,0.2)';}}>
                Let's Connect
              </a>
            </motion.div>
          </div>
          <div className="hidden lg:block" />
        </motion.div>

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            {stats.map((s,i) => <StatCard key={i} stat={s} index={i} inView={inView} />)}
          </div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8, duration:0.6 }}
          className="relative flex flex-col items-center gap-2 pb-8">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color:'#4a3a6a' }}>Scroll</span>
          <div className="w-5 h-8 rounded-full flex items-start justify-center p-1" style={{ border:'1px solid rgba(185,79,255,0.25)' }}>
            <motion.div className="w-1 h-2 rounded-full" style={{ background:'#b94fff', boxShadow:'0 0 8px #b94fff' }}
              animate={{ y:[0,10,0] }} transition={{ duration:1.6, repeat:Infinity, ease:'easeInOut' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
