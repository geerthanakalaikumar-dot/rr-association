"use client";

const SERVICES = [
  { n: "01", title: "Building Construction", desc: "End-to-end structural delivery from foundation to handover." },
  { n: "02", title: "Residential Projects", desc: "Practical, durable homes designed around client needs." },
  { n: "03", title: "Apartment Projects", desc: "Multi-unit developments with coordinated structure and services." },
  { n: "04", title: "Hospital & Healthcare", desc: "Larger-scale facilities with functional planning and finishing." },
  { n: "05", title: "Interior Works", desc: "Professional interior fit-outs with coordinated detailing." },
  { n: "06", title: "Renovation & Upgrading", desc: "Structural and aesthetic upgrades for existing buildings." },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-gold text-[11px] tracking-widest2 mb-4">CAPABILITIES</p>
        <h2 className="font-display text-4xl md:text-5xl mb-16 max-w-2xl">
          What we build, <span className="text-fog">from ground to glow.</span>
        </h2>

        <div className="divide-y divide-line border-y border-line">
          {SERVICES.map((s) => (
            <a
              key={s.n}
              href="#contact"
              className="group relative flex items-center gap-6 md:gap-12 py-7 transition-all duration-500 hover:pl-6"
            >
              {/* architectural marker on hover */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="font-display text-fog text-lg group-hover:text-gold transition-colors">{s.n}</span>
              <h3 className="font-display text-2xl md:text-4xl flex-1 group-hover:tracking-wider transition-all duration-500">
                {s.title}
              </h3>
              <p className="hidden md:block text-fog text-sm max-w-xs">{s.desc}</p>
              <span className="text-gold opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
