import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequestStudent, studentLogin } from "../api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useUserStore } from "#/stores/user-store.ts";

export function useStudentLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (data: LoginRequestStudent) => studentLogin(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setUser(data);
      toast.success("Berhasil masuk");
      navigate({ to: "/", search: { steps: 2, visiMisi: "DPM" } });
    },
    onError: (err: any) => {
      let message = "Tidak dapat menghubungi server.";
      const errorBody = err.response?.errorBody;

      if (errorBody) {
        message = errorBody.error ?? "Gagal masuk. Coba lagi.";
      } else if (err.message) {
        message = err.message;
      }

      toast.error(message);
    },
  });
}
