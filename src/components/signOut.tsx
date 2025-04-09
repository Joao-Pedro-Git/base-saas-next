"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const rota = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          rota.push("/login");
        },
      },
    });
  };

  return <Button onClick={handleSignOut}>Sair</Button>;
}
