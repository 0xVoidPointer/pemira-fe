import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { breadcrumbsItems } from "../utils/breadrumbs-items";

interface FooterUserProps {
  steps: number;
  visiMisi: "PRESIDENT" | "DPM" | "FACULTY_GOVERNOR";
}

export function FooterUser({ steps, visiMisi }: FooterUserProps) {
  const nextMapper = breadcrumbsItems.map(({ name, step }) => ({ name, step }));
  const isLastStep = steps + 1 === 6;

  return (
    <div className="flex flex-row gap-x-4 items-center justify-between">
      {steps > 2 ? (
        <Link
          className="w-full"
          to="/"
          search={(prev) => ({
            ...prev,
            steps: steps - 1,
            visiMisi: visiMisi,
          })}
        >
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex flex-row gap-x-2 items-center justify-center w-full mt-8"
          >
            <ChevronLeft />
            Kembali
          </Button>
        </Link>
      ) : null}
      <Link
        className="w-full"
        to={isLastStep ? "/" : "/"}
        // @ts-expect-error - search is required for to="/" but not for to="/selesai"
        search={
          isLastStep
            ? undefined
            : (prev: Record<string, unknown>) => ({
                ...prev,
                steps: steps + 1,
                visiMisi: visiMisi,
              })
        }
      >
        <Button
          size={"lg"}
          className="flex flex-row gap-x-2 items-center justify-center w-full mt-8 truncate"
        >
          {isLastStep ? "Selesai" : `${nextMapper[steps - 1]?.name}`}
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
}
