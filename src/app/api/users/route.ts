import { db } from "@/db";
import { user } from "@/db/schema";

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const users = await db.select().from(user);
  return Response.json(users);
}