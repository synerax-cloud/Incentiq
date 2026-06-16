"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/admin/Header";
import { MediaGrid } from "@/components/admin/MediaGrid";
import { Upload, Loader2 } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  format: string;
  width: number;
  height: number;
  size: number;
  createdAt: string;
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function fetchMedia() {
    const res = await fetch("/api/admin/media");
    if (res.ok) {
      const data = await res.json();
      setItems(data.data);
      setTotal(data.total);
    }
  }

  useEffect(() => { fetchMedia(); }, []);

  async function handleUpload(files: FileList) {
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      await fetch("/api/admin/upload", { method: "POST", body: formData });
    }
    await fetchMedia();
    setUploading(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/media/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    await fetchMedia();
  }

  return (
    <div className="flex flex-col">
      <Header title="Media Library" />
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{total} files uploaded</p>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-[#2B4A7F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1b3a6e] disabled:opacity-60 transition-colors shadow-sm"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload files"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
          />
        </div>

        <MediaGrid items={items} onDelete={(id) => setDeleteId(id)} />
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this file from Cloudinary and the database. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
