"use client";

import { useState } from "react";
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
import { validateName, validateEmail, validatePassword } from "./validators";

export default function CardLogin(props) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nomeError = validateName(formData.nome);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      nome: nomeError,
      email: emailError,
      password: passwordError,
    });

    if (!nomeError && !emailError && !passwordError) {
      alert("Formulário válido!");
      setFormData({
        nome: "",
        email: "",
        password: "",
      });
    } else {
      setTimeout(() => {
        setErrors({
          nome: "",
          email: "",
          password: "",
        });
      }, 6000);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Nome */}

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  maxLength={18}
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs text-center">
                    {errors.nome}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu melhor E-mail"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs text-center">
                    {errors.email}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua melhor senha"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs text-center">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full">
              Registrar
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
    </>
  );
}
