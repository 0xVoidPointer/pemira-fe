import ky from "ky";
import { env } from "#/env";

export const http = ky.create({
  prefix: env.VITE_API_URL,
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
        const ERROR_CODES = [401, 404, 409];

        if (
          ERROR_CODES.includes(response.status) &&
          !(
            request.url.includes("/api/student/auth") &&
            request.method === "POST"
          )
        ) {
          window.dispatchEvent(new CustomEvent("auth:expired"));
        }

        if (!response.ok) {
          try {
            const clone = response.clone();
            const contentType = clone.headers.get("content-type");
            if (contentType?.includes("application/json")) {
              (response as any).errorBody = await clone.json();
            } else {
              (response as any).errorBody = { message: await clone.text() };
            }
          } catch {
            (response as any).errorBody = { message: null };
          }
        }

        return response;
      },
    ],
  },
});
