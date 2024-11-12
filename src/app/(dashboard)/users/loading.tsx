import {Skeleton} from "@/components/ui/skeleton";

export default async function Loading() {
    return (
        <div className="flex-1 p-4 md:p-6">
            <section>
                <Skeleton className="h-10 w-[400px] mb-4"/>
            </section>
            <Skeleton className="h-[350px] w-full"/>
        </div>
    );
}
