import {getCurrentSession} from "@/auth/cookies";
import {redirect} from "next/navigation";
import { LogoutButton } from "@/components/actions/logout-button";

export default async function Home() {
  const { session, user } = await getCurrentSession();
  if (session === null) {
    return redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl mb-2">
        Hello, {user.name}!
      </h1>
      <LogoutButton />
    </div>
  );
}
