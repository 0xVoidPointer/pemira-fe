/**
 * Route kalau authenticated
 * [mahasiswa] = visi misi > pemilihan > tenks for menggunakan hak pemilihan
 * [admin/superadmin] = dashboard admin
 */

import { useAuthStore } from "#/stores/auth-store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

/**
 * Handling JWT shit and stuff disini
 */
export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: () => {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw redirect({
        to: "/auth",
        search: {
          loginAs: "mahasiswa",
        },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
