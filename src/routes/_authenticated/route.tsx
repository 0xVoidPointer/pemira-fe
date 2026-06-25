/**
 * Route kalau authenticated
 * [mahasiswa] = visi misi > pemilihan > tenks for menggunakan hak pemilihan
 * [admin/superadmin] = dashboard admin
 * STC: untuk sekarang > fetching modular (no check verifySession gradually)
 */

import { authKeys } from "#/services/auth/keys";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        ...authKeys.session,
        staleTime: Infinity,
        retry: false,
      });
    } catch (error) {
      throw redirect({ to: "/auth" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
