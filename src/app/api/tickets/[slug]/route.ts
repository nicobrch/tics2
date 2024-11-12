import { db } from "@/app/db"
import { tickets, users, states, categories, sla } from "@/app/schema"
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { slug: number } }) {
    const { slug } = params;

    const ticket = await db
        .select({
            id: tickets.id,
            title: tickets.title,
            description: tickets.description,
            state: states.name,
            sla: sla.name,
            category: categories.name,
            assignee: users.name,
            created: tickets.createdAt,
            updated: tickets.updatedAt
        })
        .from(tickets)
        .leftJoin(users, eq(tickets.userId, users.id))
        .leftJoin(states, eq(tickets.stateId, states.id))
        .leftJoin(categories, eq(tickets.categoryId, categories.id))
        .leftJoin(sla, eq(tickets.slaId, sla.id))
        .where(eq(tickets.id, slug));
    return Response.json(ticket);
}