import { useQuery } from "@tanstack/react-query";
import type { ElectionCategoryType } from "../api";
import { electionKeys } from "../keys";

export function useCategories(type: ElectionCategoryType) {
  return useQuery(electionKeys.categories(type));
}
