import { redirect } from "next/navigation";
import { getServerAuthUser } from "@/lib/auth-utils";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuthUser();

  if (!user) redirect("/admin/login");
  if (!user.isBrideOrGroom) redirect("/");

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f5ede0" }}>
      <AdminSidebar user={user} />
      <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10" id="admin-main">
        {children}
      </main>
    </div>
  );
}
