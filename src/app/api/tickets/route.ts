import { db } from "@/db"
import { tickets, user, states, categories, sla } from "@/db/schema"
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const ticket = await db
    .select({
      id: tickets.id,
      title: tickets.title,
      state: states.name,
      sla: sla.name,
      category: categories.name,
      assignee: user.name,
      created: tickets.createdAt
    })
    .from(tickets)
    .leftJoin(user, eq(tickets.userId, user.id))
    .leftJoin(states, eq(tickets.stateId, states.id))
    .leftJoin(categories, eq(tickets.categoryId, categories))
    .leftJoin(sla, eq(tickets.slaId, sla));
  return Response.json(ticket);
}