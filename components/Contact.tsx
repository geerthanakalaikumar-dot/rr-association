"use client";

const ITEMS = [
  {
    label: "CONTACT US",
    value: "9597009498",
    href: "tel:+919597009498",
  },
  {
    label: "EMAIL US",
    value: "rrassociates19@hotmail.com",
    href: "mailto:rrassociates19@hotmail.com",
  },
  {
    label: "LOCATION",
    value: "Tamil Nadu, Salem",
    href: null,
  },
  {
    label: "LINKEDIN ID",
    value: "Rajesh Raju - View Profile",
    href: "https://www.linkedin.com/in/rajesh-raju-6b8b99192",
  },
  {
    label: "INSTAGRAM ID",
    value: "@rr_associates19",
    href: "https://www.instagram.com/rr_associates19/",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 px-6 bg-coal border-t border-line"
    >
      <div className="max-w-5xl mx-auto">

        {/* Contact heading */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.3em] mb-3">
            GET IN TOUCH
          </p>

          <h2 className="font-display text-3xl md:text-5xl text-bone leading-tight">
            CONTACT RR ASSOCIATES BUILDERS
          </h2>

          <p className="text-fog mt-4 text-sm md:text-base">
            Let’s build something great together.
          </p>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 divide-line text-center">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="py-6 px-4 border-b border-line/60"
            >
              <p className="text-gold text-[10px] tracking-widest2 mb-3">
                {item.label}
              </p>

              {item.href ? (
                <a
                  href={item.href}
                  target={
                    item.label === "LINKEDIN ID" ||
                    item.label === "INSTAGRAM ID"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.label === "LINKEDIN ID" ||
                    item.label === "INSTAGRAM ID"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-bone hover:text-gold transition-colors break-words"
                >
                  {item.value}
                  {(item.label === "LINKEDIN ID" ||
                    item.label === "INSTAGRAM ID") && " ↗"}
                </a>
              ) : (
                <p className="text-bone">{item.value}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
