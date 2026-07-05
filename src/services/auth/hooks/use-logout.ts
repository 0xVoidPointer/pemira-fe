import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api";
import { useUserStore } from "#/stores/user-store.ts";

export function useLogout() {
  const queryClient = useQueryClient();
  const { deleteUser } = useUserStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      deleteUser();
      queryClient.clear();
    },
  });
}
