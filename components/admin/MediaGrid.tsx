"use client";

import { useState } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface MediaGridProps {
  items: MediaItem[];
  onDelete: (id: string) => void;
  onSelect?: (url: string) => void;
  selectable?: boolean;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function MediaGrid({ items, onDelete, onSelect, selectable }: MediaGridProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!items.length) {
    return (
      <div className="flex h-48 flex-col items-center justify-center text-slate">
        <p className="text-sm">No media files uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect?.(item.url)}
          className={cn(
            "group relative overflow-hidden rounded-lg border border-light-gray bg-light-gray/30 transition-all",
            selectable && "cursor-pointer hover:border-green hover:shadow-soft"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.url} alt={item.name} className="h-32 w-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-2 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100">
            <div className="flex justify-end gap-1">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); copyUrl(item.url); }}
                className="rounded-md bg-white/90 p-1.5 text-dark-green hover:bg-white transition-colors shadow-sm"
              >
                {copied === item.url ? <Check className="h-3 w-3 text-green" /> : <Copy className="h-3 w-3" />}
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                className="rounded-md bg-red p-1.5 text-white hover:bg-red/80 transition-colors shadow-sm"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
            <div>
              <p className="truncate text-xs font-medium text-white">{item.name}</p>
              <p className="text-[10px] text-white/70">
                {item.width}×{item.height} · {formatBytes(item.size)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
