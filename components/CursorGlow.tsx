"use client";

/** Subtle cursor glow — desktop only, purely decorative. */
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;
  return (
    <div
      className="pointer-events-none fixed z-[60] w-64 h-64 rounded-full opacity-[0.07] bg-gold blur-3xl"
      style={{ left: pos.x - 128, top: pos.y - 128 }}
    />
  );
}
