import { Badge } from "#/components/ui/badge";
import { env } from "#/env";

export function GreetingPill() {
  return (
    <div className="bg-primary/10 border-border border w-full px-4 py-6 md:px-8 rounded-2xl h-fit flex flex-col gap-y-2 justify-center text-primary">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-black text-xl md:text-3xl leading-tight">
          Halo, John Doe! 👋
        </h1>
        <Badge
          variant={"outline"}
          className="border-primary items-center justify-center py-1 px-4 gap-x-2"
        >
          <div className="w-3 h-3 bg-blue-800 rounded-full animate-pulse" />
          Sudah Dimulai
        </Badge>
      </div>
      <p className="text-sm md:text-lg opacity-90">
        Selamat datang di {env.VITE_PEMIRA_TITLE} — Pastikan suaramu tercatat
        hari ini.
      </p>
    </div>
  );
}
