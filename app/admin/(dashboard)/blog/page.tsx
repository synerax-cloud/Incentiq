"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/admin/Header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  author: { name: string };
  category?: { name: string } | null;
  readingTime?: number | null;
  createdAt: string;
  publishedAt?: string | null;
}

const STATUS_OPTIONS = ["ALL", "DRAFT", "PUBLISHED", "SCHEDULED"];
const STATUS_COLORS: Record<string, "success" | "warning" | "secondary"> = {
  PUBLISHED: "success",
  DRAFT: "secondary",
  SCHEDULED: "warning",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search, limit: "50" });
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    const res = await fetch(`/api/admin/posts?${params}`);
    if (res.ok) {
      const data = await res.json();
      setPosts(data.data);
      setTotal(data.total);
    }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/posts/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchPosts();
  }

  return (
    <div className="flex flex-col">
      <Header title="Blog Posts" />
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
            <Input
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>{s === "ALL" ? "All statuses" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-white hover:bg-dark-green transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New post
          </Link>
        </div>

        <p className="text-xs text-slate">{total} total posts</p>

        <div className="rounded-xl border border-light-gray bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-light-gray/30 hover:bg-light-gray/30">
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-slate">Loading…</TableCell>
                </TableRow>
              )}
              {!loading && !posts.length && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-slate">No posts yet.</TableCell>
                </TableRow>
              )}
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-dark-green line-clamp-1">{post.title}</p>
                      <p className="text-xs text-slate">/{post.slug}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_COLORS[post.status] ?? "secondary"}>{post.status}</Badge>
                  </TableCell>
                  <TableCell className="text-slate text-sm">{post.category?.name ?? "—"}</TableCell>
                  <TableCell className="text-slate text-sm">{post.author?.name}</TableCell>
                  <TableCell className="text-slate text-xs">
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="rounded-md p-1.5 text-slate hover:bg-light-gray hover:text-dark-green transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setDeleteId(post.id)}
                            className="rounded-md p-1.5 text-slate hover:bg-red/10 hover:text-red transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete &quot;{post.title}&quot;. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
