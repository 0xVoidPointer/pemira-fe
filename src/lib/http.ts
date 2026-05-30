import ky from "ky";
import { env } from "#/env";

export const http = ky.create({
  baseUrl: env.VITE_API_URL,
  credentials: "include",
  timeout: 15_000,
  retry: 0,
  hooks: {
    beforeRequest: [
      ({ request }) => {
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
        window.dispatchEvent(new CustomEvent("auth:expired"));
        return response;
      },
    ],
  },
});
