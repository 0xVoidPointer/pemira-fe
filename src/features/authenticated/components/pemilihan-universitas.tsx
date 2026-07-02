import { Crown, Hammer, NotebookPen } from "lucide-react";
import { SelectionCategory } from "./selection-category";

export default function PemilihanUniversitas() {
  return (
    <main className="flex flex-col gap-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <NotebookPen className="size-5 text-primary" />
            Pemilihan Level Universitas
          </h2>
          <p className="text-sm text-muted-foreground">
            Pilih satu kandidat untuk setiap posisi.
          </p>
        </div>
      </div>

      <SelectionCategory type="DPM" title="DPM KM" icon={Hammer} />
      <SelectionCategory type="PRESIDENT" title="BEM KM" icon={Crown} />
    </main>
  );
}
