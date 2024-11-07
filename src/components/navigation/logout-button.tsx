"use client"
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            console.error("Failed to logout");
            return;
        }
        router.push("/login");
    }

    return (
        <Button className="h-8" onClick={handleLogout}>
            Cerrar Sesión
        </Button>
    )
}