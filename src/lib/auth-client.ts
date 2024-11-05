import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export const { signIn, signUp, signOut, useSession, admin } = createAuthClient({
  baseURL: BASE_URL, // the base url of your auth server
  plugins: [
    adminClient()
  ]
})