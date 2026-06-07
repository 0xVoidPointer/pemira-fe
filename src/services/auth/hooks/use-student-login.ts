import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequestStudent, studentLogin } from "../api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { HTTPError } from "ky";

export function useStudentLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequestStudent) => studentLogin(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Berhasil masuk");
      navigate({ to: "/", search: { steps: 2, visiMisi: "DPM" } });
    },
    onError: async (err) => {
      let message = "Tidak dapat menghubungi server.";
      if (err instanceof HTTPError) {
        try {
          const body = (await err.response.clone().json()) as {
            error?: string;
            message?: string;
          };
          message = body.error ?? body.message ?? "Gagal masuk. Coba lagi.";
        } catch {
          message = "Gagal masuk. Coba lagi.";
        }
      }
      toast.error(message);
    },
  });
}
