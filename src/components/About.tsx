export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm shadow-slate-100 ring-1 ring-slate-200 sm:p-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          About TrustCheck
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          TrustCheck is a playful, viral little web app built purely for laughs. Type in a name,
          get a ridiculous (but oddly specific-feeling) friendship score, and share it with your
          group chat. That's it — that's the whole app.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Every score comes from a deterministic algorithm that turns the letters of a name into a
          number. It has no idea who your friends actually are, and it never will.
        </p>

        <div className="mt-6 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
          <p className="flex items-start gap-2 text-sm font-semibold text-amber-800">
            <span aria-hidden="true">⚠️</span>
            <span>
              Disclaimer: TrustCheck is made for entertainment only. It does not access private
              messages, social media accounts, contacts, or any personal data. All results are
              generated locally in your browser from the text you type in — nothing more.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
