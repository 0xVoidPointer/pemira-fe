import { Progress } from "#/components/ui/progress";

export function GreetingPill() {
  return (
    <div className="bg-primary/10 border-border border w-full px-4 py-6 md:px-8 rounded-2xl h-fit flex flex-col gap-y-2 justify-center text-primary">
      <h1 className="font-black text-xl md:text-3xl leading-tight">
        Halo, John Doe! 👋
      </h1>
      <p className="text-sm md:text-lg opacity-90">
        Selamat datang di PEMIRA 2026 — Pastikan suaramu tercatat hari ini.
      </p>
      <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 sm:items-center justify-between mt-2">
        <div className="flex-1 w-full">
          <Progress value={63} />
        </div>
        <div className="shrink-0">
          <p className="text-xs md:text-sm font-medium">
            63% Persen Sudah Memilih
          </p>
        </div>
      </div>
    </div>
  );
}
