"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  "Client Requirements",
  "Planning & Coordination",
  "Structural Execution",
  "Masonry & Services",
  "Finishing Works",
  "Final Handover",
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-28 px-6">
      <div ref={ref} className="max-w-4xl mx-auto">
        <p className="text-gold text-[11px] tracking-widest2 mb-4">EXECUTION APPROACH</p>
        <h2 className="font-display text-4xl md:text-5xl mb-16">A disciplined build path.</h2>

        <ol className="relative border-l border-line ml-3">
          {STEPS.map((s, i) => (
            <li key={s} className="process-step relative pl-10 pb-12 last:pb-0">
              <span className="absolute -left-[9px] top-1 w-4 h-4 border border-gold bg-ink rotate-45" />
              <p className="text-gold text-[10px] tracking-widest2 mb-1">0{i + 1}</p>
              <h3 className="font-display text-2xl md:text-3xl">{s}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
