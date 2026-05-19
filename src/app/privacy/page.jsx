import Link from "next/link";

export const metadata = {
  title: "MediQueue | Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-bold text-[#2f4aa5] dark:text-[#8fb0ff]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-8 space-y-6 text-slate-700 dark:text-slate-300">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Information we collect
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            When you register or book a session, we store your name, email, and
            booking details needed to run MediQueue. Tutor listings may include
            photos and availability you choose to publish.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            How we use your data
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            Data is used to authenticate your account, show your bookings, and
            connect students with tutors. We do not sell personal information to
            third parties.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2a3655] dark:bg-[#151c2f]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Contact
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            Questions about privacy? Email{" "}
            <a
              href="mailto:info@mediqueue.net"
              className="font-semibold text-[#2f4aa5] hover:underline dark:text-[#8fb0ff]"
            >
              info@mediqueue.net
            </a>
            .
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-[#2f4aa5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#263f8b] dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </main>
  );
}
