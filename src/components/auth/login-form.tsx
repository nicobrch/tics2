import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {

    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    placeholder="Ingresa tu email"
                    name="email"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    name="password"
                    required
                />
            </div>
            <Button className="w-full" type="submit">
                Ingresar
            </Button>
        </form>
    );
}