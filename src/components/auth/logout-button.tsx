"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth-client";
import { useRouter } from 'next/navigation'
import React from "react";

export function LogoutButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  return (
    <div>
      <Button className={cn("", className)}{...props} onClick={async () => {
        await signOut();
        router.push("/login");
      }}>
        Cerrar Sesión
      </Button>
    </div>
  );
}