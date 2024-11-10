"use client"

import Link from 'next/link'
import { usePathname } from "next/navigation";

export default function MainNav() {
    const pathname = usePathname();
    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/tickets", label: "Tickets" },
        { href: "/users", label: "Usuarios" },
    ];

    return (
        <nav className="flex items-center space-x-4 mx-6 lg:space-x-6 text-primary-foreground/80">
            {navItems.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={`text-sm font-medium transition-colors ${
                        pathname === href ? "text-primary-foreground" : "hover:text-primary-foreground"
                    }`}
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}