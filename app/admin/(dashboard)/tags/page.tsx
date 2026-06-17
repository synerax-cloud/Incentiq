"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/admin/Header";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface Tag { id: string; name: string; slug: string; _count?: { posts: number }; }

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);

  async function fetchTags() {
    const res = await fetch("/api/admin/tags");
    if (res.ok) setTags(await res.json());
  }

  useEffect(() => { fetchTags(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    await fetch("/api/admin/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    await fetchTags();
    setAdding(false);
  }

  return (
    <div className="flex flex-col">
      <Header title="Tags" />
      <div className="p-6 space-y-6">
        <form onSubmit={handleAdd} className="flex gap-3 max-w-md">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New tag name"
          />
          <button
            type="submit"
            disabled={adding || !name.trim()}
            className="flex items-center gap-2 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-white hover:bg-dark-green disabled:opacity-60 transition-colors shrink-0 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {tags.length === 0 && <p className="text-sm text-slate">No tags yet.</p>}
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="group flex items-center gap-1.5 rounded-full border border-light-gray bg-white px-3 py-1.5 text-sm text-dark-green shadow-sm hover:border-light-gray transition-colors"
            >
              <span>{tag.name}</span>
              <span className="text-xs text-slate">({tag._count?.posts ?? 0})</span>
              <button className="ml-1 rounded-full opacity-0 group-hover:opacity-100 text-slate hover:text-red transition-all">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
