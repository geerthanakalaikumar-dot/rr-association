"use client";

const ITEMS = [
  { label: "CONTACT US", value: "9597009498", href: "tel:+919597009498" },
  { label: "EMAIL US", value: "rrassociates19@hotmail.com", href: "mailto:rrassociates19@hotmail.com" },
  { label: "LOCATION", value: "Tamil Nadu, Salem", href: null },
];

function Icon({ i }: { i: number }) {
  const paths = [
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
    "M4 6h16v12H4zM4 7l8 6 8-6",
    "M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5",
  ];
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d={paths[i]} />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 px-6 bg-coal border-t border-line">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line text-center">
        {ITEMS.map((c, i) => (
          <div key={c.label} className="py-6 md:py-2 px-4">
            <div className="flex justify-center mb-4"><Icon i={i} /></div>
            <p className="text-gold text-[10px] tracking-widest2 mb-2">{c.label}</p>
            {c.href ? (
              <a href={c.href} className="text-bone hover:text-gold transition-colors">{c.value}</a>
            ) : (
              <p className="text-bone">{c.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
