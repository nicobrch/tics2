import React from 'react';
import type { Metadata } from 'next';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createUser } from '@/app/db';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Registrarse",
};

export default async function SignUp() {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Crear una Cuenta</CardTitle>
                    <CardDescription>Crea tu cuenta con tu correo y contraseña.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" action={async (formData: FormData) => {
                        'use server';
                        const email = formData.get('email') as string;
                        const password = formData.get('password') as string;
                        const role = formData.get('role') as string;
                        await createUser(email, password, role);
                        redirect('/login');
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
                        <div className="space-y-2">
                            <Label htmlFor="password">Rol</Label>
                            <Input
                                id="role"
                                name="role"
                                type="role"
                                placeholder="Ingresa rol de usuario"
                                required
                            />
                        </div>
                        <Button className="w-full" type="submit">
                            Registrarse
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}