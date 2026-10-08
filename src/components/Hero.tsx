import { forwardRef } from "react";
import SearchBox from "./SearchBox";
import LoadingState from "./LoadingState";
import type { AppStatus } from "../types";

interface HeroProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onExampleClick: (value: string) => void;
  status: AppStatus;
  errorMessage: string | null;
}

const Hero = forwardRef<HTMLInputElement, HeroProps>(
  ({ value, onChange, onSubmit, onExampleClick, status, errorMessage }, ref) => {
    const isLoading = status === "loading";

    return (
      <section
        id="home"
        className="scroll-mt-20 relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
      >
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-fuchsia-200/50 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-100/60 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-violet-600 shadow-sm ring-1 ring-violet-100 animate-[fade-in-up_0.5s_ease-out]">
            ✨ 100% for entertainment
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 animate-[fade-in-up_0.6s_ease-out] sm:text-5xl md:text-6xl">
            Find Out Who Your Real Friends Are{" "}
            <span className="inline-block" aria-hidden="true">
              👀
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-slate-500 animate-[fade-in-up_0.7s_ease-out] sm:text-xl">
            Enter a name and discover their friendship score.
          </p>

          <div className="mt-8 animate-[fade-in-up_0.8s_ease-out] sm:mt-10">
            <SearchBox
              ref={ref}
              value={value}
              onChange={onChange}
              onSubmit={onSubmit}
              onExampleClick={onExampleClick}
              disabled={isLoading}
              errorMessage={status === "error" ? errorMessage : null}
            />
          </div>

          {isLoading && <LoadingState />}
        </div>
      </section>
    );
  }
);

Hero.displayName = "Hero";

export default Hero;
