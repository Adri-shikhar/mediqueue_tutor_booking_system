const steps = [
  { step: "1", title: "Browse tutors", text: "Explore subjects, fees, and available time slots." },
  { step: "2", title: "Book a session", text: "Choose your date and confirm your booking online." },
  { step: "3", title: "Start learning", text: "Meet your tutor online or in person and grow your skills." },
];

export default function HowItWorks() {
  return (
    <section className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-[#eef7ff] p-8 dark:border-[#2a3655] dark:from-[#151c2f] dark:to-[#1a2440]">
      <h2 className="text-center text-2xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
        How It Works
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {steps.map((item) => (
          <div key={item.step} className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2f4aa5] text-lg font-bold text-white">
              {item.step}
            </span>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
