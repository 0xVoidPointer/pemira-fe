import { useQuery } from "@tanstack/react-query";
import type { ElectionCategoryType } from "../api";
import { electionKeys } from "../keys";

export function useCandidates(type: ElectionCategoryType) {
  return useQuery(electionKeys.candidates(type));
}
