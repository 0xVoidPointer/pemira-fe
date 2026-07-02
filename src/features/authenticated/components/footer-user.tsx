import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { getNext, getPrev, type VisiMisi } from "../utils/footer-nav";
import { ConfirmVoteDialog } from "./confirm-vote-dialog";

interface FooterUserProps {
  steps: number;
  visiMisi: VisiMisi;
}

export function FooterUser({ steps, visiMisi }: FooterUserProps) {
  const next = getNext(steps, visiMisi);
  const prev = getPrev(steps, visiMisi);

  return (
    <div
      className={cn(
        "flex flex-row justify-between gap-x-3 md:gap-x-4 items-center w-full px-4 py-6 md:px-8 border-t-2 bg-background",
        "pb-[max(env(safe-area-inset-bottom),1.5rem)]",
      )}
    >
      {prev && (
        <Link
          to={prev.to}
          search={"search" in prev ? prev.search : undefined}
          className="md:flex-1"
          aria-label={prev.label}
          resetScroll={true}
        >
          <Button className="w-full" variant="outline" size="lg">
            <ChevronLeft />
            <span className="hidden md:inline truncate">{prev.label}</span>
          </Button>
        </Link>
      )}
      {steps === 5 ? (
        <ConfirmVoteDialog label={next.label} />
      ) : (
        <Link
          to={next.to}
          search={"search" in next ? next.search : undefined}
          className="flex-1"
          resetScroll={true}
        >
          <Button
            size="lg"
            className="flex flex-row gap-x-2 items-center justify-center w-full truncate"
          >
            <span className="truncate">{next.label}</span>
            <ChevronRight />
          </Button>
        </Link>
      )}
    </div>
  );
}
