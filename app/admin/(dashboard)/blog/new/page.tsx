"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, type BlogInput } from "@/lib/validations/blog";
import { Header } from "@/components/admin/Header";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface Category { id: string; name: string; }
interface Tag { id: string; name: string; }

export default function NewBlogPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogInput>({
    resolver: zodResolver(blogSchema),
    defaultValues: { status: "DRAFT", noIndex: false, noFollow: false, content: "" },
  });

  const title = watch("title");
  useEffect(() => { if (title) setValue("slug", slugify(title)); }, [title, setValue]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/categories").then((r) => r.ok ? r.json() : []),
      fetch("/api/admin/tags").then((r) => r.ok ? r.json() : []),
    ]).then(([cats, tgs]) => { setCategories(cats); setTags(tgs); });
  }, []);

  const toggleTag = (id: string) =>
    setSelectedTags((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);

  async function onSubmit(data: BlogInput) {
    setSaving(true);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, tagIds: selectedTags }),
    });
    if (res.ok) {
      toast({ title: "Post created!", description: "Your post has been saved." });
      router.push("/admin/blog");
    } else {
      toast({ title: "Error", description: "Failed to create post." });
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col">
      <Header title="New Blog Post" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Action bar */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <Link href="/admin/blog" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#2B4A7F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1b3a6e] disabled:opacity-60 transition-colors shadow-sm"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_280px]">
          {/* Main */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input placeholder="Post title" {...register("title")} className="text-lg" />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Excerpt</Label>
              <Textarea placeholder="Short description…" rows={2} {...register("excerpt")} />
            </div>
            <div className="space-y-1.5">
              <Label>Content</Label>
              <Controller
                control={control}
                name="content"
                render={({ field }) => <BlogEditor content={field.value} onChange={field.onChange} />}
              />
              {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
            </div>

            <Tabs defaultValue="seo">
              <TabsList>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="og">Open Graph</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="seo" className="space-y-3 pt-4">
                <div className="space-y-1.5"><Label>Meta Title</Label><Input {...register("metaTitle")} /></div>
                <div className="space-y-1.5"><Label>Meta Description</Label><Textarea rows={2} {...register("metaDescription")} /></div>
                <div className="space-y-1.5"><Label>Keywords</Label><Input {...register("keywords")} placeholder="keyword1, keyword2" /></div>
                <div className="space-y-1.5"><Label>Canonical URL</Label><Input {...register("canonicalUrl")} placeholder="https://…" /></div>
              </TabsContent>
              <TabsContent value="og" className="space-y-3 pt-4">
                <div className="space-y-1.5"><Label>OG Title</Label><Input {...register("ogTitle")} /></div>
                <div className="space-y-1.5"><Label>OG Description</Label><Textarea rows={2} {...register("ogDescription")} /></div>
                <div className="space-y-1.5"><Label>OG Image URL</Label><Input {...register("ogImage")} placeholder="https://…" /></div>
              </TabsContent>
              <TabsContent value="advanced" className="space-y-3 pt-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div>
                    <p className="text-sm text-gray-800">No Index</p>
                    <p className="text-xs text-gray-500">Prevent search engines from indexing</p>
                  </div>
                  <Controller control={control} name="noIndex" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div>
                    <p className="text-sm text-gray-800">No Follow</p>
                    <p className="text-xs text-gray-500">Prevent link equity passing</p>
                  </div>
                  <Controller control={control} name="noFollow" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800">Featured Image</h3>
              <Controller control={control} name="featuredImage" render={({ field }) => <ImageUpload value={field.value} onChange={field.onChange} />} />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800">Category</h3>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select value={field.value ?? ""} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)} className="transition-all">
                    <Badge variant={selectedTags.includes(tag.id) ? "accent" : "outline"}>{tag.name}</Badge>
                  </button>
                ))}
                {!tags.length && <p className="text-xs text-gray-400">No tags yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
