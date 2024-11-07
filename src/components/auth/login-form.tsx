"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ErrorResponse = {
    email?: string,
    password?: string[],
    server?: string
}

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse>({});
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError({});

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            if (typeof data.message === "object" && (data.message.email || data.message.password || data.message.server)) {
                setError(data.message);
                console.log(data.message);
                return;
            }

            router.push("/dashboard");

        } catch (err: unknown) {
            setError(err instanceof Error ? { server: err.message } : { server: "Error desconocido" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    placeholder="Ingresa tu email"
                    name="email"
                    required
                />
                {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    required
                />
                {error.password && Array.isArray(error.password) ?
                    error.password.map((err, index) =>
                        <p key={index} className="text-red-500 text-sm">{err}</p>)
                    : <p className="text-red-500 text-sm">{error.password}</p>
                }
            </div>
            {loading ? (
                <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ingresando...
                </Button>
            ) : (
                <Button className="w-full" type="submit">
                    Ingresar
                </Button>
            )}
            {error.server && <p className="text-red-500 text-sm">{error.server}</p>}
        </form>
    );
}