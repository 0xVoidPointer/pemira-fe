import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useVoteStore } from "@/stores/use-vote-store";
import { useCandidates, useSubmitVotes } from "@/services/election";

interface ConfirmVoteDialogProps {
  label: string;
}

export function ConfirmVoteDialog({ label }: ConfirmVoteDialogProps) {
  const navigate = useNavigate();
  const { votes, getVoteRequest, reset } = useVoteStore();
  const { mutate: submit, isPending } = useSubmitVotes();

  const president = useCandidates("PRESIDENT");
  const dpm = useCandidates("DPM");
  const faculty = useCandidates("FACULTY_GOVERNOR");

  const getSelectionSummary = () => {
    const summary = [];

    const findCandidate = (data: any[] | undefined, candidateId: string) =>
      data?.find((c) => c.id === candidateId);

    const formatValue = (candidate: any) => {
      if (!candidate) return "Dipilih";
      if (candidate.is_empty_box) return "Kotak Kosong";
      return `Paslon No. ${candidate.number}`;
    };

    const presidentCatId = president.data?.[0]?.category_id;
    if (presidentCatId && votes[presidentCatId]) {
      const candidate = findCandidate(president.data, votes[presidentCatId]);
      summary.push({
        label: "Presiden BEM KM",
        value: formatValue(candidate),
      });
    }

    const dpmCatId = dpm.data?.[0]?.category_id;
    if (dpmCatId && votes[dpmCatId]) {
      const candidate = findCandidate(dpm.data, votes[dpmCatId]);
      summary.push({
        label: "DPM KM",
        value: formatValue(candidate),
      });
    }

    const facultyCatId = faculty.data?.[0]?.category_id;
    if (facultyCatId && votes[facultyCatId]) {
      const candidate = findCandidate(faculty.data, votes[facultyCatId]);
      summary.push({
        label: "Gubernur BEM Fakultas",
        value: formatValue(candidate),
      });
    }

    return summary;
  };

  const handleSubmit = () => {
    submit(getVoteRequest(), {
      onSuccess: () => {
        reset();
        navigate({ to: "/selesai" });
      },
    });
  };

  const summary = getSelectionSummary();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className="flex flex-row gap-x-2 items-center justify-center truncate flex-1"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <span className="truncate">{label}</span>
              <ChevronRight />
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Pilihan</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-y-4">
              <p>
                Apakah Anda yakin dengan pilihan Anda? Tindakan ini tidak dapat
                dibatalkan.
              </p>
              <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
                {summary.length > 0 ? (
                  summary.map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-semibold text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-center text-muted-foreground">
                    Belum ada pilihan yang diambil.
                  </p>
                )}
            </div>
            {summary.length < 3 && (
              <p className="text-xs text-destructive font-medium bg-destructive/10 p-3 rounded-md border border-destructive/20">
                Mohon lengkapi semua pilihan (3/3) sebelum mengirim. Pastikan
                Anda telah memilih kandidat untuk semua kategori yang tersedia.
              </p>
            )}
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          disabled={isPending || summary.length < 3}
        >
          {isPending ? "Mengirim..." : "Ya, Kirim Pilihan"}
        </AlertDialogAction>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
