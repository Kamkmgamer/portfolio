/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useId, useState } from "react";
import { AlertCircle, Check, CheckCircle2, Copy, Lock, Pencil, Plus, Trash2 } from "lucide-react";
import {
  createProject,
  updateProject,
  deleteProject,
  createDemo,
  updateDemo,
  deleteDemo,
  verifyAdminPassword,
} from "@/app/actions/admin";
import { Project, Demo } from "@prisma/client";
import { UploadButton } from "@/utils/uploadthing";
import { cn } from "@/lib/utils";

interface AdminDashboardProps {
  initialProjects: Project[];
  initialDemos: Demo[];
}

type Tab = "projects" | "demos";
type Notice = { tone: "success" | "danger"; text: string } | null;

const NEW_ITEM = { category: "Web Design", gradient: "", tags: [] as string[] };

const uploadAppearance = {
  button:
    "btn btn-secondary btn-sm !h-9 !w-auto !bg-card !text-ink ring-0 focus-within:ring-2 focus-within:ring-accent after:bg-accent",
  allowedContent: "hidden",
};

function Field({
  label,
  children,
  className,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AdminDashboard({ initialProjects, initialDemos }: AdminDashboardProps) {
  const id = useId();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [demos, setDemos] = useState(initialDemos);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [quickUploadUrl, setQuickUploadUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setLoginError("");
    try {
      const isValid = await verifyAdminPassword(password);
      if (isValid) setIsAuthenticated(true);
      else setLoginError("Incorrect password.");
    } catch (error) {
      console.error(error);
      setLoginError("Couldn't verify the password. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit = { ...editingItem };
    if (typeof dataToSubmit.tags === "string") {
      dataToSubmit.tags = dataToSubmit.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    setIsSaving(true);
    try {
      if (activeTab === "projects") {
        if (editingItem.id) {
          await updateProject(editingItem.id, dataToSubmit);
          setProjects(projects.map((p) => (p.id === editingItem.id ? dataToSubmit : p)));
        } else {
          const newProject = await createProject(dataToSubmit);
          setProjects([newProject, ...projects]);
        }
      } else if (editingItem.id) {
        await updateDemo(editingItem.id, dataToSubmit);
        setDemos(demos.map((d) => (d.id === editingItem.id ? dataToSubmit : d)));
      } else {
        const newDemo = await createDemo(dataToSubmit);
        setDemos([newDemo, ...demos]);
      }
      setEditingItem(null);
      setNotice({ tone: "success", text: "Saved." });
    } catch (error) {
      console.error(error);
      setNotice({ tone: "danger", text: "Save failed. Check the required fields and try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (itemId: number, title: string) => {
    if (!confirm(`Delete “${title}”? This can't be undone.`)) return;
    try {
      if (activeTab === "projects") {
        await deleteProject(itemId);
        setProjects(projects.filter((p) => p.id !== itemId));
      } else {
        await deleteDemo(itemId);
        setDemos(demos.filter((d) => d.id !== itemId));
      }
      setNotice({ tone: "success", text: "Deleted." });
    } catch (error) {
      console.error(error);
      setNotice({ tone: "danger", text: "Delete failed." });
    }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditingItem({ ...editingItem, [key]: e.target.value });

  if (!isAuthenticated) {
    return (
      <div className="card mx-auto mt-6 w-full max-w-md p-8">
        <span className="grid size-11 place-items-center rounded-full bg-paper-2 text-ink-2">
          <Lock aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        <h2 className="text-h3 mt-5">Sign in</h2>
        <p className="mt-2 text-sm text-muted">Enter the admin password to manage projects and demos.</p>
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor={`${id}-pw`} className="field-label">
              Password
            </label>
            <input
              id={`${id}-pw`}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              disabled={isVerifying}
              aria-invalid={loginError ? true : undefined}
              aria-describedby={loginError ? `${id}-pw-error` : undefined}
            />
            {loginError && (
              <p id={`${id}-pw-error`} className="field-error">
                <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
                {loginError}
              </p>
            )}
          </div>
          <button disabled={isVerifying || !password} type="submit" className="btn btn-primary w-full">
            {isVerifying && <span className="spinner" aria-hidden="true" />}
            {isVerifying ? "Verifying…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  const currentList = activeTab === "projects" ? projects : demos;
  const noun = activeTab === "projects" ? "project" : "demo";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Content type" className="inline-flex rounded-full border border-line bg-card p-1">
          {(["projects", "demos"] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => {
                setActiveTab(tab);
                setEditingItem(null);
              }}
              className={cn(
                "h-9 rounded-full px-4 text-sm font-medium capitalize transition-colors",
                activeTab === tab ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {tab}
              <span className="ms-2 tabular opacity-70">{tab === "projects" ? projects.length : demos.length}</span>
            </button>
          ))}
        </div>
        {!editingItem && (
          <button onClick={() => setEditingItem({ ...NEW_ITEM })} className="btn btn-primary btn-sm">
            <Plus aria-hidden="true" />
            New {noun}
          </button>
        )}
      </div>

      <div aria-live="polite" className="mt-6 empty:hidden">
        {notice && (
          <div className={cn("alert", notice.tone === "success" ? "alert-success" : "alert-danger")}>
            {notice.tone === "success" ? <CheckCircle2 aria-hidden="true" /> : <AlertCircle aria-hidden="true" />}
            <p>{notice.text}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {editingItem ? (
            <form onSubmit={handleSubmit} className="card p-6 md:p-8">
              <h2 className="text-h3">
                {editingItem.id ? "Edit" : "New"} {noun}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Title" htmlFor={`${id}-title`} className="sm:col-span-2">
                  <input id={`${id}-title`} required type="text" value={editingItem.title || ""} onChange={set("title")} className="input" />
                </Field>
                <Field label="Description" htmlFor={`${id}-desc`} className="sm:col-span-2">
                  <textarea id={`${id}-desc`} required rows={4} value={editingItem.description || ""} onChange={set("description")} className="input" />
                </Field>
                <Field label="Image URL" htmlFor={`${id}-image`}>
                  <input id={`${id}-image`} required type="text" dir="ltr" value={editingItem.image || ""} onChange={set("image")} className="input" />
                  <div className="mt-2">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) setEditingItem({ ...editingItem, image: res[0].url });
                      }}
                      onUploadError={(error: Error) => setNotice({ tone: "danger", text: `Upload failed: ${error.message}` })}
                      appearance={uploadAppearance}
                    />
                  </div>
                </Field>
                <Field label="Video URL (optional)" htmlFor={`${id}-video`}>
                  <input id={`${id}-video`} type="text" dir="ltr" value={editingItem.video || ""} onChange={set("video")} className="input" />
                  <div className="mt-2">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) setEditingItem({ ...editingItem, video: res[0].url });
                      }}
                      onUploadError={(error: Error) => setNotice({ tone: "danger", text: `Upload failed: ${error.message}` })}
                      appearance={uploadAppearance}
                    />
                  </div>
                </Field>
                <Field label="Tags (comma separated)" htmlFor={`${id}-tags`}>
                  <input
                    id={`${id}-tags`}
                    required
                    type="text"
                    value={Array.isArray(editingItem.tags) ? editingItem.tags.join(", ") : editingItem.tags || ""}
                    onChange={set("tags")}
                    className="input"
                  />
                </Field>
                <Field label="Category" htmlFor={`${id}-cat`}>
                  <input id={`${id}-cat`} required type="text" value={editingItem.category || ""} onChange={set("category")} className="input" />
                </Field>
                <Field label="Live URL (optional)" htmlFor={`${id}-demo`}>
                  <input id={`${id}-demo`} type="url" dir="ltr" value={editingItem.demo || ""} onChange={set("demo")} className="input" />
                </Field>
                <Field label="GitHub URL (optional)" htmlFor={`${id}-gh`}>
                  <input id={`${id}-gh`} type="url" dir="ltr" value={editingItem.github || ""} onChange={set("github")} className="input" />
                </Field>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                <button type="submit" disabled={isSaving} className="btn btn-primary">
                  {isSaving && <span className="spinner" aria-hidden="true" />}
                  {isSaving ? "Saving…" : "Save"}
                </button>
                <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost">
                  Cancel
                </button>
              </div>
            </form>
          ) : currentList.length === 0 ? (
            <div className="card flex flex-col items-center px-6 py-16 text-center">
              <p className="text-h3">No {activeTab} yet</p>
              <p className="mt-2 text-sm text-muted">Create the first {noun} to see it listed here.</p>
            </div>
          ) : (
            <ul className="card divide-y divide-line overflow-hidden">
              {currentList.map((item: any) => (
                <li key={item.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-paper-2/60">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt="" className="hidden size-12 shrink-0 rounded-lg border border-line object-cover sm:block" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold">{item.title}</h3>
                    <p className="mt-0.5 truncate text-sm text-muted">{item.category}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button onClick={() => setEditingItem(item)} className="btn btn-ghost btn-sm" aria-label={`Edit ${item.title}`}>
                      <Pencil aria-hidden="true" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="btn btn-ghost btn-sm text-danger hover:!bg-danger-soft"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 aria-hidden="true" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="card p-6">
            <h2 className="font-semibold">Quick upload</h2>
            <p className="mt-1.5 text-sm text-muted">Upload an image or video to get a direct URL without attaching it to anything.</p>
            <div className="mt-4">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0) setQuickUploadUrl(res[0].url);
                }}
                onUploadError={(error: Error) => setNotice({ tone: "danger", text: `Upload failed: ${error.message}` })}
                appearance={uploadAppearance}
              />
            </div>
            {quickUploadUrl && (
              <div className="mt-4 flex items-center gap-2">
                <input type="text" readOnly dir="ltr" value={quickUploadUrl} aria-label="Uploaded file URL" className="input !h-9 text-sm" />
                <button
                  onClick={() => {
                    const url = quickUploadUrl.startsWith("http") ? quickUploadUrl : window.location.origin + quickUploadUrl;
                    navigator.clipboard.writeText(url).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    });
                  }}
                  className="btn btn-secondary btn-sm shrink-0"
                >
                  {copied ? <Check aria-hidden="true" className="text-success" /> : <Copy aria-hidden="true" />}
                  <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
