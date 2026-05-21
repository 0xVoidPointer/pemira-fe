/**
 * Route kalau authenticated
 * [mahasiswa] = visi misi > pemilihan > tenks for menggunakan hak pemilihan
 * [admin/superadmin] = dashboard admin
 */
import { Navbar } from "#/components/ui/navbar";
import { Stepper } from "#/components/ui/stepper";
import { BreadcrumbsPath } from "#/features/authenticated";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import z from "zod";

const authenticatedSearchSchema = z.object({
  steps: z.number().min(2).max(5).catch(2),
});

/**
 * Handling JWT shit and stuff disini
 */
export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => {
    console.log("oi dari route.tsx");
  },
  validateSearch: authenticatedSearchSchema,
});

function RouteComponent() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <section className="border-b-2 py-4 px-4 md:px-8 flex flex-row justify-between items-center">
        <BreadcrumbsPath />
        <Stepper />
      </section>
      <section className="w-full h-full flex-1 flex flex-col justify-between py-12 md:px-12 px-8">
        <Outlet />
      </section>
    </main>
  );
}
