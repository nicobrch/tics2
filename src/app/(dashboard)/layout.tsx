import React from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import Navbar from "@/components/navigation/navbar";

export default async function DashboardLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

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