import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogSchema } from "@/lib/validations/blog";
import { calculateReadingTime } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: true, category: true, tags: { include: { tag: true } } },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tagIds, ...postData } = parsed.data;
  const readingTime = calculateReadingTime(postData.content);

  // Delete existing tags then recreate
  await prisma.postTag.deleteMany({ where: { postId: params.id } });

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...postData,
      readingTime,
      publishedAt: postData.publishedAt ? new Date(postData.publishedAt) : null,
      scheduledAt: postData.scheduledAt ? new Date(postData.scheduledAt) : null,
      ...(tagIds?.length
        ? { tags: { create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })) } }
        : {}),
    },
    include: { author: true, category: true, tags: { include: { tag: true } } },
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
