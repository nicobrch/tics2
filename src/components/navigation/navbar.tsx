import MainNav from "@/components/navigation/main-nav";
import UserNav from "@/components/navigation/user-nav";

export default async function Navbar() {

    return (
        <div className="hidden flex-col bg-primary md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4 container mx-auto">
                    <MainNav/>
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav/>
                    </div>
                </div>
            </div>
        </div>
    )
}