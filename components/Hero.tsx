"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const parRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setProgress(1);
      if (clipRef.current)
        clipRef.current.style.clipPath = "inset(0% 0 0 0)";
      if (imgRef.current)
        imgRef.current.style.filter = "brightness(1) saturate(1)";
      if (blueprintRef.current)
        blueprintRef.current.style.opacity = "0";
      if (edgeRef.current) edgeRef.current.style.opacity = "0";
      return;
    }

    const DURATION = 1800;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const raw = Math.min(1, (now - start) / DURATION);
      const p = raw * raw * (3 - 2 * raw);
      setProgress(p);

      const reveal = 0.02 + p * 0.98;
      const hiddenTop = (1 - reveal) * 100;

      if (clipRef.current) {
        clipRef.current.style.clipPath = `inset(${hiddenTop}% 0 0 0)`;
        clipRef.current.style.transform = `translateY(${(1 - p) * 18}px)`;
      }

      if (imgRef.current) {
        imgRef.current.style.filter = `brightness(${0.35 + p * 0.65}) saturate(${0.5 + p * 0.5})`;
      }

      if (blueprintRef.current)
        blueprintRef.current.style.opacity = String(
          Math.max(0, 1 - p / 0.9)
        );

      if (edgeRef.current) {
        edgeRef.current.style.top = `${hiddenTop}%`;
        edgeRef.current.style.opacity =
          p > 0.02 && p < 0.98 ? "1" : "0";
      }

      if (raw < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    )
      return;

    const el = parRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    el.style.transform = `perspective(1200px) translateX(${x * 10}px) translateY(${y * 6}px) rotateY(${x * 2.5}deg)`;
  };

  const onMouseLeave = () => {
    if (parRef.current) {
      parRef.current.style.transform =
        "perspective(1200px) translateX(0) translateY(0) rotateY(0deg)";
    }
  };

  const pct = Math.round(progress * 100);

  return (
    <section ref={wrapperRef} id="home" className="relative h-screen bg-ink">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute inset-0 blueprint-grid" />

        <div className="relative z-10 h-full max-w-6xl mx-auto flex flex-col justify-center gap-5 px-6 py-24 md:py-0 md:grid md:grid-cols-2 md:gap-10 md:items-center">
          {/* Homepage heading and buttons */}
          <div>
            <p className="text-gold text-[10px] md:text-[11px] tracking-widest2 mb-3 md:mb-6">
              BUILDING A BETTER TOMORROW
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              QUALITY
              <br />
              CONSTRUCTION
              <br />
              <span className="text-gold">SOLUTIONS</span>
            </h1>

            <p className="mt-3 md:mt-6 text-fog text-sm md:text-base max-w-md leading-relaxed">
              Turning your vision into lasting structures with trust,
              precision and excellence.
            </p>

            {/* Our Projects button */}
            <a
              href="#projects"
              className="inline-flex items-center gap-3 mt-5 md:mt-10 px-6 md:px-8 py-3 md:py-4 border border-gold text-gold text-xs tracking-widest2 hover:bg-gold hover:text-ink transition-colors duration-500"
            >
              OUR PROJECTS <span aria-hidden>→</span>
            </a>

            {/* View Profile button */}
            <div>
              <a
                href="#profile"
                className="inline-flex items-center gap-3 mt-3 px-6 md:px-8 py-3 md:py-4 bg-gold text-ink text-xs tracking-widest2 border border-gold hover:bg-transparent hover:text-gold transition-colors duration-500"
              >
                VIEW PROFILE <span aria-hidden>↗</span>
              </a>
            </div>

            <p className="mt-4 md:mt-8 text-[10px] tracking-widest2 text-fog">
              REVEAL PROGRESS — {pct}%
            </p>
          </div>

          {/* Hospital photograph reveal animation */}
          <div
            ref={parRef}
            className="relative h-[34vh] sm:h-[40vh] md:h-[72vh] will-change-transform transition-transform duration-200 ease-out"
          >
            <div
              ref={blueprintRef}
              className="absolute inset-0 border border-gold/20 bg-[#05070b]"
            />

            <div
              ref={clipRef}
              className="absolute inset-0 overflow-hidden will-change-transform"
              style={{ clipPath: "inset(98% 0 0 0)" }}
            >
              <img
                ref={imgRef}
                src="/projects/hospital.jpg"
                alt="Completed healthcare facility by RR ASSOCIATES"
                className="absolute inset-0 w-full h-full object-contain object-center md:object-cover"
              />
            </div>

            <div
              ref={edgeRef}
              className="absolute left-0 right-0 h-px bg-gold/80 transition-opacity duration-300 pointer-events-none"
              style={{
                top: "98%",
                opacity: 0,
                boxShadow: "0 0 18px rgba(200,161,90,0.7)",
              }}
            />

            <div className="absolute -inset-3 border border-gold/15 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
