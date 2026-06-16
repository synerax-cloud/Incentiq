"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/admin/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Category { id: string; name: string; slug: string; description?: string | null; _count?: { posts: number }; }

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);

  async function fetchCategories() {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  }

  useEffect(() => { fetchCategories(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setName(""); setDescription("");
    await fetchCategories();
    setAdding(false);
  }

  return (
    <div className="flex flex-col">
      <Header title="Categories" />
      <div className="p-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* Add form */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm h-fit">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Add New Category</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Incentive Plans" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional" />
            </div>
            <button
              type="submit"
              disabled={adding || !name.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2B4A7F] py-2 text-sm font-semibold text-white hover:bg-[#1b3a6e] disabled:opacity-60 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </button>
          </form>
        </div>

        {/* List */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
            <p className="text-sm font-semibold text-gray-700">{categories.length} categories</p>
          </div>
          <div className="divide-y divide-gray-100">
            {categories.length === 0 && (
              <p className="px-5 py-10 text-center text-sm text-gray-400">No categories yet.</p>
            )}
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-500">/{cat.slug} · {cat._count?.posts ?? 0} posts</p>
                  {cat.description && <p className="text-xs text-gray-500 mt-0.5">{cat.description}</p>}
                </div>
                <button className="rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
