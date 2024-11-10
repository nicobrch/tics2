"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoginButton() {
    const { pending } = useFormStatus();

    return (
        pending ? (
            <Button disabled className="w-full">
                <Loader2 className="animate-spin" />
                Ingresando...
            </Button>
        ) : (
            <Button type="submit" className="w-full">
                Ingresar
            </Button>
        )
    );
}