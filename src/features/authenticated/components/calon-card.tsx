import { BookOpen, Inbox, Pin } from "lucide-react";
import type z from "zod";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { useIsMobile } from "#/hooks/use-mobile.tsx";
import { cn } from "#/lib/utils";
import type { zElectionCategoryType } from "#/services/_generated/schema";
import { useCandidates } from "#/services/election";

type ELECTION_CATEGORY = z.infer<typeof zElectionCategoryType>;

export function CalonCard({
  electionCategory,
}: {
  electionCategory: ELECTION_CATEGORY;
}) {
  const { data, isLoading } = useCandidates(electionCategory);

  const isMobile = useIsMobile();

  if (isLoading) return <CalonCardSkeleton />;

  return (
    <section className={"flex flex-col gap-y-6"}>
      {data?.map((candidate) => (
        <Card
          key={candidate.id}
          className={cn(
            "flex overflow-hidden transition-all duration-300 py-0",
            "flex-col md:flex-row hover:shadow-md border border-border hover:border-primary/50",
          )}
        >
          {/* Left Photo */}
          <div className="relative h-48 md:h-auto md:w-56 md:aspect-3/4 shrink-0 overflow-hidden bg-muted flex items-center justify-center">
            {candidate.is_empty_box ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground opacity-50">
                <Inbox className="size-12 mb-2" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Kotak Kosong
                </span>
              </div>
            ) : (
              <img
                src={
                  !isMobile
                    ? (candidate.photo_url_portrait ??
                      "https://avatar.vercel.sh/shadcn1")
                    : (candidate.photo_url_landscape ??
                      "https://avatar.vercel.sh/shadcn1")
                }
                alt={`Foto ${candidate.members?.map((m) => m.name).join(" & ") ?? "Kandidat"}`}
                className={cn("absolute inset-0 w-full h-full object-cover")}
              />
            )}
            <span className="absolute top-3 left-3 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm ring-2 ring-background">
              {candidate.number}
            </span>
          </div>

          {/*Right Side*/}
          <div className="flex flex-col flex-1 min-w-0 p-5 md:p-6 gap-y-4">
            <CardHeader className="p-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <Badge
                    variant="outline"
                    className="mb-2 w-fit bg-background text-xs font-mono"
                  >
                    No. {candidate.number}
                  </Badge>
                  <CardTitle className="text-lg md:text-xl font-bold leading-tight">
                    {candidate.is_empty_box
                      ? "Kotak Kosong"
                      : candidate.members?.map((c) => c.name).join(" & ")}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-4 flex-1 p-0">
              {candidate.is_empty_box ? (
                <div className="flex-1 flex items-center justify-center p-8 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
                  <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
                    Pilih kotak kosong jika Anda tidak mendukung calon yang
                    tersedia pada kategori ini.
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-muted/40 rounded-xl p-4 md:w-1/2 flex flex-col gap-2 border border-border/50">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <BookOpen className="size-4" />
                      Visi
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {candidate.vision}
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-4 md:w-1/2 flex flex-col gap-2 border border-border/50">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <Pin className="size-4" />
                      Misi
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                      {candidate.mission}
                    </p>
                  </div>
                </>
              )}
            </CardContent>

            {!candidate.is_empty_box &&
              candidate.members &&
              candidate.members.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {candidate.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 bg-background border border-border rounded-full py-1.5 px-3 shadow-sm"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {member.name}
                      </span>
                      <Badge
                        variant={
                          member.role === "KETUA" ? "default" : "secondary"
                        }
                        className="text-[10px] uppercase tracking-wider py-0"
                      >
                        {member.role === "INDIVIDUAL"
                          ? "Kandidat"
                          : member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </Card>
      ))}
    </section>
  );
}

function CalonCardSkeleton() {
  return (
    <section className="flex flex-col gap-y-6">
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          className="flex flex-col md:flex-row overflow-hidden border border-border py-0"
        >
          {/* Left Photo Skeleton */}
          <div className="relative h-48 md:h-auto md:w-56 shrink-0 overflow-hidden bg-muted">
            <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            <Skeleton className="absolute top-3 left-3 size-8 rounded-full ring-2 ring-background" />
          </div>

          {/* Right Side Skeleton */}
          <div className="flex flex-col flex-1 min-w-0 p-5 md:p-6 gap-y-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-16 rounded-sm" />
              <Skeleton className="h-7 w-64 max-w-full" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Visi Section Skeleton */}
              <div className="bg-muted/40 rounded-xl p-4 md:w-1/2 flex flex-col gap-3 border border-border/50">
                <Skeleton className="h-5 w-16" />
                <div className="flex flex-col gap-2 pt-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>

              {/* Misi Section Skeleton */}
              <div className="bg-muted/40 rounded-xl p-4 md:w-1/2 flex flex-col gap-3 border border-border/50">
                <Skeleton className="h-5 w-16" />
                <div className="flex flex-col gap-2 pt-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-9/12" />
                </div>
              </div>
            </div>

            {/* Members Skeleton Placeholder */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {[1, 2].map((m) => (
                <Skeleton key={m} className="h-8 w-40 rounded-full" />
              ))}
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
