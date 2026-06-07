import { useLogout } from "#/services/auth/hooks/use-logout";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/selesai/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate: logout } = useLogout();
  useEffect(() => {
    logout();
  }, [logout]);

  return <div>Hello "/_authenticated/selesai/"!</div>;
}
