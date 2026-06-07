import type z from "zod";
import { http } from "#/lib/http";
import {
  zLoginRequestStudent,
  zPostApiStudentAuthLogoutResponse,
  zPostApiStudentAuthResponse,
} from "../_generated/schema";

export type LoginRequestStudent = z.infer<typeof zLoginRequestStudent>;

export async function studentLogin(input: LoginRequestStudent) {
  const json = await http.post("student/auth", { json: input }).json();

  return zPostApiStudentAuthResponse.parse(json);
}

export async function verifySession(signal?: AbortSignal): Promise<true> {
  await http.get("student/auth/verify", { signal });
  return true;
}

export async function logout() {
  const json = await http.post("student/auth/logout").json();

  return zPostApiStudentAuthLogoutResponse.parse(json);
}
