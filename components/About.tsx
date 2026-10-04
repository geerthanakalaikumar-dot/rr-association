"use client";

const FOCUS = [
  "Practical site execution",
  "Structural coordination",
  "Finishing quality",
  "Client functional requirements",
  "Durable and practical construction",
  "Professional finishing",
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14">
        <div>
          <p className="text-gold text-[11px] tracking-widest2 mb-4">ABOUT</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Experience that translates into execution.
          </h2>
        </div>
        <div>
          <p className="text-fog leading-relaxed">
            RR ASSOCIATES is a construction and interior firm led by Rajesh Raju, with more than
            9 years of experience in the construction field and 30+ completed projects including
            residential buildings, apartments and hospitals.
          </p>
          <ul className="mt-8 space-y-3">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-px bg-gold inline-block" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
