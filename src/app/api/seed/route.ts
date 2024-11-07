import { db } from "@/db"
import { tickets, users, states, categories, sla, roles } from "@/db/schema"
import { eq } from "drizzle-orm";
import { encrypt, encryptB64 } from '@/lib/hash';

export async function POST(request: Request){
    const body = await request.json();
    const { token } = body;
    if (token !== process.env.AUTH_SECRET){
        return Response.json({
            error: "Token incorrecto",
        });
    }

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

    // Create roles
    await db.insert(roles).values([
        { name: "Admin" },
        { name: "User" },
    ])

    // Create users
    await db.insert(users).values([
        {
            id: encryptB64("nico@dev.com"),
            email: "nico@dev.com",
            password: await encrypt("nico"),
            name: "Nico",
            roleId: 1,
        },
        {
            id: encryptB64("admin@admin.com"),
            email: "admin@admin.com",
            password: await encrypt("admin"),
            name: "Admin",
            roleId: 1,
        },
    ])

    const userIdResult = await db.select({ id: users.id }).from(users).where(eq(users.email, "nico@dev.com"));
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