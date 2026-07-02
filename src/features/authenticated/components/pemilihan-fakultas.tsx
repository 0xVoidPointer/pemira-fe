import { NotebookPen, UsersRound } from "lucide-react";
import { SelectionCategory } from "./selection-category";

export default function PemilihanFakultas() {
  return (
    <main className="flex flex-col gap-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <NotebookPen className="size-5 text-primary" />
            Pemilihan Level Fakultas
          </h2>
          <p className="text-sm text-muted-foreground">
            Pilih pasangan calon Gubernur BEM Fakultas
          </p>
        </div>
      </div>
      <SelectionCategory type="FACULTY_GOVERNOR" title="Gubernur BEM" icon={UsersRound} />
    </main>
  );
}
