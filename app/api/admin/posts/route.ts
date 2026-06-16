import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validations/blog";
import { calculateReadingTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const where = {
    ...(status ? { status: status as "DRAFT" | "PUBLISHED" | "SCHEDULED" } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { excerpt: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { author: { select: { id: true, name: true, avatar: true } }, category: true },
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ data, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tagIds, ...postData } = parsed.data;
  const readingTime = calculateReadingTime(postData.content);

  const post = await prisma.post.create({
    data: {
      ...postData,
      readingTime,
      publishedAt: postData.publishedAt ? new Date(postData.publishedAt) : null,
      scheduledAt: postData.scheduledAt ? new Date(postData.scheduledAt) : null,
      authorId: session.user?.id ?? "",
      ...(tagIds?.length
        ? { tags: { create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })) } }
        : {}),
    },
    include: { author: true, category: true, tags: { include: { tag: true } } },
  });

  return NextResponse.json(post, { status: 201 });
}
