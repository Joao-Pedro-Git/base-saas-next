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
import { FcGoogle } from "react-icons/fc";

export default function CardLogin(props) {
  // Function to go to register page
  function goRegister() {
    window.location.href = "/login/register";
  }

  // Function to validate the login
  function validateLogin(e) {
    if (e) event.preventDefault(); // Impede o comportamento padrão do botão

    const password = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();
    const correctPassword = "123456";
    const correctEmail = "joao@gmail.com";

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem("token", "usuário_autenticado");
      window.location.href = "/login/dashbord";
    } else {
      alert("Senha ou email incorretos");
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
              <Input id="email" type="email" placeholder="Seu melhor E-mail" />
            </div>
            {/* Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua melhor senha"
              />
            </div>
          </div>
        </CardContent>

        {/* Continue with Google */}
        <div className="w-screen h-10 py-2">
          <div className="flex items-center justify-center "></div>
          <Button
            className="bg-gray-50 absolute op-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[87%]"
            variant="outline"
          >
            Continuar com <FcGoogle />
          </Button>
        </div>

        {/* BTNS register and Login */}
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={goRegister}>
            Registrar
          </Button>

          {/* Button outside the form but triggers login validation */}
          <Button onClick={validateLogin}>Entrar</Button>
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
