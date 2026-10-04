"use client";

import { useState } from "react";

/**
 * Selected Projects — 8 cards using the REAL photos in /public/projects.
 * Missing files are handled by <Photo>'s onError fallback (clean dark
 * placeholder, never a stock image).
 */

const PROJECTS = [
  { title: "Healthcare Facility", desc: "A multi-storey healthcare facility built with functional spaces, durable construction and quality finishing.", tag: "HEALTHCARE", img: "/projects/project-01.jpg" },
  { title: "Modern Residential Building", desc: "Contemporary residential construction featuring a distinctive elevation, practical planning and detailed exterior finishing.", tag: "RESIDENTIAL", img: "/projects/project-02.jpg" },
  { title: "Structural Construction", desc: "On-site structural execution focused on strong construction practices, accuracy and quality workmanship.", tag: "SITE EXECUTION", img: "/projects/project-03.jpg" },
  { title: "Interior Design & Finishing", desc: "Professionally executed interiors combining practical planning, clean finishes and thoughtful detailing.", tag: "INTERIORS", img: "/projects/project-04.jpg" },
  { title: "Commercial Construction", desc: "Quality commercial construction delivered with coordinated execution, durable materials and attention to detail.", tag: "COMMERCIAL", img: "/projects/project-05.jpg" },
  { title: "Renovation & Restoration", desc: "Building renovation work focused on improving functionality, appearance and overall structural quality.", tag: "RENOVATION", img: "/projects/project-06.jpg" },
  { title: "Residential Development", desc: "Well-planned residential construction with modern architectural elements and refined finishing.", tag: "RESIDENTIAL", img: "/projects/project-07.jpg" },
  { title: "Site Execution", desc: "Practical on-site construction work carried out with experienced workmanship and attention to quality.", tag: "SITE EXECUTION", img: "/projects/project-08.jpg" },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 blueprint-grid">
      <div className="max-w-6xl mx-auto">
        <p className="text-gold text-[11px] tracking-widest2 mb-4">PORTFOLIO</p>
        <h2 className="font-display text-4xl md:text-5xl">OUR PROJECTS</h2>
        <p className="text-fog mt-4">Built with precision. Delivered with purpose.</p>
        <div className="w-16 h-px bg-gold mt-6 mb-16" />

        {/* Premium masonry layout: each card follows its photo's natural height */}
        <div className="columns-1 md:columns-2 gap-8 [column-fill:_balance]">
          {PROJECTS.map((p, i) => (
            <div key={p.img} className="mb-8 break-inside-avoid">
              <ProjectCard index={i + 1} p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Photo({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full aspect-[16/10] flex items-center justify-center bg-coal border border-line">
        <p className="text-fog text-[10px] tracking-widest2">PROJECT IMAGE — UPLOAD COMING</p>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="block w-full h-auto object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
    />
  );
}

function ProjectCard({ index, p }: { index: number; p: (typeof PROJECTS)[number] }) {
  return (
    <article className="group glass-panel rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 border border-transparent">
      <div className="relative overflow-hidden bg-[#05070b] border-b border-gold/20">
        <Photo
          src={p.img}
          alt={`${p.title} — ${p.tag} project by RR ASSOCIATES`}
        />

        {/* dark overlay on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500 pointer-events-none" />

        {/* arrow appears on hover */}
        <span className="absolute top-4 right-4 text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
          →
        </span>
      </div>

      <div className="p-6">
        <p className="text-gold text-[10px] tracking-widest2 mb-2">{p.tag}</p>
        <h3 className="font-display text-2xl mb-2">{p.title}</h3>
        <p className="text-fog text-sm leading-relaxed">{p.desc}</p>
      </div>
    </article>
  );
}
