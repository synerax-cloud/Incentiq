import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();
    if (!email || !newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    // Always return ok to avoid leaking whether email exists
    if (!user) return NextResponse.json({ ok: true });

    const hashed = await bcrypt.hash(newPassword, 12);
    await supabase.from("users").update({ password: hashed }).eq("id", user.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
