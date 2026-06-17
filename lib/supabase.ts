import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Service-role client — bypasses RLS, used in API routes only (server-side)
export const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Anon client — respects RLS, used in public server components
export const supabasePublic = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// ── Field-name mappers (Supabase snake_case → Prisma-compatible camelCase) ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPost(p: any) {
  if (!p) return null;
  return {
    ...p,
    featuredImage:   p.featured_image,
    publishedAt:     p.published_at,
    scheduledAt:     p.scheduled_at,
    metaTitle:       p.meta_title,
    metaDescription: p.meta_description,
    noIndex:         p.no_index,
    noFollow:        p.no_follow,
    ogTitle:         p.og_title,
    ogDescription:   p.og_description,
    ogImage:         p.og_image,
    readingTime:     p.reading_time,
    authorId:        p.author_id,
    categoryId:      p.category_id,
    createdAt:       p.created_at,
    updatedAt:       p.updated_at,
    // nested relations
    author:   p.author   ?? null,
    category: p.category ?? null,
    tags: (p.post_tags ?? []).map((pt: any) => ({ tag: pt.tags })),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDemo(d: any) {
  if (!d) return null;
  return {
    ...d,
    firstName:   d.first_name,
    lastName:    d.last_name,
    jobTitle:    d.job_title,
    companySize: d.company_size,
    createdAt:   d.created_at,
    updatedAt:   d.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapMedia(m: any) {
  if (!m) return null;
  return { ...m, publicId: m.public_id, createdAt: m.created_at };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCategory(c: any) {
  if (!c) return null;
  return { ...c, createdAt: c.created_at };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapTag(t: any) {
  if (!t) return null;
  return { ...t, _count: { posts: t.post_tags?.[0]?.count ?? 0 }, createdAt: t.created_at };
}
