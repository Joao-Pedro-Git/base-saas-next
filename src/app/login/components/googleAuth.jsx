"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { signIn } from "../../../lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import Spinner from "@/components/spinner";

export default function GoogleAuth({ destino, color = "border-black" }) {
  const [loading, setLoading] = useState(false);

  async function goLoginWithGoogle() {
    await signIn.social(
      {
        provider: "google",
        callbackURL: destino,
      },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
      }
    );
  }

  return (
    <Button
      className="bg-gray-50 absolute op-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[87%]"
      variant="outline"
      onClick={goLoginWithGoogle}
    >
      Continuar com {loading ? <Spinner color={color} /> : <FcGoogle />}
    </Button>
  );
}
