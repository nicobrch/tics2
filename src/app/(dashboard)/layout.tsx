import React from "react";
import { getSessionUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Navbar from "@/components/navigation/navbar";

export default async function DashboardLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getSessionUser();
    if (!user) {
        return redirect("/login");
    }

    return (
        <>
            <section>
                <Navbar/>
            </section>
            <NuqsAdapter>
                <main className="mx-auto container">
                    {children}
                </main>
            </NuqsAdapter>
        </>
    )
}