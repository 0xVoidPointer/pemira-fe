import { cn } from "#/lib/utils";
import { useState } from "react";

export function Stepper() {
  const totalSteps: number = 3;

  const [steps, setSteps] = useState<number>(0);

  return (
    <section className="flex flex-row gap-x-2">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          className={cn(
            `bg-primary w-8 h-2 rounded-sm`,
            i !== steps ? "opacity-50" : "w-16",
          )}
          key={i}
        ></div>
      ))}
    </section>
  );
}
