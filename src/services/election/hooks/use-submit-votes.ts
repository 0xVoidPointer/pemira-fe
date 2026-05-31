import { useMutation } from "@tanstack/react-query";
import { submitVotes } from "../api";

export function useSubmitVotes() {
  return useMutation({
    mutationFn: submitVotes,
  });
}
