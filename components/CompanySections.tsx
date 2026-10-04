"use client";

/** Premium company showcase + ongoing projects, placed right after the 8 projects. */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useReveal(selector: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [selector]);
  return ref;
}

export function Experience() {
  const ref = useReveal(".ex-item");
  const POINTS = [
    { t: "WELL EXPERIENCED WORKERS", d: "Experienced and skilled workers delivering reliable execution with attention to every construction detail." },
    { t: "BEST INTERIOR DESIGN", d: "Thoughtful interior designs combining functionality, comfort and modern aesthetics." },
    { t: "SITE EXPERTISE", d: "Practical knowledge and professional execution from planning to completion." },
    { t: "QUALITY & PRECISION", d: "Careful selection of materials, finishing and construction details." },
    { t: "TIMELY EXECUTION", d: "Disciplined project execution focused on quality and timely completion." },
  ];
  return (
    <section className="relative py-28 px-6 bg-coal">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2 className="ex-item font-display text-4xl md:text-5xl max-w-xl">EXPERIENCE THAT BUILDS CONFIDENCE</h2>
        <p className="ex-item text-fog mt-5 max-w-2xl">
          Backed by experienced professionals and skilled workers, RR ASSOCIATES focuses on disciplined execution,
          attention to detail and quality workmanship at every stage of construction.
        </p>
        {/* Desktop: 3 items on top row, last 2 span the row below; mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-12 mt-14">
          {POINTS.map((p, i) => (
            <div
              key={p.t}
              className={`ex-item border-t border-gold/30 pt-6 transition-colors duration-500 hover:border-gold ${
                i < 3 ? "md:col-span-2" : "md:col-span-3"
              }`}
            >
              <p className="text-gold text-[10px] tracking-widest2 mb-3">0{i + 1}</p>
              <h3 className="font-display text-xl">{p.t}</h3>
              <p className="text-fog text-sm mt-3">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  const ref = useReveal(".ap-item");
  const STEPS = ["PLANNING", "STRUCTURAL EXECUTION", "MASONRY & SERVICES", "FINISHING", "FINAL HANDOVER"];
  return (
    <section className="relative py-28 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <p className="ap-item text-gold text-[11px] tracking-widest2 mb-4">OUR APPROACH</p>
        <h2 className="ap-item font-display text-4xl md:text-5xl mb-16">From blueprint to handover.</h2>
        <ol className="relative border-l border-line ml-3">
          {STEPS.map((s, i) => (
            <li key={s} className="ap-item relative pl-10 pb-10 last:pb-0">
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

export function CTA() {
  const ref = useReveal(".cta-item");
  return (
    <section className="relative py-28 px-6 bg-coal blueprint-grid border-t border-line">
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <h2 className="cta-item font-display text-4xl md:text-6xl">LET&apos;S BUILD SOMETHING THAT LASTS.</h2>
        <p className="cta-item text-fog mt-6">Have a project in mind? Let&apos;s turn your vision into a well-built reality.</p>
        <a
          href="#contact"
          className="cta-item inline-flex items-center gap-3 mt-10 px-8 py-4 border border-gold text-gold text-xs tracking-widest2 hover:bg-gold hover:text-ink transition-colors duration-500"
        >
          GET IN TOUCH <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
