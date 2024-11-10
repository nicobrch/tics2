import { auth } from '@/app/auth';

export default async function Home() {
    const session = await auth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Bienvenido {session?.user?.email}</h1>
            <p className="text-gray-500">Esta es una página protegida</p>
        </div>
    );
}