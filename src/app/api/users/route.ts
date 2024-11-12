import { db } from "@/app/db";
import { users, roles } from "@/app/schema";
import { eq } from "drizzle-orm";
import { createUserSchema } from "@/types/user";

export const dynamic = "force-dynamic";

export async function GET() {
  const response = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      rol: roles.name,
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id));
  return Response.json(response);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const validatedFields = createUserSchema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
    email: formData.get("email"),
    role: formData.get("role"),
  });

  if (!validatedFields.success){
    return Response.json({
      error: validatedFields.error.flatten().fieldErrors,
    });
  }

  return Response.json({ message: "User created successfully" });
}