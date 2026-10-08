import type { TrustResult } from "../types";

export function buildResultUrl(name: string): string {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("name", name);
  return url.toString();
}

export function buildShareMessage(result: TrustResult): string {
  return [
    `I checked ${result.name}'s friendship score on TrustCheck 👀`,
    "",
    `Score: ${result.score}%`,
    `Verdict: ${result.trustLevel}`,
    "",
    result.description,
    "",
    `Check your own friends: ${buildResultUrl(result.name)}`,
  ].join("\n");
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error("clipboard api unavailable");
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch {
      return false;
    }
  }
}

export type ShareOutcome = "shared" | "copied" | "failed";

export async function shareResult(result: TrustResult): Promise<ShareOutcome> {
  const text = buildShareMessage(result);
  const url = buildResultUrl(result.name);

  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share({
        title: "My TrustCheck Result",
        text: `I checked my friendship score on TrustCheck 👀`,
        url,
      });
      return "shared";
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return "failed";
      }
      // fall through to clipboard fallback
    }
  }

  const copied = await copyToClipboard(text);
  return copied ? "copied" : "failed";
}

export async function copyResultText(result: TrustResult): Promise<boolean> {
  return copyToClipboard(buildShareMessage(result));
}
