import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    role: z.string(),
    phone: z.string().optional(),
});

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
})

export type User = z.infer<typeof userSchema>;