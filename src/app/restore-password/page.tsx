import { redirect } from "next/navigation";
import { getCurrentSession } from "@/auth/cookies";
import RestorePasswordForm from "@/components/actions/restore-pwd-form";

export default async function Page() {
  const { session } = await getCurrentSession();
  if (session !== null) {
    return redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RestorePasswordForm />
    </div>
  );
}