import {cookies} from "next/headers";
import {cache} from "react";
import {SessionValidationResult, validateSessionToken} from "@/auth/session";

export function setSessionTokenCookie(token: string, expiresAt: Date): void {
  cookies().set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/"
  });
}

export function deleteSessionTokenCookie(): void {
  cookies().set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = cookies().get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  return await validateSessionToken(token);
});
