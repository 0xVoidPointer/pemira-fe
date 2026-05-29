import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// TODO: Info Credentials Users
// type User = { identifier: string };

// type State = { token: string | null; user: User | null };
// type Actions = {
//   setSession: (token: string, user?: User) => void;
//   clear: () => void;
// };
type State = { token: string | null };
type Actions = {
  setSession: (token: string) => void;
  clear: () => void;
};

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      token: null,
      setSession: (token) => set({ token }),
      clear: () => set({ token: null }),
    }),
    {
      name: "pemira-auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
