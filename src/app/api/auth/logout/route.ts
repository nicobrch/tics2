import { cookies } from "next/headers";

export async function POST() {
    // Remove the session cookie
    cookies().delete("session");
    cookies().set("session", "", { expires: new Date(0) });
    return Response.json({ message: "Logged out" }, { status: 200 });
}