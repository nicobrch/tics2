"use client"

import { logoutAction } from "@/actions";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import React from "react";

const initialState = {
  message: ""
};

export function LogoutButton({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [, action] = useFormState(logoutAction, initialState);

  return (
    <form action={action}>
      <Button className={cn("", className)}{...props}>
        Cerrar Sesión
      </Button>
    </form>
  );
}