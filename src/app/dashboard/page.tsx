import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
    //? Ele faz o redirecionamento no servidor, antes de carregar a página. rápido e seguro.
  }
  const { user } = session;
  return (
    <div>
      <h1>ola {user.name}</h1>
    </div>
  );
}
