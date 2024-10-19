import { db } from "@/db"
import { tickets, user } from "@/db/schema"
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const ticket = await db.select({
    id: tickets.id,
    title: tickets.title,
    status: tickets.status,
    priority: tickets.priority,
    assignee: user.name,
    created: tickets.createdAt
  }).from(tickets).leftJoin(user, eq(tickets.userId, user.id));
  return Response.json(ticket);
}