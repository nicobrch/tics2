import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { users, roles } from '@/app/schema';
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
export const db = drizzle(client);

export async function getUser(email: string) {
    return db.select({
        id: users.id,
        name: users.name,
        email: users.email,
        password: users.password,
        phone: users.phone,
        role: roles.name,
    }).from(users).leftJoin(roles, eq(users.roleId, roles.id)).where(eq(users.email, email));
}

export async function createUser(email: string, password: string, role: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    const roleId = await db.select().from(roles).where(eq(roles.name, role));
    return db.insert(users).values({ email: email, password: hash, roleId: roleId[0].id });
}