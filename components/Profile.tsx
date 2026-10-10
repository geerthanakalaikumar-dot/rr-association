export default function Profile() {
  return (
    <section
      id="profile"
      className="bg-ink text-bone py-20 px-6 border-t border-line"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-gold text-xs tracking-widest2 mb-4">
          GET TO KNOW US
        </p>

        <h2 className="font-display text-3xl md:text-5xl mb-4">
          RR ASSOCIATES BUILDERS
        </h2>

        <p className="text-fog mb-10">
          Building a better tomorrow with trust, precision and excellence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="tel:+919597009498"
            className="border border-line p-6 hover:border-gold transition-colors"
          >
            <p className="text-gold text-xs tracking-widest2 mb-3">
              CONTACT NUMBER
            </p>
            <p>+91 95970 09498</p>
          </a>

          <div className="border border-line p-6">
            <p className="text-gold text-xs tracking-widest2 mb-3">
              LOCATION
            </p>
            <p>Salem, Tamil Nadu</p>
          </div>

          <a
            href="https://www.linkedin.com/in/rajesh-raju-6b8b99192"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line p-6 hover:border-gold transition-colors"
          >
            <p className="text-gold text-xs tracking-widest2 mb-3">
              LINKEDIN PROFILE
            </p>
            <p>Rajesh Raju — View Profile ↗</p>
          </a>

          <a
            href="https://www.instagram.com/rr_associates19/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line p-6 hover:border-gold transition-colors"
          >
            <p className="text-gold text-xs tracking-widest2 mb-3">
              INSTAGRAM ID
            </p>
            <p>@rr_associates19 ↗</p>
          </a>

          <a
            href="mailto:rrassociates19@hotmail.com"
            className="border border-line p-6 hover:border-gold transition-colors sm:col-span-2"
          >
            <p className="text-gold text-xs tracking-widest2 mb-3">
              EMAIL ADDRESS
            </p>
            <p>rrassociates19@hotmail.com</p>
          </a>
        </div>
      </div>
    </section>
  );
}
