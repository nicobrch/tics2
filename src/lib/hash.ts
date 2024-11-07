import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const secretKey = process.env.AUTH_SECRET;
if (!secretKey) throw new Error("AUTH_SECRET env variable is required");
const key = new TextEncoder().encode(secretKey);

export async function encrypt(input: string){
    return await bcrypt.hash(input, saltRounds);
}

export async function compare(input: string, hash: string){
    return await bcrypt.compare(input, hash);
}

export function encryptB64(input: string){
    return Buffer.from(input).toString("base64");
}

export async function encryptJWT(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}

export async function decryptJWT(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error: any) {
        console.log("Failed to verify session: ", error.message);
    }
}