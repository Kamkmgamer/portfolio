"use client";

import React, { useState } from "react";
import { createProject, updateProject, deleteProject, createDemo, updateDemo, deleteDemo } from "@/app/actions/admin";
import { Project, Demo } from "@prisma/client";
import { UploadButton } from "@/utils/uploadthing";

interface AdminDashboardProps {
    initialProjects: Project[];
    initialDemos: Demo[];
}

export default function AdminDashboard({ initialProjects, initialDemos }: AdminDashboardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState<"projects" | "demos">("projects");
    const [projects, setProjects] = useState(initialProjects);
    const [demos, setDemos] = useState(initialDemos);

    const [editingItem, setEditingItem] = useState<any>(null);

    // Standalone quick upload states
    const [quickUploadUrl, setQuickUploadUrl] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD)) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Convert tags from string to array if needed
        const dataToSubmit = { ...editingItem };
        if (typeof dataToSubmit.tags === "string") {
            dataToSubmit.tags = dataToSubmit.tags.split(",").map((t: string) => t.trim());
        }

        try {
            if (activeTab === "projects") {
                if (editingItem.id) {
                    await updateProject(editingItem.id, dataToSubmit);
                    setProjects(projects.map(p => p.id === editingItem.id ? dataToSubmit : p));
                } else {
                    const newProject = await createProject(dataToSubmit);
                    setProjects([newProject, ...projects]);
                }
            } else {
                if (editingItem.id) {
                    await updateDemo(editingItem.id, dataToSubmit);
                    setDemos(demos.map(d => d.id === editingItem.id ? dataToSubmit : d));
                } else {
                    const newDemo = await createDemo(dataToSubmit);
                    setDemos([newDemo, ...demos]);
                }
            }
            setEditingItem(null);
        } catch (error) {
            console.error(error);
            alert("Operation failed");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            if (activeTab === "projects") {
                await deleteProject(id);
                setProjects(projects.filter(p => p.id !== id));
            } else {
                await deleteDemo(id);
                setDemos(demos.filter(d => d.id !== id));
            }
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 border border-text/10 bg-secondary/10">
                <h2 className="text-2xl mb-6 font-display">Admin Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 bg-transparent border border-text/20 focus:border-[hsl(var(--accent-gold))] min-w-full outline-none"
                    />
                    <button type="submit" className="p-3 bg-[hsl(var(--accent-gold))] text-black font-bold uppercase tracking-widest">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    const currentList = activeTab === "projects" ? projects : demos;

    return (
        <div>
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => { setActiveTab("projects"); setEditingItem(null); }}
                    className={`px-6 py-2 uppercase tracking-widest text-sm border transition-colors ${activeTab === "projects" ? "border-[hsl(var(--accent-gold))] text-[hsl(var(--accent-gold))]" : "border-text/10 text-text/50"}`}
                >
                    Projects
                </button>
                <button
                    onClick={() => { setActiveTab("demos"); setEditingItem(null); }}
                    className={`px-6 py-2 uppercase tracking-widest text-sm border transition-colors ${activeTab === "demos" ? "border-[hsl(var(--accent-gold))] text-[hsl(var(--accent-gold))]" : "border-text/10 text-text/50"}`}
                >
                    Demos
                </button>
            </div>

            <div className="mb-10 p-6 border border-text/10 bg-secondary/5">
                <h2 className="text-xl mb-4 font-display flex items-center gap-2">
                    Quick Media Upload
                </h2>
                <p className="text-sm text-text/60 mb-4">
                    Upload any image or video here to get a direct URL (without attaching it to a project/demo).
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="min-w-[150px]">
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res && res.length > 0) {
                                    setQuickUploadUrl(res[0].url);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`Upload failed: ${error.message}`);
                            }}
                            appearance={{
                                button: "bg-[hsl(var(--accent-gold))] hover:opacity-90 text-black font-bold uppercase tracking-widest text-sm px-6 py-3 border-none ring-0 w-auto",
                                allowedContent: "hidden"
                            }}
                        />
                    </div>

                    {quickUploadUrl && (
                        <div className="flex-1 min-w-[300px] flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={quickUploadUrl}
                                className="w-full p-3 bg-transparent border border-[hsl(var(--accent-gold))]/30 focus:border-[hsl(var(--accent-gold))] text-[hsl(var(--accent-gold))] outline-none text-sm"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.origin + quickUploadUrl);
                                    alert("Copied full URL to clipboard!");
                                }}
                                className="px-6 py-3 border border-[hsl(var(--accent-gold))]/30 hover:bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] uppercase tracking-widest text-xs transition-colors whitespace-nowrap"
                            >
                                Copy URL
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {editingItem ? (
                <div className="border border-text/10 p-6 bg-secondary/5 mb-8">
                    <h2 className="text-2xl mb-6 font-display">{editingItem.id ? 'Edit' : 'Create'} {activeTab === "projects" ? "Project" : "Demo"}</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-text/60 mb-1">Title</label>
                            <input required type="text" value={editingItem.title || ""} onChange={e => setEditingItem({ ...editingItem, title: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm text-text/60 mb-1">Description</label>
                            <textarea required value={editingItem.description || ""} onChange={e => setEditingItem({ ...editingItem, description: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none h-24" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="block text-sm text-text/60 mb-1">Image URL (or upload)</label>
                                <input type="text" value={editingItem.image || ""} onChange={e => setEditingItem({ ...editingItem, image: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none mb-2" />
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        if (res && res.length > 0) setEditingItem({ ...editingItem, image: res[0].url });
                                    }}
                                    onUploadError={(error: Error) => alert(`Error: ${error.message}`)}
                                    appearance={{ button: "text-xs w-auto bg-text/10 text-text px-4 py-2 hover:bg-[hsl(var(--accent-gold))] hover:text-black transition-colors" }}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="block text-sm text-text/60 mb-1">Video URL (or upload) - Optional</label>
                                <input type="text" value={editingItem.video || ""} onChange={e => setEditingItem({ ...editingItem, video: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none mb-2" />
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        if (res && res.length > 0) setEditingItem({ ...editingItem, video: res[0].url });
                                    }}
                                    onUploadError={(error: Error) => alert(`Error: ${error.message}`)}
                                    appearance={{ button: "text-xs w-auto bg-text/10 text-text px-4 py-2 hover:bg-[hsl(var(--accent-gold))] hover:text-black transition-colors" }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-text/60 mb-1">Tags (comma separated)</label>
                            <input required type="text" value={Array.isArray(editingItem.tags) ? editingItem.tags.join(", ") : (editingItem.tags || "")} onChange={e => setEditingItem({ ...editingItem, tags: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Category</label>
                                <input required type="text" value={editingItem.category || "Web Design"} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Gradient Classes</label>
                                <input required type="text" value={editingItem.gradient || "from-cyan-500 via-emerald-500 to-red-500"} onChange={e => setEditingItem({ ...editingItem, gradient: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text/60 mb-1">Demo URL (optional)</label>
                                <input type="text" value={editingItem.demo || ""} onChange={e => setEditingItem({ ...editingItem, demo: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-text/60 mb-1">GitHub URL (optional)</label>
                                <input type="text" value={editingItem.github || ""} onChange={e => setEditingItem({ ...editingItem, github: e.target.value })} className="w-full p-2 bg-transparent border border-text/20 focus:border-text/40 outline-none" />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button type="submit" className="px-6 py-2 bg-[hsl(var(--accent-gold))] text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                                Save
                            </button>
                            <button type="button" onClick={() => setEditingItem(null)} className="px-6 py-2 border border-text/10 hover:border-text/30 uppercase tracking-widest text-sm transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setEditingItem({})}
                        className="mb-6 px-6 py-3 bg-text/5 border border-text/10 hover:border-text/30 transition-colors uppercase tracking-widest text-sm flex items-center gap-2"
                    >
                        + Add New {activeTab === "projects" ? "Project" : "Demo"}
                    </button>

                    <div className="grid gap-4">
                        {currentList.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center p-4 border border-text/10 bg-secondary/5 group hover:border-[hsl(var(--accent-gold))]/30 transition-colors">
                                <div>
                                    <h3 className="text-xl font-display">{item.title}</h3>
                                    <p className="text-xs text-text/50 mt-1">{item.category}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingItem(item)} className="px-4 py-2 border border-text/10 group-hover:border-[hsl(var(--accent-gold))]/30 hover:bg-[hsl(var(--accent-gold))]/10 text-text/70 group-hover:text-[hsl(var(--accent-gold))] uppercase tracking-widest text-xs transition-colors">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="px-4 py-2 border border-red-500/30 hover:bg-red-500/10 text-red-500 uppercase tracking-widest text-xs transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {currentList.length === 0 && (
                            <p className="text-text/50 py-8 text-center italic">No items found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
