import { useQuery } from "@tanstack/react-query";
import { electionKeys } from "../keys";

export function useActiveSchedule() {
  return useQuery(electionKeys.votingSchedule);
}
