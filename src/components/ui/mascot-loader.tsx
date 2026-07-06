import { cn } from "#/lib/utils";

interface MascotLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function MascotLoader({
  className,
  text = "Memuat...",
  ...props
}: MascotLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 min-h-[200px] w-full",
        className,
      )}
      {...props}
    >
      <div className="flex items-end justify-center gap-2">
        {/* Dino (Left) - Floats first */}
        <div className="relative w-24 h-24 animate-float">
          <img
            src="/maskot dino.svg"
            alt="Mascot Dino"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Dina (Right) - Floats slightly delayed */}
        <div className="relative w-24 h-24 animate-float" style={{ animationDelay: "1.5s" }}>
          <img
            src="/maskot dina.svg"
            alt="Mascot Dina"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {text && (
        <p className="text-primary font-bold tracking-widest uppercase text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
