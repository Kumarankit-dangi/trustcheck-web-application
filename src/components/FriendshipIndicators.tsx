import { useEffect, useState } from "react";
import type { TrustIndicator } from "../types";

interface FriendshipIndicatorsProps {
  indicators: TrustIndicator[];
}

const BAR_COLORS: Record<string, string> = {
  Loyalty: "from-violet-500 to-indigo-500",
  Trust: "from-sky-500 to-cyan-500",
  "Reply Speed": "from-emerald-500 to-teal-500",
  "Drama Level": "from-rose-500 to-orange-500",
};

export default function FriendshipIndicators({ indicators }: FriendshipIndicatorsProps) {
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    setAnimatedIn(false);
    const timeout = window.setTimeout(() => setAnimatedIn(true), 80);
    return () => window.clearTimeout(timeout);
  }, [indicators]);

  return (
    <dl className="w-full space-y-4">
      {indicators.map((indicator) => (
        <div key={indicator.label}>
          <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-600">
            <dt>{indicator.label}</dt>
            <dd className="tabular-nums text-slate-800">{indicator.value}%</dd>
          </div>
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label={indicator.label}
            aria-valuenow={indicator.value}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${
                BAR_COLORS[indicator.label] ?? "from-violet-500 to-indigo-500"
              } transition-[width] duration-1000 ease-out`}
              style={{ width: animatedIn ? `${indicator.value}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </dl>
  );
}
