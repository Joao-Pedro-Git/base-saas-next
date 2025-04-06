import { signUp } from "../../../../server/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, senha } = await req.json();
  await signUp({ name, email, senha });
  return NextResponse.json({ ok: true });
}
