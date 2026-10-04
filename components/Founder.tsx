"use client";

import { useEffect, useRef, useState } from "react";

export default function Founder() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const revealRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Automatic premium reveal: triggers when the founder photo scrolls into view.
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-28 px-6 bg-coal">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="group max-w-sm w-full mx-auto transition-transform duration-700 ease-out hover:-translate-y-3 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div
          ref={revealRef}
          className="relative transition-transform duration-500 ease-out will-change-transform motion-reduce:transition-none"
          style={{ transform: `perspective(1200px) translateZ(0) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          onMouseMove={(e) => {
            if (typeof window === "undefined") return;
            if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const r = e.currentTarget.getBoundingClientRect();
            setTilt({
              x: ((e.clientY - r.top) / r.height - 0.5) * -4, // max ~±2°
              y: ((e.clientX - r.left) / r.width - 0.5) * 4,
            });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          {/* ambient under-shadow, separate so it can breathe gently */}
          <div
            aria-hidden
            className="absolute inset-x-6 -bottom-8 h-10 bg-black/50 blur-2xl rounded-full opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 motion-reduce:transition-none"
          />
          <div
            className="relative rounded-sm overflow-hidden border border-gold/25 transition-[clip-path,transform,box-shadow] duration-[1500ms] ease-out shadow-[0_30px_60px_-18px_rgba(0,0,0,0.8),0_10px_26px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9),0_14px_34px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
            style={{
              clipPath: revealed ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
              transform: revealed ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {/* subtle top-edge highlight for a physical-panel feel */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <img
              src="/founder/founder.jpg"
              alt="Rajesh Raju — Founder of RR ASSOCIATES"
              className="block w-full h-auto object-cover object-top"
            />
          </div>
        </div>
        </div>
        <div>
          <p className="text-gold text-[11px] tracking-widest2 mb-4">FOUNDER</p>
          <h2 className="font-display text-4xl md:text-5xl">Rajesh Raju</h2>
          <p className="text-fog mt-3 tracking-widest2 text-xs">FOUNDER | RR ASSOCIATES</p>
          <p className="text-fog mt-8 leading-relaxed">
            Over 9 years of hands-on experience across residential, apartment, hospital and
            interior projects — leading teams on site, coordinating structure, services and
            finishing, and delivering buildings that stand up to daily use.
          </p>
        </div>
      </div>
    </section>
  );
}
