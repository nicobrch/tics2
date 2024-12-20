import React from 'react';
import type { Metadata } from 'next';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from '@/app/auth';

export const metadata: Metadata = {
    title: "Iniciar Sesión",
};

export default async function Login() {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                    <CardDescription>Ingresa tus credenciales de acceso.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" action={async (formData: FormData) => {
                        'use server';
                        await signIn('credentials', {
                            email: formData.get('email') as string,
                            password: formData.get('password') as string,
                            redirectTo: "/",
                        })
                    }}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ingresa tu email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </div>
                        <Button className="w-full" type="submit">
                            Ingresar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}