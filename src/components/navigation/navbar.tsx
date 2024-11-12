import MainNav from "@/components/navigation/main-nav";
import UserNav from "@/components/navigation/user-nav";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function Navbar() {

    return (
        <div className="hidden flex-col bg-primary md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4 container mx-auto">
                    <Button className="w-[140px] bg-background hover:bg-background" asChild>
                        <Link href="/">
                            <Image
                                src="/logo-integra.png"
                                alt="logo"
                                width={453}
                                height={99}
                                className="relative flex flex-col mb-0 items-center justify-center"
                            />
                        </Link>
                    </Button>
                    <MainNav/>
                    <div className="ml-auto flex items-center space-x-4">
                        <UserNav/>
                    </div>
                </div>
            </div>
        </div>
    )
}