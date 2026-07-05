import { BookOpen, Pin } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "#/components/ui/item";
import { cn } from "#/lib/utils";
import { zElectionCategoryType } from "#/services/_generated/schema";
import { useCandidates } from "#/services/election";
import { Skeleton } from "#/components/ui/skeleton";
import { useIsMobile } from "#/hooks/use-mobile.tsx";
import z from "zod";

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
    <section className={"flex flex-col gap-y-4"}>
      {data?.map((candidate, index) => (
        <Card
          key={candidate.id}
          className={cn(
            "flex relative border-t-4 md:border-t-0 md:border-l-4 hover:ring-primary/50 hover:shadow-lg transition-all duration-300 py-0",
            "flex-col md:flex-row",
            BORDER_COLORS[index % BORDER_COLORS.length],
          )}
        >
          {/* Left Photo */}
          <div className="relative h-40 md:h-auto md:w-48 md:aspect-3/4 md:self-start shrink-0 overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg">
            <img
              src={
                candidate.is_empty_box
                  ? "https://avatar.vercel.sh/shadcn1"
                  : !isMobile
                    ? (candidate.photo_url_portrait ??
                      "https://avatar.vercel.sh/shadcn1")
                    : (candidate.photo_url_landscape ??
                      "https://avatar.vercel.sh/shadcn1")
              }
              alt="fotocalon"
              className={cn(
                "absolute inset-0 w-full h-full object-cover",
                // candidate.is_empty_box && "p-12 opacity-20 grayscale",
              )}
            />
            <span className="absolute top-2 left-2 flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground ring-2 ring-background">
              {candidate.number}
            </span>
          </div>

          {/*Right Side*/}
          <div className="flex flex-col flex-1 min-w-0 py-4 gap-y-2 pt-0 md:pt-4">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm md:text-base leading-tight">
                    {candidate.is_empty_box
                      ? "Kotak Kosong"
                      : candidate.members?.map((c) => c.name).join(" & ")}
                  </CardTitle>
                </div>
                <CardAction>
                  <Badge variant="outline">No. {candidate.number}</Badge>
                </CardAction>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-4 flex-1">
              {candidate.is_empty_box ? (
                <div className="flex-1 flex items-center justify-center p-6 bg-muted/30 rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground text-center italic">
                    Pilih kotak kosong jika Anda tidak mendukung calon yang
                    tersedia pada kategori ini.
                  </p>
                </div>
              ) : (
                <>
                  <Item variant={"muted"} className="md:w-1/2">
                    <ItemContent className="space-y-1.5 text-primary h-full flex">
                      <ItemTitle>
                        <BookOpen className="size-3.5 text-primary" />
                        Visi
                      </ItemTitle>
                      <ItemDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {candidate.vision}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                  <Item variant={"muted"} className="md:w-1/2">
                    <ItemContent className="space-y-1.5 text-primary h-full flex">
                      <ItemTitle>
                        <Pin className="size-3.5 text-primary" />
                        Misi
                      </ItemTitle>
                      <ItemDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {candidate.mission}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </>
              )}
            </CardContent>

            {!candidate.is_empty_box && candidate?.members?.length == 2 && (
              <div className="gap-2 flex-wrap bg-card p-0 flex flex-row items-center mt-2 px-3">
                {candidate.members.map((member) => (
                  <Item
                    key={member.id}
                    variant="outline"
                    size={"sm"}
                    className="rounded-full py-1.5 px-3 hover:bg-primary/5 duration-300 transition"
                  >
                    <ItemContent>
                      <ItemTitle>{member.name}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <Badge
                        variant={
                          member.role === "KETUA" ? "default" : "outline"
                        }
                      >
                        {member.role}
                      </Badge>
                    </ItemActions>
                  </Item>
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
    <section className="flex flex-col gap-y-4">
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          className="flex flex-col md:flex-row relative border-t-4 md:border-t-0 md:border-l-4 border-muted py-0"
        >
          {/* Left Photo Skeleton */}
          <div className="relative h-40 md:h-auto md:w-48 shrink-0 overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg">
            <Skeleton className="bg-primary/15 absolute inset-0 w-full h-full" />
            <Skeleton className="bg-primary/15 absolute top-2 left-2 size-6 rounded-full ring-2 ring-background" />
          </div>

          {/* Right Side Skeleton */}
          <div className="flex flex-col flex-1 min-w-0 py-4 gap-y-2 pt-0 md:pt-4">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <Skeleton className="bg-primary/15 h-5 w-48 max-w-full" />
                  <div className="mt-2 flex items-center gap-1">
                    <Skeleton className="bg-primary/15 size-3.5 rounded-full" />
                    <Skeleton className="bg-primary/15 h-4 w-32" />
                  </div>
                </div>
                <CardAction>
                  <Skeleton className="bg-primary/15 h-6 w-14 rounded-full" />
                </CardAction>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Visi Section Skeleton */}
              <Item variant={"muted"} className="md:w-1/2">
                <ItemContent className="space-y-2">
                  <ItemTitle className="flex items-center gap-1.5">
                    <Skeleton className="bg-primary/15 size-3.5 rounded-sm" />
                    <Skeleton className="bg-primary/15 h-4 w-12" />
                  </ItemTitle>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <Skeleton className="bg-primary/15 h-3 w-full" />
                    <Skeleton className="bg-primary/15 h-3 w-11/12" />
                    <Skeleton className="bg-primary/15 h-3 w-4/5" />
                  </div>
                </ItemContent>
              </Item>

              {/* Misi Section Skeleton */}
              <Item variant={"muted"} className="md:w-1/2">
                <ItemContent className="space-y-2">
                  <ItemTitle className="flex items-center gap-1.5">
                    <Skeleton className="bg-primary/15 size-3.5 rounded-sm" />
                    <Skeleton className="bg-primary/15 h-4 w-12" />
                  </ItemTitle>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <Skeleton className="bg-primary/15 h-3 w-full" />
                    <Skeleton className="bg-primary/15 h-3 w-5/6" />
                    <Skeleton className="bg-primary/15 h-3 w-9/12" />
                  </div>
                </ItemContent>
              </Item>
            </CardContent>

            {/* Members Skeleton Placeholder */}
            <div className="gap-4 flex-wrap bg-card p-0 flex flex-row mt-2 px-3">
              {[1, 2].map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-2 border rounded-md py-2 px-4 min-w-50"
                >
                  <Skeleton className="bg-primary/15 h-4 w-32" />
                  <Skeleton className="bg-primary/15 h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
}
