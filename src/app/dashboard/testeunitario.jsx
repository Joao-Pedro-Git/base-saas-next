import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ButtonOut from "../../components/signOut";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se não tiver usuário logado, redireciona pra login
  if (!session || !session.user) {
    redirect("/login");
  }

  const { user } = session;

  console.log(user)

  return (
    <>
      <h1>Welcome {user.name}</h1>
      <br />
      <h1>Seu email: {user.email}</h1>
      <br />
      <h1>Seu email: {user.id}</h1>
      <h1>Sua imagem: <img src={user.image} alt="img user" /></h1>

      <ButtonOut />
    </>
  );
}
