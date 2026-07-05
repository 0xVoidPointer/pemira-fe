import { create } from "zustand";
import { persist } from "zustand/middleware";
import { zPostApiStudentAuthResponse } from "#/services/_generated/schema.ts";
import { z } from "zod/v4";

type User = z.infer<typeof zPostApiStudentAuthResponse>;

interface UserState {
  user: User | null;
}

interface UserActions {
  setUser: (user: User | null) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),
      getUser: () => get().user,
      deleteUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
