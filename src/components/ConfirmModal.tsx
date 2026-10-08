import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-message"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl focus:outline-none"
      >
        <h2 id="confirm-modal-title" className="text-lg font-bold text-slate-900">
          {title}
        </h2>
        <p id="confirm-modal-message" className="mt-2 text-sm text-slate-600">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
