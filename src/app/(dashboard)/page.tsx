import { LogoutButton } from "@/components/auth/logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers() // you need to pass the headers object.
  })
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="p-4">
      <h1 className="font-bold text-3xl mb-2">
        Hello, {session.user.name}!
      </h1>
      <LogoutButton />
    </div>
  );
}
