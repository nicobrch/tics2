import { object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(3, "Password must be more than 3 characters")
    .max(255, "Password must be less than 255 characters"),
})

export const signUpSchema = object({
  username: string({ required_error: "Username is required" })
    .min(2, "Username must be more than 2 characters")
    .max(255, "Username must be less than 255 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(3, "Password must be more than 3 characters")
    .max(255, "Password must be less than 255 characters"),
})