import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { Navbar } from "#/components/ui/navbar";
import { Stepper } from "#/components/ui/stepper";
import { BreadcrumbsPath, GreetingPill } from "#/features/authenticated";

const authenticatedSearchSchema = z.object({
  steps: z.number().min(2).max(5).catch(2),
});

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
  validateSearch: authenticatedSearchSchema,
});

function RouteComponent() {
  const { steps } = Route.useSearch();
  
  return (
    <main className="min-h-dvh flex flex-col">
      <Navbar />
      <section className="border-b-2 py-4 px-4 md:px-8 flex flex-row justify-between items-center">
        <BreadcrumbsPath steps={steps} />
        <Stepper steps={steps} />
      </section>
      <section className="w-full h-full flex-1 flex flex-col px-4 py-6 md:px-8">
        <GreetingPill />
        <p>oi</p>
      </section>
    </main>
  );
}
