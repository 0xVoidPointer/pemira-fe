import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { Navbar } from "#/components/ui/navbar";
import { Stepper } from "#/components/ui/stepper";
import { BreadcrumbsPath, FooterUser } from "#/features/authenticated";
import { Dashboard } from "#/features/authenticated/components/dashboard";
import { JSX, useEffect, useRef } from "react";
import { cn } from "#/lib/utils";
import { VisiMisi } from "#/features/authenticated/components/visi-misi";
import PemilihanUniversitas from "#/features/authenticated/components/pemilihan-universitas";
import PemilihanFakultas from "#/features/authenticated/components/pemilihan-fakultas";
import { zElectionCategoryType } from "#/services/_generated/schema";

const authenticatedSearchSchema = z.object({
  steps: z.number().min(2).max(5).catch(2),
  visiMisi: zElectionCategoryType.catch("DPM"),
});

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
  validateSearch: authenticatedSearchSchema,
});

function RouteComponent() {
  const { steps, visiMisi } = Route.useSearch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const prevStepRef = useRef(steps);
  const dirRef = useRef<"forward" | "backward">("forward");

  if (steps > prevStepRef.current) dirRef.current = "forward";
  if (steps < prevStepRef.current) dirRef.current = "backward";
  
  const direction = dirRef.current;

  useEffect(() => {
    prevStepRef.current = steps;
  }, [steps]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [steps, visiMisi]);

  const pageChanger: Record<number, JSX.Element> = {
    2: <Dashboard />,
    3: <VisiMisi />,
    4: <PemilihanUniversitas />,
    5: <PemilihanFakultas />,
  };

  return (
    <main className="h-dvh flex flex-col overflow-hidden">
      <header className="flex-none">
        <Navbar />
        <section className="border-b-2 py-4 px-4 md:px-8 flex flex-row justify-between items-center">
          <BreadcrumbsPath steps={steps} />
          <Stepper steps={steps} />
        </section>
      </header>
      <section
        ref={scrollContainerRef}
        className="w-full flex-1 overflow-y-auto px-4 py-6 md:px-8"
      >
        <div
          key={steps}
          className={cn(
            "animate-once animate-ease-in-out animate-normal animate-fill-forwards",
            steps === 2
              ? "animate-fade"
              : direction === "forward"
                ? "animate-fade-right"
                : "animate-fade-left",
          )}
        >
          {pageChanger[steps]}
        </div>
      </section>
      <footer className="flex-none">
        <FooterUser steps={steps} visiMisi={visiMisi} />
      </footer>
    </main>
  );
}
