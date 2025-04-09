import { NextResponse } from "next/server";
import { signIn } from "../../../../server/user";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    try {
      const data = await signIn({ email, password });
      return NextResponse.json({ ok: true });
    } catch (error: any) {
      // se a lib lançar erro, a gente trata aqui
      if (error.statusCode === 401) {
        return NextResponse.json(
          { message: "Email ou senha incorretos." },
          { status: 401 }
        );
      }

      console.error("Erro inesperado no signIn:", error);
      return NextResponse.json(
        { message: "Erro ao autenticar o usuário." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro geral no login:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
