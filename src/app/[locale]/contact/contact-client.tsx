"use client";

import { AlertCircle, Check, CheckCircle2, Copy } from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/data/site";
import { ArrowForward } from "@/components/site/icons";
import { cn } from "@/lib/utils";

type FormDict = Dictionary["contact"]["form"];
type Field = "name" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE = 20;
const EMPTY: Values = { name: "", email: "", message: "" };

function validate(values: Values, t: FormDict): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = t.nameRequired;
  if (!EMAIL_RE.test(values.email.trim())) errors.email = t.emailInvalid;
  if (values.message.trim().length < MIN_MESSAGE) errors.message = t.messageShort;
  return errors;
}

export function ContactForm({ t }: { t: FormDict }) {
  const id = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field;
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validate(next, t)[field] }));
    if (status === "error") setStatus("idle");
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as Field;
    if (!values[field]) return; // don't scold an untouched, empty field on tab-through
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(values, t)[field] }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values, t);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    const first = (Object.keys(refs) as Field[]).find((f) => found[f]);
    if (first) {
      refs[first].current?.focus();
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
    requestAnimationFrame(() => refs.name.current?.focus());
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="card flex min-h-[28rem] flex-col items-start justify-center p-8 outline-none md:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-success-soft text-success">
          <CheckCircle2 aria-hidden="true" className="size-6" strokeWidth={1.75} />
        </span>
        <h2 className="text-h3 mt-6">{t.successTitle}</h2>
        <p className="mt-3 max-w-[40ch] text-ink-2">{t.success}</p>
        <button type="button" onClick={reset} className="btn btn-secondary mt-8">
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const busy = status === "loading";
  const fieldProps = (field: Field, hint?: boolean) => {
    const err = errors[field];
    const describedBy = [hint ? `${id}-${field}-hint` : null, err ? `${id}-${field}-error` : null]
      .filter(Boolean)
      .join(" ");
    return {
      id: `${id}-${field}`,
      name: field,
      value: values[field],
      onChange,
      onBlur,
      disabled: busy,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": describedBy || undefined,
      className: "input",
    } as const;
  };
  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="field-error">
        <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={busy} aria-labelledby={`${id}-title`} className="card p-6 md:p-10">
      <h2 id={`${id}-title`} className="text-h3">
        {t.title}
      </h2>

      {status === "error" && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="alert alert-danger mt-6 outline-none">
          <AlertCircle aria-hidden="true" />
          <div>
            <p className="font-semibold">{t.errorTitle}</p>
            <p className="mt-1 text-ink-2">
              {t.errorHint}{" "}
              <a href={`mailto:${site.email}`} className="link font-medium">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            {t.name}
          </label>
          <input ref={refs.name} type="text" autoComplete="name" placeholder={t.namePlaceholder} {...fieldProps("name")} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            {t.email}
          </label>
          <input
            ref={refs.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            placeholder={t.emailPlaceholder}
            {...fieldProps("email")}
          />
          {errorText("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="field-label">
            {t.message}
          </label>
          <textarea ref={refs.message} rows={7} placeholder={t.messagePlaceholder} {...fieldProps("message", true)} />
          {errors.message ? (
            errorText("message")
          ) : (
            <p id={`${id}-message-hint`} className="field-hint">
              {t.messageHint}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn btn-primary btn-lg min-w-[11rem]">
          {busy ? (
            <>
              <span className="spinner" aria-hidden="true" />
              {t.sending}
            </>
          ) : (
            <>
              {t.send}
              <ArrowForward />
            </>
          )}
        </button>
        <span aria-live="polite" className="sr-only">
          {busy ? t.sending : ""}
        </span>
      </div>
    </form>
  );
}

export function CopyEmail({ label, copiedLabel, ariaLabel }: { label: string; copiedLabel: string; ariaLabel: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={cn("btn btn-secondary btn-sm", copied && "text-success")}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" strokeWidth={1.75} />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
