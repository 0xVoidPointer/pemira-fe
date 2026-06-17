import type z from "zod";
import { http } from "#/lib/http";
import {
  zElectionCategoryType,
  zGetApiElectionActivePeriodCategoriesByTypeCandidatesResponse,
  zGetApiElectionActivePeriodCategoriesResponse,
  zGetApiElectionActivePeriodResponse,
  zGetApiElectionActivePeriodScheduleResponse,
  zVoteRequest,
} from "../_generated/schema";

export type ElectionCategoryType = z.infer<typeof zElectionCategoryType>;
export type VoteRequest = z.infer<typeof zVoteRequest>;

const TYPE_PATH_MAP: Record<
  ElectionCategoryType,
  "president" | "dpm" | "faculty"
> = {
  PRESIDENT: "president",
  DPM: "dpm",
  FACULTY_GOVERNOR: "faculty",
};

export async function getActivePeriod(signal?: AbortSignal) {
  const json = await http
    .get("election/active-period", { signal })
    .json();
  return zGetApiElectionActivePeriodResponse.parse(json);
}

export async function getCategories(
  type: ElectionCategoryType,
  signal?: AbortSignal,
) {
  const json = await http
    .get("election/active-period/categories", {
      searchParams: { type },
      signal,
    })
    .json();
  return zGetApiElectionActivePeriodCategoriesResponse.parse(json);
}

export async function getCandidates(
  type: ElectionCategoryType,
  signal?: AbortSignal,
) {
  const pathType = TYPE_PATH_MAP[type];
  const json = await http
    .get(`election/active-period/categories/${pathType}/candidates`, {
      signal,
    })
    .json();
  return zGetApiElectionActivePeriodCategoriesByTypeCandidatesResponse.parse(
    json,
  );
}

export async function submitVotes(input: VoteRequest): Promise<void> {
  await http.post("election/active-period/votes", { json: input });
}

export async function votingSchedule(signal?: AbortSignal) {
  const json = await http.get("election/active-period/schedule", {
    signal
  }).json();
  return zGetApiElectionActivePeriodScheduleResponse.parse(json);
}
