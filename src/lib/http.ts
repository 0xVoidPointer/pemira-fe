import ky from "ky";
import { env } from "#/env";
import { useAuthStore } from "#/stores/auth-store";

export const http = ky.create({
  baseUrl: env.VITE_API_URL,
  timeout: 15000,
  retry: 0,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const { token } = useAuthStore.getState();
        if (token) request.headers.set("Authorization", `Bearer ${token}`);
        request.headers.set("Accept", "application/json");
      },
    ],
    afterResponse: [
      async ({ response, request }) => {
        if (response.status !== 401) return response;
        if (
          request.url.includes("/api/student/auth") &&
          request.method === "POST"
        ) {
          return response;
        }
        useAuthStore.getState().clear();
        return response;
      },
    ],
  },
});
