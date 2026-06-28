const items = [
  'Operations Leadership', '$3M+ Pipeline', 'Customer Success',
  '100% CSAT / NPS', 'L&D Enablement', '33% Ramp-Up Cut',
  'Google Cloud', 'Salesforce CRM', 'Team Leadership',
  'B2B Sales', 'KPI Ownership', 'WBR / MBR / QBR',
  'Operations Leadership', '$3M+ Pipeline', 'Customer Success',
  '100% CSAT / NPS', 'L&D Enablement', '33% Ramp-Up Cut',
  'Google Cloud', 'Salesforce CRM', 'Team Leadership',
  'B2B Sales', 'KPI Ownership', 'WBR / MBR / QBR',
];

export default function MarqueeStrip() {
  return (
    <div className="relative py-4 overflow-hidden border-y border-white/5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #030712, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #030712, transparent)' }} />

      <div
        className="flex w-max"
        style={{ animation: 'marquee 35s linear infinite' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center mx-5 gap-4 shrink-0">
            <span
              className="font-display font-semibold text-xs tracking-widest text-slate-500 uppercase cursor-default hover:text-blue-400 transition-colors duration-200"
            >
              {item}
            </span>
            <span className="text-blue-500/30 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
