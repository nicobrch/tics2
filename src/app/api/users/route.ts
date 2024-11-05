import { z } from "zod"
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { admin } from '@/lib/auth-client';

export const dynamic = 'force-dynamic'; // defaults to auto

export const getUsersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.number(),
  image: z.string(),
  rol: z.string(),
});

export async function GET() {
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
      rol: user.role,
    })
    .from(user)
  return Response.json(users);
}

const createUserSchema = z.object({
  name: z.string(),
  password: z.string(),
  email: z.string(),
  role: z.literal("user") || z.literal("admin"),
});

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

  await admin.createUser({
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    role: validatedFields.data.role,
  })

  return Response.json({ message: "User created successfully" });
}