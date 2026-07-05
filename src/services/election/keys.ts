import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  getActivePeriod,
  getCandidates,
  getCategories,
  votingSchedule,
  type ElectionCategoryType,
} from "./api";

export const electionKeys = createQueryKeys("election", {
  activePeriod: {
    queryKey: null,
    queryFn: ({ signal }) => getActivePeriod(signal),
  },
  categories: (type?: ElectionCategoryType) => ({
    queryKey: type ? [type] : ["all"],
    queryFn: ({ signal }) => getCategories(type, signal),
  }),
  candidates: (type: ElectionCategoryType) => ({
    queryKey: [type],
    queryFn: ({ signal }) => getCandidates(type, signal),
  }),
  votingSchedule: {
    queryKey: null,
    queryFn: ({ signal }) => votingSchedule(signal),
  },
});
