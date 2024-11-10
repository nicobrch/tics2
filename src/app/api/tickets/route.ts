import { db } from "@/app/db"
import { tickets, users, states, categories, sla } from "@/app/schema"
import { eq } from "drizzle-orm";
import { createTicketSchema } from '@/types/ticket';

export async function GET() {
    const ticket = await db
        .select({
            id: tickets.id,
            title: tickets.title,
            state: states.name,
            sla: sla.name,
            category: categories.name,
            assignee: users.name,
            created: tickets.createdAt
        })
        .from(tickets)
        .leftJoin(users, eq(tickets.userId, users.id))
        .leftJoin(states, eq(tickets.stateId, states.id))
        .leftJoin(categories, eq(tickets.categoryId, categories.id))
        .leftJoin(sla, eq(tickets.slaId, sla.id));
    return Response.json(ticket);
}

export async function POST(request: Request) {
    const formData = await request.formData();

    const validatedFields = createTicketSchema.safeParse({
        title: formData.get("title"),
        state: formData.get("state"),
        category: formData.get("category"),
        sla: formData.get("sla"),
        userEmail: formData.get("userEmail"),
    });

    if (!validatedFields.success){
        return Response.json({
            error: validatedFields.error.flatten().fieldErrors,
        });
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
    const userIdResult = await db.select({
        id: users.id,
    }).from(users).where(eq(users.email, validatedFields.data.userEmail));

    const categoryId = categoryIdResult[0]?.id;
    const stateId = stateIdResult[0]?.id;
    const slaId = slaIdResult[0]?.id;
    const userId = userIdResult[0]?.id;

    await db
        .insert(tickets)
        .values({
            title: validatedFields.data.title,
            userId: userId,
            categoryId: categoryId,
            stateId: stateId,
            slaId: slaId,
        })

    return Response.json({ message: "Ticket created successfully" });
}