import z from "zod";

export const LoginRequestStudentSchema = z.object({
  identifier: z.string().max(255),
  password: z.string(),
});
