export type AppStatus = "idle" | "typing" | "loading" | "success" | "error";

export interface TrustIndicator {
  label: string;
  value: number;
}

export interface TrustResult {
  name: string;
  score: number;
  trustLevel: string;
  emoji: string;
  colorClass: string;
  description: string;
  indicators: TrustIndicator[];
  timestamp: number;
}

export interface HistoryEntry {
  name: string;
  score: number;
  trustLevel: string;
  timestamp: number;
}
