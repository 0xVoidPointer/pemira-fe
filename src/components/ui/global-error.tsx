import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

interface GlobalErrorProps {
  error: unknown;
  resetErrorBoundary?: () => void;
}

export function GlobalError({ error, resetErrorBoundary }: GlobalErrorProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "Terjadi kesalahan yang tidak diketahui.";

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg border-destructive/20 animate-in fade-in zoom-in-95 duration-300">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-destructive/10 p-3 rounded-full mb-4 w-fit">
            <AlertTriangle
              className="size-8 text-destructive"
              aria-hidden="true"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Terjadi Kesalahan
          </CardTitle>
          <CardDescription>
            Maaf, ada masalah saat memuat halaman ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-center mt-2">
          <div className="bg-muted/50 rounded-md p-3 text-left overflow-auto max-h-32 text-xs text-muted-foreground font-mono">
            {errorMessage}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {resetErrorBoundary && (
              <Button onClick={resetErrorBoundary} className="flex-1 gap-2">
                <RefreshCcw className="size-4" />
                Coba Lagi
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="size-4" />
              Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
