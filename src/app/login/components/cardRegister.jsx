"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import Spinner from "@/components/spinner";
import { useState } from "react";

export default function CardLogin(props) {
  //? Estados inputs
  const [nameR, setNameR] = useState("");
  const [emailR, setEmailR] = useState("");
  const [senhaR, setSenhaR] = useState("");
  //? Estados error inputs 
  const [error, setError] = useState("");
  //? Estados loading da api
  const [loading, setLoading] = useState(false);


  async function ValidateAndPost(e) {
    e.preventDefault();

    const nome = nameR.trim();
    const senha = senhaR.trim();

    if (!nome || !senha || !emailR) {
      setLoading(false);
      setError("Preencha os campos");
      return;
    }

    if (nome.length < 5) {
      setLoading(false);
      setError("O nome deve conter pelo menos 5 caracteres.");
      return;
    }

    if (senha.length < 6) {
      setLoading(false);
      setError("A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    if (!emailR.includes("@") || !emailR.includes(".")) {
      setLoading(false);
      setError("Digite um email válido.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/cadastrar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameR, email: emailR, senha: senhaR })
      });

      if (res.ok) {
        setNameR("");
        setEmailR("");
        setSenhaR("");
        window.location.href = "/dashboard";
      } else {
        const data = await res.json();
        setError(data.message || "Erro ao cadastrar");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError("Erro interno. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }






  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <div className="w-24 h-18 m-auto">
          <img src="/mostblack.webp" alt="logo" className="w-full h-full" />
        </div>
        <hr />
        <CardDescription className="text-center">
          {props.logotitle}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="grid w-full items-center gap-4">
          {/* Nome */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input
              value={nameR}
              onChange={(e) => setNameR(e.target.value)}
              type="text"
              placeholder="Seu nome"
              maxLength={18}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              value={emailR}
              onChange={e => setEmailR(e.target.value)}
              type="email"
              placeholder="Seu melhor E-mail"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              value={senhaR}
              onChange={e => setSenhaR(e.target.value)}
              type="password"
              placeholder="Sua melhor senha"
            />
          </div>
          <p className="text-xs text-red-500 text-center">{error}</p>

          <Button onClick={ValidateAndPost} className="w-full">
            {loading ? <Spinner /> : "Registrar"}
          </Button>
        </form>
      </CardContent>

      <BorderBeam
        duration={4}
        size={300}
        reverse
        className="from-transparent via-black to-transparent"
      />
    </Card>
  );
}
