import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import type { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';
import { getSessionUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Iniciar Sesión",
};

export default async function Page() {
    const user = await getSessionUser();
    if (user){
        redirect("/dashboard");
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                    <CardDescription>Ingresa tus credenciales de acceso.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}