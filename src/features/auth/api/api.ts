import type z from "zod";
import { LoginRequestStudentSchema, LoginResponseSchema } from "./schema";
import { http } from "#/lib/http";

export type LoginRequestStudent = z.infer<typeof LoginRequestStudentSchema>;

export async function studentLogin(input: LoginRequestStudent) {
  const json = await http.post("student/auth", { json: input }).json();
  return LoginResponseSchema.parse(json);
}

export async function verifySession(signal?: AbortSignal) {
  await http.get("student/auth/verify", { signal });
  return true;
}
