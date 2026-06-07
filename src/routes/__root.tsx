import { TanStackDevtools } from "@tanstack/react-devtools";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { authKeys } from "#/services/auth/keys";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      if (router.state.location.pathname.startsWith("/auth")) return;
      queryClient.removeQueries({ queryKey: authKeys.session.queryKey });
      toast.error("Sesi telah berakhir. Silakan masuk kembali.", {
        id: "auth-expired",
      });
      router.navigate({ to: "/auth" });
    };
    window.addEventListener("auth:expired", handler);
    return () => window.removeEventListener("auth:expired", handler);
  }, [queryClient, router]);

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  );
}
