import React from 'react';
import { signOut } from "@/app/auth";
import LogoutButton from "@/components/auth/logout-button";

export default function LogoutForm() {
    return (
        <form action={async () => {
            "use server"
            await signOut();
        }}>
            <LogoutButton/>
        </form>
    )
}