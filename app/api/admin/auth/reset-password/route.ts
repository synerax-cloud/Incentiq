import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return the same response to avoid leaking whether email exists
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
