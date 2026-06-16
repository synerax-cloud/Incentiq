import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [
      totalDemoRequests,
      newDemoRequests,
      totalPosts,
      publishedPosts,
      totalMedia,
      recentDemos,
    ] = await Promise.all([
      prisma.demoRequest.count(),
      prisma.demoRequest.count({ where: { status: "NEW" } }),
      prisma.post.count(),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.media.count(),
      prisma.demoRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      totalDemoRequests,
      newDemoRequests,
      totalPosts,
      publishedPosts,
      totalMedia,
      recentDemos,
    });
  } catch (err) {
    console.error("[stats]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
