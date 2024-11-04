import { z } from "zod"
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
    .leftJoin(categories, eq(tickets.categoryId, categories.id))
    .leftJoin(sla, eq(tickets.slaId, sla.id));
  return Response.json(ticket);
}

const createTicketSchema = z.object({
  title: z.string(),
  state: z.string(),
  category: z.string(),
  sla: z.string(),
  userId: z.string(),
});

export async function POST(request: Request) {
  const formData = await request.formData();

  const validatedFields = createTicketSchema.safeParse({
    title: formData.get("title"),
    state: formData.get("state"),
    category: formData.get("category"),
    sla: formData.get("sla"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const categoryIdResult = await db.select({
    id: categories.id,
  }).from(categories).where(eq(categories.name, validatedFields.data.category));
  const stateIdResult = await db.select({
    id: states.id,
  }).from(states).where(eq(states.name, validatedFields.data.state));
  const slaIdResult = await db.select({
    id: sla.id,
  }).from(sla).where(eq(sla.name, validatedFields.data.sla));

  const categoryId = categoryIdResult[0]?.id;
  const stateId = stateIdResult[0]?.id;
  const slaId = slaIdResult[0]?.id;

  await db
    .insert(tickets)
    .values({
      title: validatedFields.data.title,
      userId: validatedFields.data.userId,
      categoryId: categoryId,
      stateId: stateId,
      slaId: slaId,
    })

  return Response.json({ message: "Ticket created successfully" });
}