import { useState } from "react";
import type { TrustResult } from "../types";
import ScoreMeter from "./ScoreMeter";
import FriendshipIndicators from "./FriendshipIndicators";
import { shareResult, copyResultText } from "../utils/share";
import { getRingClass } from "../utils/trustEngine";

interface ResultCardProps {
  result: TrustResult;
  onTryAgain: () => void;
}

type FeedbackState = { kind: "share" | "copy"; message: string } | null;

export default function ResultCard({ result, onTryAgain }: ResultCardProps) {
  const [feedback, setFeedback] = useState<FeedbackState>(null);

  const showFeedback = (kind: "share" | "copy", message: string) => {
    setFeedback({ kind, message });
    window.setTimeout(() => setFeedback(null), 2500);
  };

  const handleShare = async () => {
    const outcome = await shareResult(result);
    if (outcome === "shared") showFeedback("share", "Shared! 🎉");
    else if (outcome === "copied") showFeedback("share", "Link copied to clipboard! 📋");
    else showFeedback("share", "Couldn't share — try Copy Result instead.");
  };

  const handleCopy = async () => {
    const success = await copyResultText(result);
    showFeedback("copy", success ? "Copied to clipboard! ✅" : "Copy failed — try again.");
  };

  return (
    <div
      className="mx-auto w-full max-w-xl animate-[fade-in-up_0.5s_ease-out]"
      role="region"
      aria-label={`Trust check result for ${result.name}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-violet-100 ring-1 ring-slate-200 sm:p-8">
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${result.colorClass} opacity-20 blur-2xl`}
          aria-hidden="true"
        />

        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            <span aria-hidden="true">🔍</span> TrustCheck
          </span>
          <span className="text-xs font-medium text-slate-400">For entertainment only</span>
        </div>

        <h3 className="relative mt-5 break-words text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {result.name}
        </h3>
        <p className="relative mt-1 text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
          Friendship Score
        </p>

        <div className="relative mt-4 flex justify-center">
          <ScoreMeter score={result.score} ringClassName={getRingClass(result.score)} />
        </div>

        <div className="relative mt-4 flex justify-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${result.colorClass} px-4 py-2 text-sm font-bold text-white shadow-sm`}
          >
            {result.trustLevel}
          </span>
        </div>

        <p className="relative mt-4 text-center text-base leading-relaxed text-slate-600">
          {result.description}
        </p>

        <div className="relative mt-6 rounded-2xl bg-slate-50 p-4 sm:p-5">
          <FriendshipIndicators indicators={result.indicators} />
        </div>

        <p className="relative mt-5 text-center text-xs text-slate-400">
          Checked by TrustCheck • Purely for fun, not based on real data
        </p>

        <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:brightness-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            <span aria-hidden="true">📤</span> Share
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            <span aria-hidden="true">📋</span> Copy Result
          </button>
          <button
            type="button"
            onClick={onTryAgain}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            <span aria-hidden="true">🔄</span> Try Again
          </button>
        </div>

        <div className="relative mt-3 min-h-[1.5rem] text-center" aria-live="polite">
          {feedback && (
            <span className="text-sm font-semibold text-emerald-600">{feedback.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
