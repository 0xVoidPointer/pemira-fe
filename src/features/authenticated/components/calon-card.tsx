import { BookOpen, GraduationCap, Pin } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: "Ahmad Rizky Pratama",
    major: "Teknik Informatika '22",
    vision:
      "Mewujudkan DPM KM yang transparan, aspiratif, dan berpihak kepada seluruh mahasiswa Universitas Dian Nuswantoro.",
    mission:
      "Mengoptimalkan fungsi pengawasan DPM KM terhadap kebijakan universitas dan memperkuat koordinasi antar organisasi mahasiswa.",
    number: 1,
    initials: "AR",
    img: "https://i2.wp.com/images.genshin-builds.com/genshin/characters/keqing/image.png?strip=all&quality=100",
  },
  {
    id: 2,
    name: "Siti Aminah",
    major: "Sistem Informasi '21",
    vision:
      "Menjadikan DPM KM sebagai wadah inovasi dan kolaborasi digital bagi seluruh elemen mahasiswa Udinus.",
    mission:
      "Membangun platform aspirasi digital yang terintegrasi dan mendorong program kerja berbasis teknologi tepat guna.",
    number: 2,
    initials: "SA",
    img: "https://static.wikia.nocookie.net/gensin-impact/images/e/e6/Furina_Icon.png",
  },
  {
    id: 3,
    name: "Budi Santoso",
    major: "Desain Komunikasi Visual '23",
    vision:
      "Meningkatkan eksistensi dan kreativitas mahasiswa Udinus di kancah nasional melalui dukungan DPM KM yang inklusif.",
    mission:
      "Memfasilitasi ruang kreatif bagi mahasiswa dan memperjuangkan transparansi anggaran kegiatan kemahasiswaan.",
    number: 3,
    initials: "BS",
    img: "https://static.wikia.nocookie.net/gensin-impact/images/4/41/Mona_Icon.png",
  },
  {
    id: 4,
    name: "Laila Majnun",
    major: "Manajemen '22",
    vision:
      "Profesionalisme dan integritas DPM KM dalam melayani kebutuhan akademik serta kesejahteraan mahasiswa.",
    mission:
      "Menyelenggarakan advokasi mahasiswa yang responsif dan mempererat hubungan harmonis antara mahasiswa dan birokrasi.",
    number: 4,
    initials: "LM",
    img: "https://static.wikia.nocookie.net/gensin-impact/images/e/e9/Hu_Tao_Icon.png/",
  },
];

const BORDER_COLORS = [
  "border-blue-500",
  "border-violet-500",
  "border-emerald-500",
  "border-rose-500",
  "border-amber-500",
  "border-indigo-500",
  "border-cyan-500",
  "border-orange-500",
  "border-teal-500",
  "border-fuchsia-500",
];

export function CalonCard() {
  return (
    <section className={"flex flex-col gap-y-4 child"}>
      {MOCK_CANDIDATES.map((candidate, index) => (
        <Card
          key={candidate.id}
          className={cn(
            "flex flex-col flex-1 relative border-t-4 md:border-t-0 md:border-l-4 hover:ring-primary/50 hover:shadow-lg transition-all duration-300 ",
            BORDER_COLORS[index % BORDER_COLORS.length],
          )}
        >
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="size-12 rounded-full flex items-center justify-center text-sm font-semibold ring-2 ring-border bg-primary/10 text-primary">
                  {candidate.initials}
                </div>
                <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background">
                  {candidate.number}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <CardTitle className="text-base leading-tight">
                  {candidate.name}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-1">
                  <GraduationCap className="size-3.5 shrink-0" />
                  <span className="truncate">{candidate.major}</span>
                </CardDescription>
              </div>

              <CardAction>
                <Badge variant="outline">No. {candidate.number}</Badge>
              </CardAction>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col md:flex-row gap-4 flex-1">
            <Item variant={"muted"} className="md:w-1/2">
              <ItemContent className="space-y-1.5 text-primary">
                <ItemTitle>
                  <BookOpen className="size-3.5 text-primary" />
                  Visi
                </ItemTitle>
                <ItemDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 yr">
                  {candidate.vision}
                </ItemDescription>
              </ItemContent>
            </Item>

            <Item variant={"muted"} className="md:w-1/2">
              <ItemContent className="space-y-1.5 text-primary">
                <ItemTitle>
                  <Pin className="size-3.5 text-primary" />
                  Misi
                </ItemTitle>
                <ItemDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {candidate.mission}
                </ItemDescription>
              </ItemContent>
            </Item>

            <img
              className="absolute bottom-0 -left-1 md:bottom-auto md:left-auto  md:-right-20 md:top-1 opacity-30 mix-blend-multiply hidden md:block"
              src={candidate.img}
              alt=""
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
