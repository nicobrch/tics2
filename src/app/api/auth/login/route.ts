import { encryptJWT } from '@/lib/hash';
import { cookies } from "next/headers";
import { z } from 'zod';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { compare } from '@/lib/hash';

const signInSchema = z.object({
    email: z.string().email({ message: "El email no es válido." }).trim(),
    password: z.string()
        .min(4, { message: "La contraseña debe tener al menos 4 caracteres" })
        .regex(/[a-zA-Z]/, { message: "La contraseña debe tener al menos una letra." })
        .trim()
});

export async function POST(request: Request) {
    const formData = await request.formData();

    // Validate the formData fields & get the user
    const validatedFields = signInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return Response.json({ message: validatedFields.error.flatten().fieldErrors });
    }

    const userResult = await db
        .select({
            id: users.id,
            password: users.password,
        })
        .from(users)
        .where(eq(users.email, validatedFields.data.email));

    if (userResult.length === 0) {
        return Response.json({ message: { email: "Usuario o contraseña incorrectos." } });
    }

    // Check the password
    const userPassword = userResult[0].password;

    if (!await compare(validatedFields.data.password, userPassword)) {
        return Response.json({ message: { email: "Usuario o contraseña incorrectos." } });
    }

    const user = {
        userId: userResult[0].id,
    };

    // Create the session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encryptJWT({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    // Redirect to dashboard
    return Response.json({ message: "OK" }, { status: 200 });
}