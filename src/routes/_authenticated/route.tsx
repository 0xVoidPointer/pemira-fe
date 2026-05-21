/**
 * Route kalau authenticated
 * [mahasiswa] = visi misi > pemilihan > tenks for menggunakan hak pemilihan
 * [admin/superadmin] = dashboard admin
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  /**
   * Handling JWT shit and stuff disini
   */
  beforeLoad: async () => {
    console.log("oi dari route.tsx");
  },
});

function RouteComponent() {
  return <Outlet />;
}
