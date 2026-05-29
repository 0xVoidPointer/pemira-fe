import { TanStackDevtools } from "@tanstack/react-devtools";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { useAuthStore } from "#/stores/auth-store";
import { Toaster } from "sonner";
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
    const unsub = useAuthStore.subscribe((state, prev) => {
      if (prev.token && !state.token) {
        queryClient.clear();
        router.navigate({ to: "/auth", search: { loginAs: "mahasiswa" } });
      }
    });
    return unsub;
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
