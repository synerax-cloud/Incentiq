import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase, mapDemo } from "@/lib/supabase";
import { demoRequestSchema } from "@/lib/validations/demo";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search") || "";
  const page  = parseInt(searchParams.get("page")  || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const from  = (page - 1) * limit;
  const to    = from + limit - 1;

  let query = supabase
    .from("demo_requests")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (status) query = query.eq("status", status);
  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
    );
  }

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: (data ?? []).map(mapDemo), total: count ?? 0, page, limit });
}

export async function POST(req: NextRequest) {
  const body   = await req.json();
  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const d = parsed.data;
  const { data, error } = await supabase
    .from("demo_requests")
    .insert({
      first_name:   d.firstName,
      last_name:    d.lastName,
      email:        d.email,
      phone:        d.phone,
      company:      d.company,
      job_title:    d.jobTitle,
      country:      d.country,
      company_size: d.companySize,
      message:      d.message,
      source:       d.source ?? "website",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(mapDemo(data), { status: 201 });
}
