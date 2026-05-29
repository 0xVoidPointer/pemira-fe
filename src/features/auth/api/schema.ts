import z from "zod";

export const LoginRequestStudentSchema = z.object({
  identifier: z.string().max(255),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
});
