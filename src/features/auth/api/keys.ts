import { createQueryKeys } from "@lukemorales/query-key-factory";
import { verifySession } from "./api";

export const authKeys = createQueryKeys("auth", {
  session: {
    queryKey: null,
    queryFn: ({ signal }) => verifySession(signal),
  },
});
