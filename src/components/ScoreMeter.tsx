import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface ScoreMeterProps {
  score: number;
  ringClassName: string;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreMeter({ score, ringClassName }: ScoreMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayScore(score);
      return;
    }

    setDisplayScore(0);
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [score, prefersReducedMotion]);

  const offset = CIRCUMFERENCE * (1 - displayScore / 100);

  return (
    <div className="relative flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-slate-100" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className={`${ringClassName} stroke-current transition-[stroke-dashoffset] duration-150 ease-out`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-extrabold tabular-nums text-slate-900 sm:text-5xl">
          {displayScore}%
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Trust Score
        </span>
      </div>
    </div>
  );
}
