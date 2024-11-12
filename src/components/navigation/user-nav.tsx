import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import LogoutForm from '@/components/auth/logout-form';
import ThemeSwitch from '@/components/navigation/theme-switch';
import Link from 'next/link';
import { User, Settings } from 'lucide-react';
import { auth } from "@/app/auth";

export default async function UserNav() {
    const session = await auth();
    if (!session) return null;
    const user = session.user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={`/users/${user.id}`}>
                        <DropdownMenuItem>
                            <User className="h-5 w-5"/>
                            <span className="ml-2">Perfil</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard">
                        <DropdownMenuItem>
                            <Settings className="h-5 w-5"/>
                            <span className="ml-2">Ajustes</span>
                        </DropdownMenuItem>
                    </Link>
                    <ThemeSwitch />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogoutForm />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}