import { redirect } from "next/navigation";
import { auth } from "../../../../lib/auth";
import { headers } from "next/headers";
//? DashBoard shadcn components
import { AppSidebar } from "../../../../components/app-sidebar";
import { ChartAreaInteractive } from "../../../../components/chart-area-interactive";
import { DataTable } from "../../../../components/data-table";
import { SectionCards } from "../../../../components/section-cards";
import { SiteHeader } from "../../../../components/site-header";
import { SidebarInset, SidebarProvider } from "../../../../components/ui/sidebar";
import data from "../../data.json";

export default async function NoteDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) {
    redirect("/login");
  }

  const { user } = session;


  return (
    <div>
      <SidebarProvider>
        <AppSidebar
          nameUser={user.name}
          userEmail={user.email}
          userImage={user.image || "/imgDefaultUser.jpg"}
        />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                <h1 className="text-center">aqui vao suas anotacoes {user.name}...</h1>

              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

    </div>
  )
}

