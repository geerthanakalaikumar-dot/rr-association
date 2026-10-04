"use client";

const POINTS = [
  "Hands-on experience",
  "30+ completed projects",
  "Multi-sector exposure",
  "Site-focused execution",
  "Construction & interior capability",
];

export default function WhyUs() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-gold text-[11px] tracking-widest2 mb-4">WHY RR ASSOCIATES</p>
        <h2 className="font-display text-4xl md:text-5xl mb-16">Built on field work, not paperwork.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {POINTS.map((p, i) => (
            <div
              key={p}
              className="glass-panel rounded-sm p-5 flex flex-col gap-4 hover:border-gold/40 hover:-translate-y-2 transition-all duration-500"
            >
              <span className="font-display text-gold text-xl">0{i + 1}</span>
              <p className="text-sm leading-snug">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
