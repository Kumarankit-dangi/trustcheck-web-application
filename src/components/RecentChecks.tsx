import { useState } from "react";
import type { HistoryEntry } from "../types";
import ConfirmModal from "./ConfirmModal";

interface RecentChecksProps {
  history: HistoryEntry[];
  onSelect: (name: string) => void;
  onClear: () => void;
}

function getStatusDot(score: number): string {
  if (score >= 75) return "🟢";
  if (score >= 40) return "🟡";
  return "🔴";
}

function formatTimestamp(timestamp: number): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(timestamp));
  } catch {
    return "";
  }
}

export default function RecentChecks({ history, onSelect, onClear }: RecentChecksProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="rounded-3xl bg-white p-6 shadow-md shadow-slate-100 ring-1 ring-slate-200 sm:p-7">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Checks</h3>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="text-sm font-semibold text-rose-500 transition hover:text-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            Clear History
          </button>
        </div>

        <ul className="mt-4 divide-y divide-slate-100">
          {history.map((entry) => (
            <li key={`${entry.name}-${entry.timestamp}`}>
              <button
                type="button"
                onClick={() => onSelect(entry.name)}
                className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-3 text-left transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-slate-800">{entry.name}</span>
                  <span className="block text-xs text-slate-400">{formatTimestamp(entry.timestamp)}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-sm font-bold text-slate-700">
                  {entry.score}% <span aria-hidden="true">{getStatusDot(entry.score)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Clear recent checks?"
        message="This will remove all recent friendship checks from this device. This can't be undone."
        confirmLabel="Clear History"
        cancelLabel="Keep History"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onClear();
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
