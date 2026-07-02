import { Badge } from "./badge";

export function Navbar() {
  return (
    <nav className="h-16 text-white px-4 md:px-8 w-full bg-primary flex flex-row items-center justify-between">
      <h1 className="font-bold text-md md:text-2xl leading-0">
        PEMIRA KAMPUS UDINUS
      </h1>
      <Badge variant={"secondary"} className="w-20 h-9 uppercase font-bold ">
        Aktif
      </Badge>
    </nav>
  );
}
