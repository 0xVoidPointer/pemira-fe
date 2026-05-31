import { IdCard, Loader2, Lock, Shield, User } from "lucide-react";
import { Separator } from "#/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { GoogleLoginButton } from "./google-login-button";
import { getRouteApi, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LoginRequestStudentSchema } from "#/services/auth/schema";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentLogin } from "#/services/auth/api";
import { HTTPError } from "ky";

export function LoginForm() {
  const routeApi = getRouteApi("/_guest/auth");

  const { loginAs } = routeApi.useSearch();

  const roles = {
    mahasiswa: { label: "Mahasiswa", icon: User },
    panitia: { label: "Panitia", icon: Shield },
  } as const;

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: { identifier: string; password: string }) =>
      studentLogin(data),
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

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = LoginRequestStudentSchema.safeParse({
      identifier,
      password,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Input tidak valid.");
      return;
    }

    loginMutation.mutate(parsed.data);
  }

  return (
    <section>
      <div className="my-8">
        <h1 className="text-4xl font-bold text-primary">MASUK KE PEMIRA</h1>
        <p className="text-muted-foreground">
          Portal Pemilihan Raya Universitas Dian Nuswantoro
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor={loginAs === "mahasiswa" ? "nim" : "username"}>
              {loginAs === "mahasiswa"
                ? "Nomor Induk Mahasiswa (NIM)"
                : "Username"}
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id={loginAs === "mahasiswa" ? "nim" : "username"}
                type="text"
                placeholder={
                  loginAs === "mahasiswa" ? "A11.2023.16000" : "Dimas Arifin"
                }
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                disabled={loginMutation.isPending}
              />
              <InputGroupAddon align="inline-start">
                <IdCard className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password"
                type="password"
                placeholder="••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={loginMutation.isPending}
              />
              <InputGroupAddon align="inline-start">
                <Lock className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <div className="flex flex-row gap-x-4 justify-between">
            {Object.entries(roles).map(([id, { label, icon: Icon }]) => (
              <Button
                key={id}
                asChild
                variant={loginAs === id ? "default" : "outline"}
                className="flex-1 flex-row"
              >
                <Link
                  to="/auth"
                  search={{
                    loginAs: id as keyof typeof roles,
                  }}
                >
                  <Icon />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending || loginAs !== "mahasiswa"}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
        </div>
      </form>

      {loginAs === "mahasiswa" ? (
        <>
          <div className="relative w-full my-8">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Atau Masuk Dengan
              </span>
            </div>
          </div>
          <GoogleLoginButton />
        </>
      ) : null}
    </section>
  );
}
