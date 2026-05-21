import { cn } from "#/lib/utils";
import { getRouteApi } from "@tanstack/react-router";

export function Stepper() {
  const totalSteps: number = 5;

  const routeApi = getRouteApi("/_authenticated");

  const { steps } = routeApi.useSearch();

  return (
    <section className="flex flex-row gap-x-2">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          className={cn(
            `bg-primary w-2 h-2 rounded-sm transition-all duration-300 ease-in-out`,
            i !== steps - 1 ? "opacity-50" : "w-16",
          )}
          key={i}
        ></div>
      ))}
    </section>
  );
}
