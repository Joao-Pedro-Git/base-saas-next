"use client";

import { authClient } from "@/lib/auth-client";

export default function signOut() {
  return <button onClick={() => authClient.signOut()}>Sair</button>;
}
