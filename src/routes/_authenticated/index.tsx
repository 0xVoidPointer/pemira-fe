import { createFileRoute, Link } from "@tanstack/react-router";
import z from "zod";
import { Navbar } from "#/components/ui/navbar";
import { Stepper } from "#/components/ui/stepper";
import { breadcrumbsItems, BreadcrumbsPath } from "#/features/authenticated";
import { Dashboard } from "#/features/authenticated/components/dashboard";
import { Button } from "#/components/ui/button";
import { ChevronRight } from "lucide-react";
import { JSX } from "react";

const authenticatedSearchSchema = z.object({
  steps: z.number().min(2).max(5).catch(2),
});

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
  validateSearch: authenticatedSearchSchema,
});

function RouteComponent() {
  const { steps } = Route.useSearch();

  const nextMapper = breadcrumbsItems.map(({ name, step }) => ({ name, step }));

  const pageChanger: Record<number, JSX.Element> = {
    2: <Dashboard />,
    3: <p>test</p>,
    4: <p>test 2</p>,
    5: <p>test 3</p>,
    6: <p>test 4</p>,
  };

  return (
    <main className="min-h-dvh flex flex-col">
      <Navbar />
      <section className="border-b-2 py-4 px-4 md:px-8 flex flex-row justify-between items-center">
        <BreadcrumbsPath steps={steps} />
        <Stepper steps={steps} />
      </section>
      <section className="w-full h-full flex-1 flex flex-col px-4 py-6 md:px-8 justify-between">
        {pageChanger[steps]}
        <Link
          to="/"
          search={{
            steps: steps + 1,
          }}
        >
          <Button
            size={"lg"}
            className="flex flex-row gap-x-2 items-center justify-center w-full"
          >
            {steps + 1 === 6
              ? "TODO: Implement Last Page"
              : `Lanjutkan ke ${nextMapper[steps - 1]?.name}`}
            <ChevronRight />
          </Button>
        </Link>
      </section>
    </main>
  );
}
