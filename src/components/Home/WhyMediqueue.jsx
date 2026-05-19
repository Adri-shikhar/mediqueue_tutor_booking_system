const features = [
  {
    title: "Verified tutors",
    text: "Every tutor profile includes subject, availability, and session windows so you can book with confidence.",
    icon: "✓",
  },
  {
    title: "Easy booking",
    text: "Pick a date, confirm your session, and manage all bookings from your dashboard.",
    icon: "📅",
  },
  {
    title: "Learn your way",
    text: "Online, offline, or both — choose the teaching mode that fits your lifestyle.",
    icon: "🎓",
  },
];

export default function WhyMediqueue() {
  return (
    <section className="mt-16">
      <h2 className="text-center text-2xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
        Why Choose Mediqueue?
      </h2>
      <p className="mt-2 text-center text-slate-600 dark:text-slate-400">
        A simple platform built for students and tutors in Bangladesh.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]"
          >
            <span className="text-3xl">{item.icon}</span>
            <h3 className="mt-3 font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
