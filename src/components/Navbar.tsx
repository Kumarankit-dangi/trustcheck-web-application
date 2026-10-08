import { useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="flex items-center gap-2 rounded-lg text-lg font-extrabold tracking-tight text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base shadow-sm shadow-violet-200"
            aria-hidden="true"
          >
            🔍
          </span>
          <span>
            Trust<span className="text-violet-600">Check</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
