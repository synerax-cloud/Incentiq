import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase, mapMedia } from "@/lib/supabase";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await uploadToCloudinary(base64, "incentnow/media");

  const { data, error } = await supabase
    .from("media")
    .insert({
      name:      file.name,
      url:       result.url,
      public_id: result.publicId,
      format:    result.format,
      width:     result.width,
      height:    result.height,
      size:      result.size,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(mapMedia(data), { status: 201 });
}
