import {Skeleton} from "@/components/ui/skeleton";

export default async function Loading() {
    return (
        <div className="flex-1 p-4 md:p-6">
            <Skeleton className="h-10 w-[400px] mb-4"/>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                {[...Array(3)].map((_, index) => (
                    <Skeleton className="h-[125px] rounded-xl" key={index}/>
                ))}
            </div>
            <div>
                <Skeleton className="h-[350px] rounded-xl"/>
            </div>
        </div>
    );
}
