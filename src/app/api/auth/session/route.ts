import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { decryptJWT, encryptJWT } from '@/lib/hash';
import { redirect } from 'next/navigation';

export async function GET(){
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return Response.json({ error: "No session" }, { status: 401 });
    const decryptSession = await decryptJWT(session);
    return Response.json(decryptSession, { status: 200 });
}

export async function POST(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) redirect("/login");

    // Refresh the session so it doesn't expire
    const parsed = await decryptJWT(session);
    parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encryptJWT(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}