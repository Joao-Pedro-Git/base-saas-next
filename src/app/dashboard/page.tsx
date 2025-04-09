import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HeaderDashBoard from "./components/headers";

export default async function Dashboard(props: any) {
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
      <HeaderDashBoard
        imageUser={user.image || "imgDefaultUser.jpg"}
        nameUser={user.name}
      />
    </div>
  );
}
