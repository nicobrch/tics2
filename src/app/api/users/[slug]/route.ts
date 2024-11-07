import { db } from "@/db";
import { users, roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const slug = (await params).slug;
    if (!slug) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userResult = await db
        .select({
            email: users.email,
            name: users.name,
            role: roles.name,
        }).from(users)
        .leftJoin(roles, eq(users.roleId, roles.id))
        .where(eq(users.id, slug));

    if (userResult.length === 0) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(userResult[0], { status: 200 });
}