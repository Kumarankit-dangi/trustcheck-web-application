import type { HistoryEntry } from "../types";

const STORAGE_KEY = "trustcheck.history.v1";
const MAX_ENTRIES = 5;

export function getHistory(): HistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is HistoryEntry =>
        item &&
        typeof item.name === "string" &&
        typeof item.score === "number" &&
        typeof item.trustLevel === "string" &&
        typeof item.timestamp === "number"
    );
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry: HistoryEntry): HistoryEntry[] {
  try {
    const current = getHistory().filter(
      (item) => item.name.toLowerCase() !== entry.name.toLowerCase()
    );
    const next = [entry, ...current].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return getHistory();
  }
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage errors (e.g. private browsing restrictions)
  }
}
