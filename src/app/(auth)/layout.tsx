import React from "react";

export default async function AuthLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="mx-auto container">
            {children}
        </main>
    )
}