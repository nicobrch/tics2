import {auth} from "@/app/auth";
import AdminUserDetail from "@/components/users/admin-user-detail";
import UserProfile from "@/components/users/user-profile";

export default async function UserPage() {
    const session = await auth();
    if (!session) return null;
    const role = session?.user?.role;

    return (
        role.toLowerCase() === 'admin' ? (
            <AdminUserDetail />
        )
        : (
            <UserProfile />
        )
    )
}