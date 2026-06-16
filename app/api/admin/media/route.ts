import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "24");
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.media.findMany({ orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.media.count(),
  ]);

  return NextResponse.json({ data, total, page, limit });
}
