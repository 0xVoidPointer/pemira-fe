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
  const json = await http.get("election/active-period", { signal }).json();
  try {
    return zGetApiElectionActivePeriodResponse.parse(json);
  } catch (error) {
    console.error("Zod parsing error in getActivePeriod:", error);
    console.log("Raw JSON response was:", json);
    return json as any;
  }
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
  try {
    return zGetApiElectionActivePeriodCategoriesResponse.parse(json);
  } catch (error) {
    console.error("Zod parsing error in getCategories for type", type, error);
    console.log("Raw JSON response was:", json);
    return json as any;
  }
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
  try {
    return zGetApiElectionActivePeriodCategoriesByTypeCandidatesResponse.parse(
      json,
    );
  } catch (error) {
    console.error("Zod parsing error in getCandidates for type", type, error);
    console.log("Raw JSON response was:", json);
    return json as any;
  }
}

export async function submitVotes(input: VoteRequest): Promise<void> {
  await http.post("election/active-period/votes", { json: input });
}

export async function votingSchedule(signal?: AbortSignal) {
  const json = await http
    .get("election/active-period/schedule", {
      signal,
    })
    .json();
  try {
    return zGetApiElectionActivePeriodScheduleResponse.parse(json);
  } catch (error) {
    console.error("Zod parsing error in votingSchedule:", error);
    console.log("Raw JSON response was:", json);
    return json as any;
  }
}
