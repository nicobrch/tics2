import { z } from "zod"
import { db } from "@/db"
import { auth } from "@/lib/auth"
import { tickets, user, states, categories, sla } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(request: Request){
  const body = await request.json();
  const { token } = body;
  if (token !== process.env.SEED_SECRET){
    return Response.json({
      error: "Token incorrecto",
    });
  }

  // Create users account using auth API
  await auth.api.signUpEmail({
    body: {
      name: "Admin",
      email: "admin@admin.com",
      password: "admin1234",
    }
  })
  await auth.api.signUpEmail({
    body: {
      name: "Nico",
      email: "nico@dev.com",
      password: "nico1234",
    }
  })

  // Assign roles to users accounts
  await db.update(user).set({
    role: "admin"
  }).where(eq(user.email, "admin@admin.com"))

  await db.update(user).set({
    role: "user"
  }).where(eq(user.email, "admin@admin.com"))

  // Create categories
  await db.insert(categories).values([
    { name: "Hardware" },
    { name: "Software" },
    { name: "Redes" },
  ])

  // Create states
  await db.insert(states).values([
    { name: "Abierto" },
    { name: "En Progreso" },
    { name: "Cerrado" },
  ])

  // Create SLA
  await db.insert(sla).values([
    { name: "SLA Bajo" },
    { name: "SLA Medio" },
    { name: "SLA Alto" },
  ])

  const userIdResult = await db.select({ id: user.id }).from(user).where(eq(user.email, "nico@dev.com"));
  const userId = userIdResult[0]?.id;

  // Create tickets
  await db.insert(tickets).values([
    {
      title: "Problema inicio de sesión.",
      userId: userId,
      categoryId: 2,
      stateId: 1,
      slaId: 3,
    },
    {
      title: "No conexión a Internet.",
      userId: userId,
      categoryId: 3,
      stateId: 1,
      slaId: 3,
    },
    {
      title: "Pantalla no enciende.",
      userId: userId,
      categoryId: 1,
      stateId: 1,
      slaId: 2,
    },
    {
      title: "No se tiene acceso a PowerPoint",
      userId: userId,
      categoryId: 2,
      stateId: 1,
      slaId: 1,
    },
    {
      title: "Teclado no funciona.",
      userId: userId,
      categoryId: 1,
      stateId: 1,
      slaId: 1,
    },
  ])

  return Response.json({ message: "Database seeded." });
}