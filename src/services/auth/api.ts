import type z from "zod";
import { http } from "#/lib/http";
import { zLoginRequestStudent } from "../_generated/schema";

export type LoginRequestStudent = z.infer<typeof zLoginRequestStudent>;

export async function studentLogin(input: LoginRequestStudent): Promise<void> {
  await http.post("student/auth", { json: input });
}

export async function verifySession(signal?: AbortSignal): Promise<true> {
  await http.get("student/auth/verify", { signal });
  return true;
}

export async function logout(): Promise<void> {
  await http.post("student/auth/logout");
}
