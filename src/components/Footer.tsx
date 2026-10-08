export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <span className="flex items-center gap-2 text-base font-extrabold text-slate-900">
          <span aria-hidden="true">🔍</span> TrustCheck
        </span>
        <p className="max-w-xl text-sm text-slate-500">
          For entertainment purposes only. Results are randomly / deterministically generated and
          are not based on any real personal or social-media data.
        </p>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} TrustCheck. Made for laughs, not for lawsuits.
        </p>
      </div>
    </footer>
  );
}
