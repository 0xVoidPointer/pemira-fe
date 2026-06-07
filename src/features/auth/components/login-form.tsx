import { Eye, EyeOff, IdCard, Loader2, Lock } from "lucide-react";
import { Separator } from "#/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { GoogleLoginButton } from "./google-login-button";
import { useState } from "react";
import { zLoginRequestStudent } from "#/services/_generated/schema";
import { toast } from "sonner";
import { useStudentLogin } from "#/services/auth/hooks/use-student-login";

export function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginMutation = useStudentLogin();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = zLoginRequestStudent.safeParse({
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
            <FieldLabel htmlFor="nim">Nomor Induk Mahasiswa (NIM)</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="nim"
                name="nim"
                type="text"
                placeholder={"A11.2023.16000"}
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
                name="password"
                type={isPasswordVisible ? "text" : "password"}
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
              <InputGroupAddon
                align="inline-end"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="cursor-pointer"
              >
                {isPasswordVisible ? (
                  <EyeOff className="text-muted-foreground" />
                ) : (
                  <Eye className="text-muted-foreground" />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
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
    </section>
  );
}
