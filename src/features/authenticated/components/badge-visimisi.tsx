import type z from "zod";
import { Badge } from "#/components/ui/badge";
import type { zElectionCategoryType } from "#/services/_generated/schema";

const VISI_MISI_ITEMS = [
  { label: "DPM KM", value: "DPM" },
  { label: "Presiden BEM KM", value: "PRESIDENT" },
  { label: "Gubernur BEM Fakultas", value: "FACULTY_GOVERNOR" },
] as const;

type ELECTION_CATEGORY = z.infer<typeof zElectionCategoryType>;

export function BadgeVisiMisi({
  electionCategory,
}: {
  electionCategory: ELECTION_CATEGORY;
}) {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {VISI_MISI_ITEMS.map((item) => (
        <Badge
          key={item.value}
          variant={electionCategory === item.value ? "default" : "outline"}
          className="md:h-8 px-4"
        >
          {item.label}
        </Badge>
      ))}
    </div>
  );
}
