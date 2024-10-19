import { db } from "@/db";
import { user } from "@/db/schema";

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET() {
  const users = await db.select({
    id: user.id,
    name: user.name,
    email: user.email
  }).from(user);
  return Response.json(users);
}