import { useLogout } from "#/services/auth/hooks/use-logout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { CheckCircle2, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/selesai/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const logOutHandler = useCallback(async () => {
    await logout();
    navigate({ to: "/auth" });
  }, [logout, navigate]);

  useEffect(() => {
    if (countdown <= 0) {
      logOutHandler();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, logOutHandler]);

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-lg border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Terima Kasih!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted-foreground leading-relaxed">
              Suara Anda telah berhasil direkam. Terima kasih telah
              berpartisipasi dalam{" "}
              <span className="font-semibold text-foreground">
                Pemira Udinus
              </span>
              .
            </p>
            <p className="text-sm text-muted-foreground italic">
              "Satu suara Anda menentukan masa depan kampus kita menjadi lebih
              baik."
            </p>
          </div>

          <div className="bg-secondary/50 py-4 px-6 rounded-xl border border-border">
            <p className="text-sm font-medium mb-1">Otomatis keluar dalam</p>
            <div className="text-4xl font-black text-primary tabular-nums">
              {countdown}s
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2 border-primary/20 hover:bg-primary/5"
            onClick={() => logOutHandler()}
          >
            <LogOut className="w-4 h-4" />
            Keluar Sekarang
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
