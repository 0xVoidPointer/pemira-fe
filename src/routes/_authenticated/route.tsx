/**
 * Route kalau authenticated
 * [mahasiswa] = visi misi > pemilihan > tenks for menggunakan hak pemilihan
 * [admin/superadmin] = dashboard admin
 * STC: untuk sekarang > fetching modular (no check verifySession gradually)
 */
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
