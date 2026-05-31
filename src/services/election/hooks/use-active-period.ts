import { useQuery } from "@tanstack/react-query";
import { electionKeys } from "../keys";

export function useActivePeriod() {
  return useQuery(electionKeys.activePeriod);
}
