import { ArrowRight, Heart, Info, ShieldCheck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { cn } from "#/lib/utils";
import { GreetingPill } from "./greeting-pill";
import { DateInfo } from "./date-info";

const DASHBOARD_ITEMS = [
  {
    title: "Aturan Pemilihan",
    description:
      "Satu mahasiswa memiliki hak satu suara sah. Pilihan bersifat rahasia dan tidak dapat diubah setelah dikirimkan.",
    icon: ShieldCheck,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Mengapa Penting?",
    description:
      "Suaramu menentukan pemimpin yang akan mewakili mahasiswa selama 1 tahun ke depan. Partisipasi aktifmu sangat berarti.",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Terima Kasih",
    description:
      "Atas partisipasi aktif seluruh mahasiswa dalam menjaga demokrasi kampus. Bersama kita wujudkan UDINUS yang lebih baik.",
    icon: Heart,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export function Dashboard() {
  return (
    <main className="animate-fade animate-once animate-ease-in-out animate-normal animate-fill-forwards">
      <GreetingPill />
      <section className="flex flex-1 flex-col gap-y-10 mt-8">
        <div className="space-y-4 flex-1 gap-x-4 ">
          <DateInfo />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DASHBOARD_ITEMS.map((item) => (
            <Card
              size="sm"
              key={item.title}
              className="group transition-all duration-300 hover:ring-primary/50 hover:shadow-lg border-none ring-1 ring-foreground/10"
            >
              <CardHeader className="pb-2">
                <div
                  className={cn(
                    "flex items-center justify-center size-12 rounded-2xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                    item.bg,
                    item.color,
                  )}
                >
                  <item.icon className="size-6" />
                </div>
                <CardTitle className="text-xl font-bold tracking-tight">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block bg-card rounded-3xl p-8 ring-1 ring-foreground/10 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Info className="size-32 rotate-12" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              Cara Memberikan Suara
            </h3>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-1 gap-4 items-start">
                <div className="shrink-0 size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h4 className="font-bold mb-1">Pilih Kandidat</h4>
                  <p className="text-sm text-muted-foreground">
                    Lihat visi, misi, dan program kerja masing-masing paslon
                    dengan teliti.
                  </p>
                </div>
              </div>

              <ArrowRight className="text-muted-foreground/20 shrink-0" />

              <div className="flex flex-1 gap-4 items-start">
                <div className="shrink-0 size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h4 className="font-bold mb-1">Verifikasi Pilihan</h4>
                  <p className="text-sm text-muted-foreground">
                    Pastikan pilihanmu sudah benar. Sistem akan meminta
                    konfirmasi akhir.
                  </p>
                </div>
              </div>

              <ArrowRight className="text-muted-foreground/20 shrink-0" />

              <div className="flex flex-1 gap-4 items-start">
                <div className="shrink-0 size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h4 className="font-bold mb-1">Kirim Suara</h4>
                  <p className="text-sm text-muted-foreground">
                    Suara yang telah dikirim akan dienkripsi dan masuk ke dalam
                    kotak suara digital.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
