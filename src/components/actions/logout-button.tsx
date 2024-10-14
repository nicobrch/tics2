"use client"

import { logoutAction } from "@/actions";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";

const initialState = {
  message: ""
};

export function LogoutButton() {
  const [, action] = useFormState(logoutAction, initialState);

  return (
    <form action={action}>
      <Button>Cerrar Sesión</Button>
    </form>
  );
}