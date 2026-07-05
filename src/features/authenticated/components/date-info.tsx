import { CalendarCheck2, CalendarClock, Clock, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { Progress } from "#/components/ui/progress";
import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";
import { useActiveSchedule } from "#/services/election/hooks/use-active-schedule";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

function formatTime(date: Date) {
  return `${new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(date)} WIB`;
}

function getDurationParts(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Effek kaca mengambang di atas background biru tipis */}
      <div className="flex size-15 items-center justify-center rounded-xl border border-primary/15 bg-background/80 shadow-sm backdrop-blur-sm sm:size-19 sm:rounded-2xl">
        <span className="font-mono text-[26px] font-bold tracking-tighter tabular-nums text-foreground sm:text-[34px]">
          {value}
        </span>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/60 sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

function DateCard({
  icon: Icon,
  label,
  date,
  time,
}: {
  icon: React.ElementType;
  label: string;
  date: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-background/70 p-4 backdrop-blur-sm transition-colors hover:bg-background/90">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 shadow-sm sm:size-11 sm:rounded-xl">
        <Icon className="size-4.5 text-primary sm:size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/50">
          {label}
        </p>
        <p className="truncate text-sm font-bold leading-snug text-foreground">
          {date}
        </p>
        <p className="text-xs font-medium text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

export function DateInfo() {
  const { data: schedule, isLoading } = useActiveSchedule();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const voteStartAt = useMemo(
    () => (schedule?.vote_start_at ? new Date(schedule.vote_start_at) : null),
    [schedule?.vote_start_at],
  );
  const voteEndAt = useMemo(
    () => (schedule?.vote_end_at ? new Date(schedule.vote_end_at) : null),
    [schedule?.vote_end_at],
  );

  const { status, parts, progress } = useMemo(() => {
    if (!voteStartAt || !voteEndAt)
      return { status: null, parts: null, progress: 0 };

    const startMs = voteStartAt.getTime();
    const endMs = voteEndAt.getTime();
    const isNotStarted = now < startMs;
    const isEnded = now >= endMs;
    const isActive = !isNotStarted && !isEnded;

    const target = isNotStarted ? startMs : endMs;
    const diff = Math.max(0, target - now);
    const elapsed = now - startMs;
    const total = endMs - startMs;
    const pct = isNotStarted
      ? 0
      : isEnded
        ? 100
        : Math.min(100, Math.max(0, (elapsed / total) * 100));

    return {
      status: {
        isNotStarted,
        isEnded,
        isActive,
        title: isNotStarted
          ? "DIMULAI DALAM"
          : isEnded
            ? "PEMILIHAN SELESAI"
            : "BERAKHIR DALAM",
        icon: isNotStarted ? Timer : isEnded ? Clock : Timer,
      },
      parts: getDurationParts(diff),
      progress: pct,
    };
  }, [now, voteStartAt, voteEndAt]);

  if (isLoading) {
    return (
      <Card className="border-primary/20 bg-primary/[0.07]">
        <CardContent className="space-y-6 p-5 sm:p-8">
          <Skeleton className="h-1.5 w-full rounded-full" />
          <div className="flex flex-col items-center gap-5 py-2">
            <Skeleton className="h-6 w-36 rounded-full" />
            <div className="flex items-center gap-2 sm:gap-3">
              {Array.from({ length: 7 }).map((_, i) =>
                i % 2 === 0 ? (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="size-15 rounded-xl bg-background/50 sm:size-19 sm:rounded-2xl" />
                    <Skeleton className="h-3 w-10 rounded" />
                  </div>
                ) : (
                  <Skeleton key={i} className="h-6 w-4 rounded" />
                ),
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Skeleton className="h-19 w-full rounded-xl bg-background/50" />
            <Skeleton className="h-19 rounded-xl bg-background/50" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!voteStartAt || !voteEndAt || !status || !parts) return null;

  return (
    <Card className="overflow-hidden border-primary/20 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
      {/* Accent line + Progress bar */}
      <div>
        <div
          className={cn(
            "h-0.5 w-full",
            status.isNotStarted && "bg-primary/60",
            status.isActive && "bg-primary/60",
            status.isEnded && "bg-muted-foreground/20",
          )}
        />
        <div className="px-5 pt-4 sm:px-8 sm:pt-5">
          <Progress
            value={progress}
            className={cn(
              "h-1 rounded-full bg-primary/10", // Track biru tipis
              status.isNotStarted && "[&>div]:bg-primary/70",
              status.isActive && "[&>div]:bg-primary",
              status.isEnded && "[&>div]:bg-muted-foreground/30",
            )}
          />
        </div>
      </div>

      <CardContent className="flex flex-col items-center gap-6 px-5 pb-6 pt-5 sm:gap-8 sm:px-8 sm:pb-8 sm:pt-6">
        {/* Status badge */}
        <Badge
          variant={
            status.isNotStarted
              ? "default"
              : status.isEnded
                ? "destructive"
                : "secondary"
          }
          className={cn(
            "gap-1.5 border px-4 py-1 text-[10px] font-bold tracking-[0.2em]",
            !status.isEnded && "animate-pulse",
            status.isActive &&
              "border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
          )}
        >
          <status.icon className="size-3" />
          {status.title}
        </Badge>

        {/* Countdown */}
        <div className="flex items-start gap-1.5 sm:gap-2.5">
          <CountdownUnit value={parts.days} label="Hari" />
          <span className="mt-3 text-lg font-bold text-primary/20 sm:mt-5 sm:text-2xl">
            :
          </span>
          <CountdownUnit value={parts.hours} label="Jam" />
          <span className="mt-3 text-lg font-bold text-primary/20 sm:mt-5 sm:text-2xl">
            :
          </span>
          <CountdownUnit value={parts.minutes} label="Menit" />
          <span className="mt-3 text-lg font-bold text-primary/20 sm:mt-5 sm:text-2xl">
            :
          </span>
          <CountdownUnit value={parts.seconds} label="Detik" />
        </div>

        {/* Progress label */}
        <p className="text-[11px] font-medium tabular-nums text-primary/40">
          {status.isEnded
            ? "Pemilihan telah selesai"
            : status.isNotStarted
              ? "Belum dimulai"
              : `${progress.toFixed(1)}% berjalan`}
        </p>

        {/* Dashed separator biru tipis */}
        <div className="w-full border-t border-dashed border-primary/15" />

        {/* Date cards */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <DateCard
            icon={CalendarCheck2}
            label="Mulai Pemilihan"
            date={formatDate(voteStartAt)}
            time={formatTime(voteStartAt)}
          />
          <DateCard
            icon={CalendarClock}
            label="Selesai Pemilihan"
            date={formatDate(voteEndAt)}
            time={formatTime(voteEndAt)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
