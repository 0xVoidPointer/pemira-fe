import { env } from "#/env";
import { Badge } from "./badge";

export function Navbar() {
  return (
    <nav
      className="h-16 text-white px-4 md:px-8 w-full bg-primary flex flex-row items-center justify-between"
      aria-label="Main navigation"
    >
      <h1 className="font-bold text-base md:text-2xl leading-0">
        {env.VITE_PEMIRA_TITLE}
      </h1>
      <Badge
        variant={"secondary"}
        className="w-20 h-9 uppercase font-bold"
        aria-label="Status pemilihan: Aktif"
      >
        Aktif
      </Badge>
    </nav>
  );
}
