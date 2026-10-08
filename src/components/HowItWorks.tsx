const STEPS = [
  {
    number: "01",
    title: "Enter a Name",
    description: "Tell us who you want to check — a friend, a classmate, anyone.",
    emoji: "✍️",
  },
  {
    number: "02",
    title: "We Analyze",
    description: "Our totally-for-fun algorithm calculates a friendship score instantly.",
    emoji: "🧮",
  },
  {
    number: "03",
    title: "Get Your Result",
    description: "See whether they're a real one or a little suspicious 👀",
    emoji: "🎉",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Three simple steps to a completely unserious friendship verdict.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl bg-white p-6 text-center shadow-sm shadow-slate-100 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-4xl" aria-hidden="true">
                {step.emoji}
              </span>
              <p className="mt-3 text-sm font-bold text-violet-500">{step.number}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-violet-50 p-4 text-center text-sm font-medium text-violet-700 ring-1 ring-violet-100">
          This is an entertainment experience. Results are generated using a deterministic fun
          algorithm based only on the name you type — not based on private social media
          information.
        </p>
      </div>
    </section>
  );
}
