import { Home, MapPinOff } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

export function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg border-muted animate-in fade-in zoom-in-95 duration-300">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-muted p-3 rounded-full mb-4 w-fit">
            <MapPinOff className="size-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Halaman Tidak Ditemukan</CardTitle>
          <CardDescription>
            Maaf, kami tidak dapat menemukan halaman yang Anda cari.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-center mt-2">
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <Button
              variant="default"
              className="w-full sm:w-auto gap-2"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="size-4" />
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
