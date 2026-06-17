import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase, mapDemo } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [
      { count: totalDemoRequests },
      { count: newDemoRequests },
      { count: totalPosts },
      { count: publishedPosts },
      { count: totalMedia },
      { data: recentDemosRaw },
    ] = await Promise.all([
      supabase.from("demo_requests").select("*", { count: "exact", head: true }),
      supabase.from("demo_requests").select("*", { count: "exact", head: true }).eq("status", "NEW"),
      supabase.from("posts").select("*", { count: "exact", head: true }),
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "PUBLISHED"),
      supabase.from("media").select("*", { count: "exact", head: true }),
      supabase.from("demo_requests").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    return NextResponse.json({
      totalDemoRequests,
      newDemoRequests,
      totalPosts,
      publishedPosts,
      totalMedia,
      recentDemos: (recentDemosRaw ?? []).map(mapDemo),
    });
  } catch (err) {
    console.error("[stats]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
