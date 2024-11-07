import MainNav from "@/components/navigation/main-nav";
import UserNav from "@/components/navigation/user-nav";
import type { User } from "@/types/user";

type NavbarProps = {
  user: User,
}

export default function Navbar({user} : NavbarProps) {

  return (
    <div className="hidden flex-col bg-background md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 container mx-auto">
          <MainNav/>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav user={user}/>
          </div>
        </div>
      </div>
    </div>
  )
}