import { forwardRef } from "react";
import type { FormEvent } from "react";

const EXAMPLES = ["Rahul", "Priya", "Ankit", "Best Friend"];

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onExampleClick: (value: string) => void;
  disabled: boolean;
  errorMessage: string | null;
}

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ value, onChange, onSubmit, onExampleClick, disabled, errorMessage }, ref) => {
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      onSubmit();
    };

    const isEmpty = value.trim().length === 0;

    return (
      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full" noValidate>
          <label htmlFor="trust-search-input" className="sr-only">
            Enter your friend's name or username
          </label>
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-lg shadow-violet-100 ring-1 ring-slate-200 transition focus-within:ring-2 focus-within:ring-violet-400 sm:flex-row sm:items-center sm:rounded-full sm:p-2">
            <div className="flex flex-1 items-center gap-2 px-3 sm:pl-5">
              <span className="text-xl" aria-hidden="true">
                🕵️
              </span>
              <input
                ref={ref}
                id="trust-search-input"
                type="text"
                inputMode="text"
                autoComplete="off"
                enterKeyHint="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Enter your friend's name or username..."
                aria-invalid={Boolean(errorMessage)}
                aria-describedby={errorMessage ? "trust-search-error" : undefined}
                className="w-full min-w-0 bg-transparent py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none sm:py-2"
              />
            </div>
            <button
              type="submit"
              disabled={isEmpty || disabled}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-base font-bold text-white shadow-md shadow-violet-200 transition active:scale-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:shadow-none sm:py-3 enabled:hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Check Trust <span aria-hidden="true">🔍</span>
            </button>
          </div>
        </form>

        {errorMessage && (
          <p
            id="trust-search-error"
            role="alert"
            className="mt-3 text-sm font-semibold text-rose-600"
          >
            {errorMessage}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <span className="text-sm font-medium text-slate-500">Try:</span>
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onExampleClick(example)}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
