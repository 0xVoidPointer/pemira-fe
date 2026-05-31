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
import { zElectionCategoryType } from "#/services/_generated/schema";
import { useCandidates } from "#/services/election";
import { Skeleton } from "#/components/ui/skeleton";
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

  if (isLoading) return <CalonCardSkeleton />;

  return (
    <section className={"flex flex-col gap-y-4 child"}>
      {data?.map((candidate, index) => (
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
                  {"RT"}
                </div>
                <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-background">
                  {candidate.number}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <CardTitle className="text-base leading-tight">
                  {"Rin Tohsaka (Dummy)"}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-1">
                  <GraduationCap className="size-3.5 shrink-0" />
                  <span className="truncate">
                    {"Fakultas Ilmu Komputer (Dummy)"}
                  </span>
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

            {/*foto orang di kanan*/}
            <img
              className="absolute bottom-0 -left-1 md:bottom-auto md:left-auto  md:-right-20 md:top-1 opacity-30 mix-blend-multiply hidden md:block"
              src={candidate.photo_url ?? ""}
              alt=""
            />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function CalonCardSkeleton() {
  return (
    <section className="flex flex-col gap-y-4 child">
      {[1, 2, 3].map((index) => (
        <Card
          key={index}
          className="flex flex-col flex-1 relative border-t-4 md:border-t-0 md:border-l-4 border-muted"
        >
          <CardHeader>
            <div className="flex items-start gap-3">
              {/* Avatar & Number Badge Skeleton */}
              <div className="relative">
                <Skeleton className="bg-primary/15 size-12 rounded-full" />
                <Skeleton className="bg-primary/15 absolute -bottom-1 -right-1 size-5 rounded-full ring-2 ring-background" />
              </div>

              {/* Title & Description Skeleton */}
              <div className="flex-1 min-w-0 flex flex-col gap-2 py-1">
                <Skeleton className="bg-primary/15 h-5 w-48 max-w-full" />
                <Skeleton className="bg-primary/15 h-4 w-32 max-w-full" />
              </div>

              {/* Action Badge Skeleton */}
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
        </Card>
      ))}
    </section>
  );
}
