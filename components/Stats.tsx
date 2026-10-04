"use client";

/** Premium statistics band with count-up numbers (GSAP ScrollTrigger). */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: 9, suffix: "+", l1: "YEARS", l2: "OF TRUSTED EXPERIENCE" },
  { num: 30, suffix: "+", l1: "PROJECTS", l2: "COMPLETED SUCCESSFULLY" },
  { num: 0, suffix: "", l1: "MULTI", l2: "SECTOR · DIVERSE INDUSTRIES" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target);
        if (!target) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = String(Math.round(obj.v)) + (el.dataset.suffix ?? "")),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-20 px-6 bg-coal border-y border-line">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
        {STATS.map((s) => (
          <div key={s.l1} className="text-center py-8 md:py-2 px-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
            </svg>
            <p
              className="stat-num font-display text-5xl md:text-6xl text-bone"
              data-target={s.num}
              data-suffix={s.suffix}
            >
              {s.num === 0 ? s.l1 : "0"}
            </p>
            {s.num !== 0 && <p className="text-gold text-xs tracking-widest2 mt-2">{s.l1}</p>}
            <p className="text-fog text-[11px] tracking-widest2 mt-2">{s.l2}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
