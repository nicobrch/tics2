"use server";

import { globalPOSTRateLimit } from "@/lib/request";
import {createSession, generateSessionToken, invalidateSession} from "@/auth/session";
import {deleteSessionTokenCookie, getCurrentSession, setSessionTokenCookie} from "@/auth/cookies";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { RefillingTokenBucket, Throttler } from "@/lib/rate-limit";
import { signInSchema, signUpSchema } from "@/lib/email";
import {createUser, getUserByEmail, updateUserByEmail} from "@/db/user";
import {hashPassword, verifyPasswordHash} from "@/lib/password";

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);
const ipBucket = new RefillingTokenBucket<string>(20, 1);

export async function logoutAction(): Promise<ActionResult> {
  if (!globalPOSTRateLimit()) {
    return {
      message: "Too many requests"
    };
  }
  const { session } = await getCurrentSession();
  if (session === null) {
    return {
      message: "Not authenticated"
    };
  }
  await invalidateSession(session.id);
  deleteSessionTokenCookie();
  return redirect("/login");
}


export async function loginAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!globalPOSTRateLimit()) {
    return {
      message: "Too many requests"
    };
  }
  // TODO: Assumes X-Forwarded-For is always included.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    return {
      message: "Too many requests"
    };
  }

  const formEmail = formData.get("email");
  const formPassword = formData.get("password");

  const { email, password } = await signInSchema.parseAsync({
    email: formEmail,
    password: formPassword
  });

  const user = await getUserByEmail(email);
  if (user === null) {
    return {
      message: "Account does not exist"
    };
  }

  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return {
      message: "Too many requests"
    };
  }

  if (!throttler.consume(user.id)) {
    return {
      message: "Too many requests"
    };
  }

  const validPassword = await verifyPasswordHash(password, user.password);
  if (!validPassword) {
    return {
      message: "Invalid password"
    };
  }

  throttler.reset(user.id);
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect("/");
}

export async function signupAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!globalPOSTRateLimit()) {
    return {
      message: "Too many requests"
    };
  }

  // TODO: Assumes X-Forwarded-For is always included.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    return {
      message: "Too many requests"
    };
  }

  const formEmail = formData.get("email");
  const formUsername = formData.get("username");
  const formPassword = formData.get("password");
  const { username, email, password } = await signUpSchema.parseAsync({
    username: formUsername,
    email: formEmail,
    password: formPassword
  });
  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return {
      message: "Too many requests"
    };
  }
  const user = await createUser(email, username, password);
  if (user === null) {
    return {
      message: "Failed to create account"
    };
  }
  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionTokenCookie(sessionToken, session.expiresAt);
  return redirect("/");
}

export async function restorePasswordAction(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!globalPOSTRateLimit()) {
    return {
      message: "Too many requests"
    };
  }

  // TODO: Assumes X-Forwarded-For is always included.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
    return {
      message: "Too many requests"
    };
  }

  const formEmail = formData.get("email");
  const formPassword = formData.get("password");
  const { email, password } = await signInSchema.parseAsync({
    email: formEmail,
    password: formPassword
  });
  if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
    return {
      message: "Too many requests"
    };
  }
  const user = await updateUserByEmail({
    id: 0,
    email: email,
    password: password,
    name: ""
  });
  if (user === null) {
    return {
      message: "Failed to update account"
    };
  }
  return redirect("/login");
}

interface ActionResult {
  message: string;
}