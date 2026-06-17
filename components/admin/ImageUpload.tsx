"use client";

import { useState, useRef } from "react";
import { Upload, X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  className?: string;
}

export function ImageUpload({ value, onChange, onClear, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUrlSubmit() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg|avif)(\?.*)?$/i.test(trimmed)) {
      setError("Please enter a valid image URL (jpg, png, webp, etc.)");
      return;
    }
    setError("");
    setUrlInput("");
    onChange(trimmed);
  }

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-light-gray bg-light-gray/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded" className="h-48 w-full object-cover" />
          <button
            type="button"
            onClick={() => { onClear?.(); onChange(""); }}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-slate shadow hover:bg-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "flex h-36 w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-light-gray bg-light-gray/30 text-slate transition-colors",
              "hover:border-green hover:text-green",
              uploading && "opacity-60 cursor-not-allowed"
            )}
          >
            {uploading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-green border-t-transparent" />
            ) : (
              <Upload className="h-6 w-6" />
            )}
            <span className="text-sm">{uploading ? "Uploading…" : "Click to upload image"}</span>
            <span className="text-xs">PNG, JPG, WebP up to 5MB</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate">
            <div className="h-px flex-1 bg-light-gray" />
            <span>or paste URL</span>
            <div className="h-px flex-1 bg-light-gray" />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate" />
              <Input
                type="url"
                placeholder="https://res.cloudinary.com/…"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlSubmit())}
                className="pl-8 text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="rounded-lg border border-light-gray bg-white px-3 text-sm font-medium text-dark-green hover:bg-light-gray/30 transition-colors"
            >
              Use
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {error && <p className="text-xs text-red">{error}</p>}
    </div>
  );
}
