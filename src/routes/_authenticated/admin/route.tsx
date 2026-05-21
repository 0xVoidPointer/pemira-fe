import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  component: RouteComponent,
  /**
   * Handling apakah authenticated as admin or nah disini
   */
  beforeLoad: async () => {
    console.log("oi dari route.tsx admin");
  },
});

function RouteComponent() {
  return <Outlet />;
}
