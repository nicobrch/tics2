import { redirect } from "next/navigation";
import { getCurrentSession } from "@/auth/cookies";
import LoginForm from "@/components/actions/login-form";

export default async function Page() {
  const { session } = await getCurrentSession();
  if (session !== null) {
    return redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}