// ------------------------------------------------------------------
// Shared scroll state for the cinematic construction hero.
// A tiny mutable store is used (instead of React state) so the
// Three.js render loop can read progress every frame without
// triggering re-renders.
// ------------------------------------------------------------------

export const scrollState = {
  /** 0 = site cleared, 1 = finished building. Driven by GSAP ScrollTrigger. */
  progress: 0,
  /** Smoothed value, eased toward `progress` inside useFrame. */
  eased: 0,
};

export const STAGES = [
  { until: 0.12, label: "PLANNING", index: "01" },
  { until: 0.45, label: "STRUCTURAL EXECUTION", index: "02" },
  { until: 0.65, label: "MASONRY & SERVICES", index: "03" },
  { until: 0.88, label: "FINISHING", index: "04" },
  { until: 1.01, label: "FINAL HANDOVER", index: "05" },
] as const;

export function stageFor(progress: number) {
  return STAGES.find((s) => progress < s.until) ?? STAGES[STAGES.length - 1];
}
