import { useEffect, useState } from "react";

const MESSAGES = [
  "Checking friendship history... 👀",
  "Analyzing trust level...",
  "Calculating friendship score...",
  "Cross-referencing group chat behavior...",
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % MESSAGES.length);
    }, 650);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-white/70 px-6 py-8 text-center shadow-inner ring-1 ring-slate-200"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-14 w-14" aria-hidden="true">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
        <div className="absolute inset-0 flex items-center justify-center text-xl">🔎</div>
      </div>
      <p className="min-h-[1.5rem] text-base font-semibold text-slate-700 transition-opacity duration-300">
        {MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
