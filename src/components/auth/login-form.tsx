import React from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/app/auth";
import LoginButton from "@/components/auth/login-button";

export default function LoginForm() {
    return (
        <form className="space-y-4" action={async (formData: FormData) => {
            'use server';
            await signIn('credentials', {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
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
            <LoginButton />
        </form>
    );
}