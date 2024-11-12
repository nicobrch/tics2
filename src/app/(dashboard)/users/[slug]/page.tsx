import {auth} from "@/app/auth";
import AdminUserDetail from "@/components/users/admin-user-detail";
import UserProfile from "@/components/users/user-profile";

export default async function UserPage({ params }: { params: { slug: number } }) {
    const session = await auth();
    if (!session?.user) return null;
    const role = session?.user?.role;
    const id = session?.user?.id;
    const { slug } = params;

    return (
        role.toLowerCase() === 'admin' && id !== slug ? (
            <AdminUserDetail />
        )
        : (
            <UserProfile />
        )
    )
}