import type z from "zod";
import { LoginRequestStudentSchema } from "./schema";
import { http } from "#/lib/http";

export type LoginRequestStudent = z.infer<typeof LoginRequestStudentSchema>;

export async function studentLogin(input: LoginRequestStudent) {
  await http.post("student/auth", { json: input });
}

export async function verifySession(signal?: AbortSignal) {
  await http.get("student/auth/verify", { signal });
  return true;
}

export async function logout() {
  await http.post("student/auth/logout");
}
