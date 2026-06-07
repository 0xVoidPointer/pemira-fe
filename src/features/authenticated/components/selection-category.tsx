import { LucideIcon, GraduationCap, BookOpen, Pin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useCandidates } from "@/services/election";
import { Skeleton } from "@/components/ui/skeleton";
import type { ElectionCategoryType } from "@/services/election";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useVoteStore } from "@/stores/use-vote-store";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SelectionCategoryProps {
  type: ElectionCategoryType;
  title: string;
  icon: LucideIcon;
}

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .slice(0, 2)
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

export function SelectionCategory({
  type,
  title,
  icon: Icon,
}: SelectionCategoryProps) {
  const { data, isLoading } = useCandidates(type);
  const { votes, setVote } = useVoteStore();
  const categoryId = data?.[0]?.category_id;
  const selectedCandidateId = categoryId ? votes[categoryId] : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold flex items-center gap-2">
          <Icon className="size-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        {isLoading ? (
          <div className="space-y-3 mt-4">
            <Skeleton className="bg-primary/15 h-16 w-full" />
            <Skeleton className="bg-primary/15 h-16 w-full" />
            <Skeleton className="bg-primary/15 h-16 w-full" />
          </div>
        ) : (
          <RadioGroup
            className="mt-4 gap-y-3"
            value={selectedCandidateId}
            onValueChange={(value) => categoryId && setVote(categoryId, value)}
          >
            {data?.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              // const ketua = candidate.members?.find((m) => m.role === "KETUA");
              // const wakil = candidate.members?.find((m) => m.role === "WAKIL");

              return (
                <div
                  key={candidate.id}
                  className={cn(
                    "rounded-lg border transition-all duration-300 cursor-pointer overflow-hidden",
                    candidate.is_empty_box && "border-dashed",
                    isSelected
                      ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                      : "border-border hover:border-primary/40 hover:shadow-sm",
                  )}
                  onClick={() =>
                    categoryId && setVote(categoryId, candidate.id!)
                  }
                >
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="relative shrink-0">
                      <Avatar className="size-11 rounded-md">
                        <AvatarImage
                          src={candidate.photo_url ?? ""}
                          className="object-cover object-top"
                        />
                        <AvatarFallback className="rounded-md bg-primary/10 text-primary text-sm font-semibold">
                          {/*{candidate.is_empty_box
                            ? "—"
                            : getInitials(
                                ketua?.student?.name ??
                                  `Paslon ${candidate.number}`,
                              )}*/}
                          RT
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground ring-2 ring-background">
                        {candidate.number}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight truncate text-foreground">
                        {/*{candidate.is_empty_box
                          ? "Kotak Kosong"
                          : ketua?.student?.name
                            ? `${ketua.student.name}`
                            : `Paslon No. ${candidate.number}`}*/}
                        {candidate.is_empty_box
                          ? "Kotak Kosong"
                          : "Rin Tohsaka"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                        <GraduationCap className="size-3 shrink-0" />
                        {/*{ketua?.student?.faculty ??
                          `Paslon No. ${candidate.number}`}
                        {wakil?.student?.name && (
                          <span className="text-muted-foreground/60">
                            · {wakil.student.name}
                          </span>
                        )}*/}
                        Paslon No. {candidate.number}
                      </p>
                    </div>

                    {/* Radio Selected */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && (
                        <Badge
                          variant="default"
                          className="text-[10px] px-2 py-0.5 hidden sm:flex"
                        >
                          Dipilih
                        </Badge>
                      )}
                      <RadioGroupItem value={candidate.id!} />
                    </div>
                  </div>

                  {/* Expanded section stuff */}
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isSelected && !candidate.is_empty_box
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-border/60 bg-muted/40 px-4 py-3 space-y-3">
                        {/* Visi & Misi */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="rounded-md bg-background border border-border/60 px-3 py-2 space-y-1">
                            <p className="text-[10px] font-semibold text-primary uppercase tracking-wide flex items-center gap-1">
                              <BookOpen className="size-3" />
                              Visi
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {candidate.vision}
                            </p>
                          </div>
                          <div className="rounded-md bg-background border border-border/60 px-3 py-2 space-y-1">
                            <p className="text-[10px] font-semibold text-primary uppercase tracking-wide flex items-center gap-1">
                              <Pin className="size-3" />
                              Misi
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 whitespace-pre-line">
                              {candidate.mission}
                            </p>
                          </div>
                        </div>

                        {/* Chip anggota */}
                        {candidate?.members!.length > 1 && (
                          <div className="flex flex-wrap gap-2">
                            {candidate?.members!.map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-2.5 py-1 text-xs"
                              >
                                <Avatar className="size-5">
                                  <AvatarFallback className="text-[8px] font-medium bg-primary/10 text-primary">
                                    {/*{getInitials(
                                      member.student?.name ?? member.role,
                                    )}*/}
                                    RT
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-foreground font-medium">
                                  {/*{member.student?.name ?? "—"}*/}
                                  Tung Tung
                                </span>
                                <Badge
                                  variant={
                                    member.role === "KETUA"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-[9px] px-1.5 py-0 capitalize"
                                >
                                  {member.role === "KETUA" ? "Ketua" : "Wakil"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
}
