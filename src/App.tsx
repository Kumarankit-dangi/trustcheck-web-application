import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResultCard from "./components/ResultCard";
import RecentChecks from "./components/RecentChecks";
import HowItWorks from "./components/HowItWorks";
import About from "./components/About";
import Footer from "./components/Footer";
import { generateTrustResult } from "./utils/trustEngine";
import { getHistory, addHistoryEntry, clearHistory } from "./utils/historyStore";
import type { AppStatus, HistoryEntry, TrustResult } from "./types";

const LOADING_DURATION_MS = 1900;

function getNameFromUrl(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    return name && name.trim() ? name.trim() : null;
  } catch {
    return null;
  }
}

function updateUrlWithName(name: string | null) {
  try {
    const url = new URL(window.location.href);
    if (name) {
      url.searchParams.set("name", name);
    } else {
      url.searchParams.delete("name");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  } catch {
    // ignore environments without history API
  }
}

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<AppStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<TrustResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [liveMessage, setLiveMessage] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const hasHydratedFromUrl = useRef(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const runCheck = useCallback((rawName: string, options?: { silent?: boolean }) => {
    const name = rawName.trim();
    if (!name) {
      setStatus("error");
      setErrorMessage("Please enter a name to check 👀");
      return;
    }

    if (options?.silent) {
      const generated = generateTrustResult(name);
      setResult(generated);
      setStatus("success");
      setErrorMessage(null);
      setLiveMessage(`Result ready for ${generated.name}: ${generated.score}% — ${generated.trustLevel}`);
      const updatedHistory = addHistoryEntry({
        name: generated.name,
        score: generated.score,
        trustLevel: generated.trustLevel,
        timestamp: generated.timestamp,
      });
      setHistory(updatedHistory);
      updateUrlWithName(generated.name);
      return;
    }

    setStatus("loading");
    setErrorMessage(null);
    setLiveMessage("Calculating friendship score, please wait...");

    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
    }

    loadingTimeoutRef.current = window.setTimeout(() => {
      const generated = generateTrustResult(name);
      setResult(generated);
      setStatus("success");
      setLiveMessage(`Result ready for ${generated.name}: ${generated.score}% — ${generated.trustLevel}`);
      const updatedHistory = addHistoryEntry({
        name: generated.name,
        score: generated.score,
        trustLevel: generated.trustLevel,
        timestamp: generated.timestamp,
      });
      setHistory(updatedHistory);
      updateUrlWithName(generated.name);
    }, LOADING_DURATION_MS);
  }, []);

  useEffect(() => {
    if (hasHydratedFromUrl.current) return;
    hasHydratedFromUrl.current = true;
    const nameFromUrl = getNameFromUrl();
    if (nameFromUrl) {
      setInputValue(nameFromUrl);
      runCheck(nameFromUrl, { silent: true });
    }
  }, [runCheck]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status === "success" && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status, result]);

  const handleChange = (value: string) => {
    setInputValue(value);
    if (status === "error") {
      setStatus(value.trim() ? "typing" : "error");
      if (value.trim()) setErrorMessage(null);
    } else if (status !== "loading" && status !== "success") {
      setStatus(value.trim() ? "typing" : "idle");
    }
  };

  const handleSubmit = () => {
    if (status === "loading") return;
    runCheck(inputValue);
  };

  const handleExampleClick = (example: string) => {
    setInputValue(example);
    setStatus("typing");
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  const handleTryAgain = () => {
    setResult(null);
    setStatus("idle");
    setErrorMessage(null);
    setInputValue("");
    updateUrlWithName(null);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleHistorySelect = (name: string) => {
    setInputValue(name);
    runCheck(name, { silent: true });
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white text-slate-900">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      <Navbar />

      <main>
        <Hero
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onExampleClick={handleExampleClick}
          status={status}
          errorMessage={errorMessage}
        />

        <div ref={resultSectionRef} className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          {status === "success" && result && (
            <div className="pb-14">
              <ResultCard result={result} onTryAgain={handleTryAgain} />
            </div>
          )}

          {history.length > 0 && (
            <div className="pb-16">
              <RecentChecks
                history={history}
                onSelect={handleHistorySelect}
                onClear={handleClearHistory}
              />
            </div>
          )}
        </div>

        <HowItWorks />
        <About />
      </main>

      <Footer />
    </div>
  );
}
