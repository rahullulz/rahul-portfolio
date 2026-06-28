import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">

        {/* Big CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(59,130,246,0.05) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
          </div>

          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-label mb-5"
            >
              Get In Touch
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-display font-bold text-4xl md:text-6xl text-white leading-tight mb-6"
            >
              Let's build something{' '}
              <span className="text-gradient-blue">exceptional.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="text-slate-300 text-lg max-w-xl mx-auto mb-10" style={{ lineHeight: 1.7 }}
            >
              Whether you have an opportunity, a collaboration in mind, or just want to
              talk operations — I'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="mailto:rtripathi3113998@gmail.com"
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-display font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-1 inline-flex items-center gap-3 justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Me an Email
              </a>

              <a
                href="https://linkedin.com/in/rtripathi97"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass hover:bg-white/6 text-white font-display font-bold rounded-2xl transition-all duration-300 border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 inline-flex items-center gap-3 justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
              </a>
            </motion.div>

            {/* Contact info chips */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 justify-center mt-10"
            >
              {[
                { icon: '📧', text: 'rtripathi3113998@gmail.com' },
                { icon: '📍', text: 'Gurgaon, India' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/8 text-slate-400 text-sm">
                  <span>{c.icon}</span>
                  <span className="font-mono text-xs">{c.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
