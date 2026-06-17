import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, password")
      .eq("id", session.user.id)
      .single();

    if (error || !user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });

    const hashed = await bcrypt.hash(newPassword, 12);
    await supabase.from("users").update({ password: hashed }).eq("id", user.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
