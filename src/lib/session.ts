"use server"
import {cookies} from 'next/headers';

type Session = {
    user: {
        userId: number
    }
    expires: Date
    iat: number
    exp: number
} | null;

type SessionUser = {
    email: string
    name: string
    role: string
    image?: string
} | null;

async function getSessionCookie() {
    const cookieStore = await cookies();
    return cookieStore.get("session")?.value;
}

export async function getSession() : Promise<Session> {
    const session = await getSessionCookie();
    const response = await fetch("http://localhost:3000/api/auth/session", {
        headers: {
            Cookie: `session=${session}`
        }
    });
    if (!response.ok) return null;
    return await response.json();
}

export async function getSessionUser() : Promise<SessionUser> {
    const session = await getSession();
    if (!session) return null;
    const response = await fetch(`http://localhost:3000/api/users/${session.user.userId}`);
    if (!response.ok) return null;
    return await response.json();
}

export async function verifySession() {
    const session = await getSessionCookie();
    const response = await fetch("http://localhost:3000/api/auth/session", {
        method: "POST",
        headers: {
            Cookie: `session=${session}`
        }
    });
    if (!response.ok) return null;
    return await response.json();
}