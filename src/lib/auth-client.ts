import { createAuthClient } from "better-auth/react"

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: BASE_URL // the base url of your auth server
})