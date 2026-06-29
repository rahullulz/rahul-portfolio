import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-10" style={{ background:'#04010f' }}>
      {/* Neon separator */}
      <div className="w-full h-px mb-10" style={{ background:'linear-gradient(90deg,transparent,#b94fff,#ff2d78,#00e5ff,#b94fff,transparent)' }} />
      {/* Ambient glow under separator */}
      <div className="absolute top-10 left-0 right-0 h-px pointer-events-none" style={{ background:'linear-gradient(90deg,transparent,#b94fff44,transparent)', filter:'blur(8px)' }} />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
          <div>
            <span className="font-display font-bold text-xl" style={{ color:'#ece6ff' }}>RT</span>
            <span className="font-bold text-xl" style={{ color:'#b94fff', textShadow:'0 0 12px #b94fff' }}>.</span>
          </div>
          <p className="text-xs mt-1 font-mono" style={{ color:'#4a3a6a' }}>Assistant Manager – Operations & Strategy</p>
        </motion.div>

        <div className="flex items-center gap-6">
          {[['Email','mailto:rtripathi3113998@gmail.com'],['LinkedIn','https://linkedin.com/in/rtripathi97','_blank']].map(([label,href,target],i)=>(
            <a key={i} href={href} target={target} rel={target?'noopener noreferrer':undefined}
              className="text-sm font-mono transition-all duration-200"
              style={{ color:'#4a3a6a' }}
              onMouseEnter={e=>{e.currentTarget.style.color='#b94fff';e.currentTarget.style.textShadow='0 0 10px #b94fff';}}
              onMouseLeave={e=>{e.currentTarget.style.color='#4a3a6a';e.currentTarget.style.textShadow='none';}}>
              {label}
            </a>
          ))}
          <a href="#hero" className="text-sm font-mono transition-all duration-200"
            style={{ color:'#4a3a6a' }}
            onMouseEnter={e=>{e.currentTarget.style.color='#00e5ff';e.currentTarget.style.textShadow='0 0 10px #00e5ff';}}
            onMouseLeave={e=>{e.currentTarget.style.color='#4a3a6a';e.currentTarget.style.textShadow='none';}}>
            Top ↑
          </a>
        </div>

        <p className="text-xs font-mono" style={{ color:'#2a1a4a' }}>© {new Date().getFullYear()} Rahul Tripathi</p>
      </div>
    </footer>
  );
}
