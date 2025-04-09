"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/magicui/border-beam";
import AuthWithGoogle from "./googleAuth";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

export default function CardLogin(props: any) {
  const [emailE, setEmailE] = useState("");
  const [senhaE, setSenhaE] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loginUser(email: string = emailE, password: string = senhaE) {
    try {
      const res = await fetch("/api/entrar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Erro ao fazer login");
      }

      return data;
    } catch (error) {
      throw error; // repassa para o try/catch acima
    }
  }

  async function ValidateLoginUser(e: any) {
    e.preventDefault();

    if (!emailE || !senhaE) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      setLoading(true);
      await loginUser(emailE, senhaE);

      // Sucesso
      setEmailE("");
      setSenhaE("");
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      setErrorMessage(err.message || "Erro desconhecido");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
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
          <div className="grid w-full items-center gap-4">
            {/* Email */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Seu melhor E-mail"
                value={emailE}
                onChange={(e) => setEmailE(e.target.value)}
              />
            </div>
            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua melhor senha"
                value={senhaE}
                onChange={(e) => setSenhaE(e.target.value)}
              />
            </div>
          </div>
          <p className="text-center text-xs text-red-500 mt-2 mb-[-8px]">
            {errorMessage}
          </p>
        </CardContent>

        {/* Continue with Google */}
        <div className="w-screen h-10 py-2">
          <div className="flex items-center justify-center "></div>
          <AuthWithGoogle destino="/dashboard" />
        </div>

        {/* BTNS register and Login */}
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/login/register")}
          >
            Registrar
          </Button>

          {/* Button outside the form but triggers login validation */}
          <Button className="w-16" onClick={ValidateLoginUser}>
            {!loading ? "Entrar" : <Spinner />}
          </Button>
        </CardFooter>

        <BorderBeam
          duration={4}
          size={300}
          reverse
          className="from-transparent via-black to-transparent"
        />
      </Card>
    </>
  );
}
