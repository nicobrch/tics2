import { z } from "zod";

export const ticketSchema = z.object({
    id: z.string(),
    title: z.string(),
    state: z.string(),
    sla: z.string(),
    category: z.string(),
    assignee: z.string(),
    created: z.string(),
});

export const createTicketSchema = z.object({
    title: z.string(),
    state: z.string(),
    category: z.string(),
    sla: z.string(),
    userEmail: z.string(),
});

export type Ticket = z.infer<typeof ticketSchema>;
export type CreateTicket = z.infer<typeof createTicketSchema>;