import { BookOpen, Briefcase, GraduationCap } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";

export function CalonCard() {
  const length: number = 1; // ini nnti dari data

  return (
    <section
      className={cn(
        "grid gap-4",
        length === 1 && "grid-cols-1 max-w-sm",
        length === 2 && "grid-cols-1 md:grid-cols-2",
        length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      <Card className="flex flex-col h-full">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="size-12 rounded-full flex items-center justify-center text-sm font-semibold ring-2 ring-border bg-primary/10 text-primary">
                AR
              </div>
              <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background">
                1
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-base leading-tight">
                Ahmad Rizky Pratama
              </CardTitle>
              <CardDescription className="mt-1 flex items-center gap-1">
                <GraduationCap className="size-3.5 shrink-0" />
                <span className="truncate">Teknik Informatika &rsquo;22</span>
              </CardDescription>
            </div>

            <CardAction>
              <Badge variant="outline">No. 1</Badge>
            </CardAction>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <BookOpen className="size-3.5" />
              Visi
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              Mewujudkan DPM KM yang transparan, aspiratif, dan berpihak kepada
              seluruh mahasiswa Universitas Dian Nuswantoro.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              <Briefcase className="size-3.5" />
              Program Kerja
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs font-normal">
                Reses Mahasiswa
              </Badge>
              <Badge variant="secondary" className="text-xs font-normal">
                Sidang Terbuka
              </Badge>
              <Badge variant="secondary" className="text-xs font-normal">
                Portal Aspirasi
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
