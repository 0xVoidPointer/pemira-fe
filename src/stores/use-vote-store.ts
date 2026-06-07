import { create } from "zustand";
// import { persist } from "zustand/middleware";
import type { VoteRequest } from "#/services/election";

interface VoteState {
  votes: Record<string, string>;
}

interface VoteActions {
  setVote: (categoryId: string, candidateId: string) => void;
  clearVote: (categoryId: string) => void;
  getVoteRequest: () => VoteRequest;
  reset: () => void;
}

export const useVoteStore = create<VoteState & VoteActions>()((set, get) => ({
  votes: {},

  setVote: (categoryId, candidateId) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [categoryId]: candidateId,
      },
    })),

  clearVote: (categoryId) =>
    set((state) => {
      const { [categoryId]: _, ...rest } = state.votes;
      return { votes: rest };
    }),

  getVoteRequest: () => {
    const votes = get().votes;
    return {
      votes: Object.entries(votes).map(([category_id, candidate_id]) => ({
        category_id,
        candidate_id,
      })),
    };
  },

  reset: () => set({ votes: {} }),
}));
