import { z } from "zod";

export const signInSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(3, "Password length must be >= 3"),
});

export type SignInType = z.infer<typeof signInSchema>;
