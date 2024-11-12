import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
    return (
        <div className="container mx-auto p-6">
            <div className="grid gap-6">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <Skeleton className="h-8 w-[450px]"/>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-[75px]"/>
                            <Skeleton className="h-6 w-[75px]"/>
                            <Skeleton className="h-6 w-[75px]"/>
                            <Skeleton className="h-6 w-[75px]"/>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-8 w-[100px]"/>
                        <Skeleton className="h-8 w-[100px]"/>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Description Card */}
                        <Skeleton className="h-[200px] w-[650px]"/>

                        {/* Comments Section */}
                        <Skeleton className="h-[200px] w-[650px]"/>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Skeleton className="h-[275px] w-[300px]"/>

                        {/* Activity Log Card */}
                        <Skeleton className="h-[200px] w-[300px]"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
