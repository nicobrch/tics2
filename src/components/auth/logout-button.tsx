"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LogoutButton() {
    const { pending } = useFormStatus();

    return (
        pending ? (
            <Button disabled className="h-8">
                <Loader2 className="animate-spin" />
                Saliendo...
            </Button>
        ) : (
            <Button type="submit" className="h-8">
                Cerrar Sesión
            </Button>
        )
    );
}