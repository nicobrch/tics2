import UsersTable from '@/components/users/users-table';

export default async function Home() {
    const data = await fetch("http://localhost:3000/api/users")
    const users = await data.json();

    return (
        <div className="flex-1 p-4 md:p-6">
            <section>
                <h1 className="font-bold text-3xl mb-4"> Usuarios </h1>
                <UsersTable users={users} />
            </section>
        </div>
    );
}
