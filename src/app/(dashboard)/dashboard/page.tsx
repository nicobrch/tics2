import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import StatisticsCards from "@/components/dashboard/statistics-cards";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers() // you need to pass the headers object.
  })
  if (!session) {
    return redirect("/login");
  }

  const data = await fetch("http://localhost:3000/api/tickets");
  const tickets = await data.json();

  return (
    <div className="flex-1 p-4 md:p-6">
      <section>
        <h1 className="font-bold text-3xl mb-4"> Estadísticas </h1>
        <StatisticsCards tickets={tickets}/>
      </section>
    </div>
  );
}
