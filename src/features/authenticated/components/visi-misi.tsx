import { Users } from "lucide-react";
import { BadgeVisiMisi } from "./badge-visimisi";
import { CalonCard } from "./calon-card";
import { getRouteApi } from "@tanstack/react-router";

/**
 * 1. fetch /api/election/active-period/categories
 * nanti main pagenya loading yang bagian bawah BadgeVisiMisi,
 * 2. habis itu, filter dulu data yang sesuai dengan routeAPI (where type == visiMisi)
 * passing categorynya ke componen tsb, nnti disana fetching lagi
 */
export function VisiMisi() {
  const routeApi = getRouteApi("/_authenticated/");

  const { visiMisi } = routeApi.useSearch();

  return (
    <main className="animate-fade-right animate-once animate-ease-in-out animate-normal animate-fill-forwards flex flex-col gap-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Visi &amp; Misi Setiap Calon
          </h2>
          <p className="text-sm text-muted-foreground">
            Pelajari visi, misi, dan program kerja setiap calon sebelum memilih.
          </p>
        </div>
      </div>
      <BadgeVisiMisi electionCategory={visiMisi} />
      <CalonCard electionCategory={visiMisi} />
    </main>
  );
}
