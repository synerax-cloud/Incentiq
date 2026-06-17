import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: media, error: findErr } = await supabase
    .from("media")
    .select("public_id")
    .eq("id", params.id)
    .single();

  if (findErr || !media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteFromCloudinary(media.public_id);

  const { error } = await supabase.from("media").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
