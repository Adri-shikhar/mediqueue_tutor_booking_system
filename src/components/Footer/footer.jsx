import Image from "next/image";
import Link from "next/link";

const tutorLinks = [
  { href: "/Tutors", label: "Find Tutors" },
  { href: "/Add_Tutor", label: "Become a Tutor" },
  { href: "/My_Booked_Sessions", label: "Booked Sessions" },
  { href: "/privacy", label: "Privacy Policy" },
];

const accountLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/My_Tutors", label: "My Tutors" },
];

const partners = [
  "compare",
  "Digitalwell Arena",
  "HDS",
  "University of Gothenburg",
  "Region Varmland",
  "almi",
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-gradient-to-b from-[#eef7ff] to-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 lg:col-span-5">
            <Link href="/" className="inline-block">
              <Image
                src="/Assets/logo.png"
                alt="Mediqueue logo"
                width={150}
                height={46}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              Connect with expert tutors, book sessions, and manage your learning
              journey — all in one place.
            </p>
            <div className="flex items-center gap-3">
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-[#2f4aa5] shadow-sm transition hover:border-[#2f4aa5] hover:bg-[#2f4aa5] hover:text-white"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#2f4aa5] shadow-sm transition hover:border-[#2f4aa5] hover:bg-[#2f4aa5] hover:text-white"
                href="mailto:info@mediqueue.net"
                aria-label="Email"
              >
                @
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="text-sm font-bold text-[#2f4aa5]">Tutor Services</h3>
              <ul className="mt-4 space-y-3">
                {tutorLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-sm text-slate-600 transition hover:text-[#2f4aa5] hover:underline hover:underline-offset-4"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2f4aa5]">Account</h3>
              <ul className="mt-4 space-y-3">
                {accountLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-sm text-slate-600 transition hover:text-[#2f4aa5] hover:underline hover:underline-offset-4"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[#2f4aa5]">Get in touch</h3>
            <div className="mt-4 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <a
                className="block text-sm font-medium text-slate-700 transition hover:text-[#2f4aa5]"
                href="mailto:info@mediqueue.net"
              >
                info@mediqueue.net
              </a>
              <a
                className="block text-sm font-medium text-slate-700 transition hover:text-[#2f4aa5]"
                href="tel:+15559876543"
              >
                +1 (555) 987-6543
              </a>
              <p className="text-xs text-slate-500">
                Mon–Fri, 9:00–17:00 CET
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-[#2f4aa5] px-6 py-8 text-white shadow-lg shadow-[#2f4aa5]/20">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/70">
            Trusted by
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {partners.map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-sm transition hover:bg-white/20"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white py-5">
        <p className="text-center text-xs text-slate-500">
          © {year} Mediqueue. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
