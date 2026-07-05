import { Eye, EyeOff, IdCard, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import { Field, FieldLabel } from "#/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { zLoginRequestStudent } from "#/services/_generated/schema";
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
        <h1 className="text-4xl font-bold text-primary uppercase">
          Masuk ke Pemira
        </h1>
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
                role="button"
                tabIndex={0}
                aria-label={
                  isPasswordVisible
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsPasswordVisible(!isPasswordVisible);
                  }
                }}
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
    </section>
  );
}
