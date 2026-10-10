```tsx
"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#services", label: "SERVICES" },
  { href: "#contact", label: "CONTACT" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/rajesh-raju-6b8b99192",
    label: "LINKEDIN",
  },
  {
    href: "https://www.instagram.com/rr_associates19/",
    label: "INSTAGRAM",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/70 backdrop-blur-xl border-b border-line/60"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-xl md:text-2xl tracking-[0.25em]"
        >
          RR <span className="text-gold">ASSOCIATES</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] tracking-widest2 text-fog hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}

          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-widest2 text-fog hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-fog"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-ink/90 backdrop-blur-xl">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xs tracking-widest2 text-fog hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}

          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-xs tracking-widest2 text-fog hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
```
