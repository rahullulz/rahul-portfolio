const row1 = ['Operations Leadership','$3M+ Pipeline','Customer Success','100% CSAT / NPS','L&D Enablement','33% Ramp-Up Cut','Google Cloud','Salesforce CRM'];
const row2 = ['Team Leadership','B2B Sales','KPI Ownership','WBR / MBR / QBR','GCP Certified','Coaching & Mentoring','Process Playbooks','C-Suite Engagement'];

const COLORS = ['#b94fff','#ff2d78','#00e5ff','#d280ff','#ff6fa0','#7ff5ff'];

function Row({ items, reverse, speed }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden py-2" style={{ maskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)', WebkitMaskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)' }}>
      <div
        className="flex w-max"
        style={{ animation:`marquee ${speed}s linear infinite ${reverse?'reverse':''}` }}
      >
        {doubled.map((item, i) => {
          const col = COLORS[i % COLORS.length];
          return (
            <div key={i} className="flex items-center shrink-0 mx-4">
              <span
                className="font-mono text-xs tracking-[0.18em] uppercase cursor-default select-none transition-all duration-200"
                style={{ color: col + 'aa' }}
                onMouseEnter={e => { e.currentTarget.style.color = col; e.currentTarget.style.textShadow = `0 0 12px ${col}`; }}
                onMouseLeave={e => { e.currentTarget.style.color = col + 'aa'; e.currentTarget.style.textShadow = 'none'; }}
              >
                {item}
              </span>
              <span className="mx-4 text-[10px]" style={{ color: col + '55', textShadow:`0 0 8px ${col}` }}>◆</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden" style={{ background:'rgba(185,79,255,0.03)', borderTop:'1px solid rgba(185,79,255,0.12)', borderBottom:'1px solid rgba(185,79,255,0.12)' }}>
      {/* Scanline sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex:2 }}>
        <div className="absolute top-0 bottom-0 w-px opacity-30"
          style={{ background:'linear-gradient(to bottom,transparent,#b94fff,transparent)', animation:'scanline-x 6s linear infinite', left:0 }} />
      </div>
      <style>{`@keyframes scanline-x{0%{left:-2px}100%{left:100%}}`}</style>
      <Row items={row1} reverse={false} speed={40} />
      <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(185,79,255,0.2),rgba(255,45,120,0.2),rgba(0,229,255,0.2),transparent)' }} />
      <Row items={row2} reverse={true}  speed={32} />
    </div>
  );
}
