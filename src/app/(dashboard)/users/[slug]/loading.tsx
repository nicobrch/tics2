import { Skeleton } from "@/components/ui/skeleton";
import * as React from 'react';

export default async function Loading() {
    return (
        <div className="container mx-auto p-6">
            <Skeleton className="h-8 w-[450px] mb-6"/>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <Skeleton className="h-[500px] w-full"/>
                <Skeleton className="h-[500px] w-full"/>
            </div>
            <Skeleton className="h-[250px] w-full"/>
        </div>
    )
}
