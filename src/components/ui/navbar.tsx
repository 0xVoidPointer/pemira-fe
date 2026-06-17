import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="h-16 text-white px-4 md:px-8 w-full bg-primary flex flex-row items-center justify-between">
      <h1 className="font-bold text-md md:text-2xl leading-0">
        PEMIRA KAMPUS UDINUS
      </h1>
      <Button className="bg-white/20 uppercase rounded-full font-bold">
        Aktif
      </Button>
    </nav>
  );
}
