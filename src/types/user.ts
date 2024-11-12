import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    rol: z.string(),
    phone: z.string().optional(),
});

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
})

export type UserSchema = z.infer<typeof userSchema>;