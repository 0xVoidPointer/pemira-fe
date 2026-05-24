import { Badge } from "#/components/ui/badge";
import { getRouteApi, Link } from "@tanstack/react-router";

const VISI_MISI_ITEMS = [
  { label: "DPM KM", value: "DPM" },
  { label: "Presiden BEM KM", value: "PRESIDENT" },
  { label: "Gubernur BEM Fakultas", value: "FACULTY_GOVERNOR" },
] as const;

export function BadgeVisiMisi() {
  const routeApi = getRouteApi("/_authenticated/");
  const { visiMisi, steps } = routeApi.useSearch();

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {VISI_MISI_ITEMS.map((item) => (
        <Link
          key={item.value}
          to="/"
          search={{
            steps: steps ?? 3,
            visiMisi: item.value,
          }}
        >
          <Badge
            variant={visiMisi === item.value ? "default" : "outline"}
            className="md:h-8 cursor-pointer px-4"
          >
            {item.label}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
