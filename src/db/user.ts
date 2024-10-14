import {db} from "@/db";
import {hashPassword} from "@/lib/password";
import {User, usersTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function createUser(email: string, username: string, password: string): Promise<User> {
  const passwordHash = await hashPassword(password);
  const result = await db.insert(usersTable).values({
    email: email,
    name: username,
    password: passwordHash
  }).returning({ insertedId: usersTable.id });

  if (result === null) {
    throw new Error("Unexpected error");
  }
  const { insertedId } = result[0];

  return {
    id: insertedId,
    name: username,
    email: email,
    password: passwordHash
  };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (result.length === 0) {
    return null;
  }
  return {
    id: result[0].id,
    name: result[0].name,
    email: result[0].email,
    password: result[0].password
  };
}

export async function updateUserByEmail(user: User) : Promise<{id: number} | null> {
  const passwordHash = await hashPassword(user.password);
  const result = await db.update(usersTable).set({
    email: user.email,
    name: user.name,
    password: passwordHash
  }).where(eq(usersTable.email, user.email)).returning({ updatedId: usersTable.id });
  if (result === null) {
    return null;
  }
  const { updatedId } = result[0];
  return {
    id: updatedId
  };
}