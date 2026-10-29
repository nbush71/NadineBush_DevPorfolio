"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-[15px] placeholder:text-muted focus:border-accent";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setStatus("idle");
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const formData = new FormData(form);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-labelledby="contact-title"
      className="m-auto w-[min(92vw,32rem)] rounded-lg border border-line bg-card p-0 text-ink backdrop:bg-black/50"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="contact-title" className="text-2xl font-semibold">
            {status === "sent" ? "Message sent" : "Have a project in mind?"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="rounded-md px-2 py-1 text-xl leading-none text-muted hover:text-ink">×</button>
        </div>

        {status === "sent" ? (
          <div className="mt-4 space-y-4" role="status">
            <p className="leading-7">Thanks for reaching out. I&apos;ll reply to your email soon.</p>
            <button onClick={onClose} className="rounded-md bg-accent px-5 py-2 font-medium text-on-accent hover:brightness-110">Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <p className="text-muted">Send me a message. I&apos;m open to new opportunities.</p>
            <label className="block">Name
              <input name="name" required maxLength={100} autoComplete="name" className={field} />
            </label>
            <label className="block">Email
              <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
            </label>
            <label className="block">Message
              <textarea name="message" required minLength={10} maxLength={3000} rows={5} className={field} />
            </label>
            <div className="hidden" aria-hidden="true">
              <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {status === "error" && <p role="alert" className="font-medium text-accent">{error}</p>}
            <button
              type="submit" disabled={status === "sending"}
              className="rounded-md bg-accent px-5 py-2 font-medium text-on-accent hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
