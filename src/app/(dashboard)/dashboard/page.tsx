import StatisticsCards from '@/components/tickets/statistics-cards';
import TicketsTable from '@/components/tickets/tickets-table';

export default async function Page() {
    const ticketsData = await fetch("http://localhost:3000/api/tickets",
      { cache: 'no-store'}
    );
    const tickets = await ticketsData.json();

    const usersData = await fetch("http://localhost:3000/api/users");
    const users = await usersData.json();

  const ticketProperties = await fetch("http://localhost:3000/api/tickets/properties");
  const properties = await ticketProperties.json();

    return (
        <div className="flex-1 p-4 md:p-6">
            <section>
                <h1 className="font-bold text-xl mb-2"> Estadísticas </h1>
                <StatisticsCards tickets={tickets} />
            </section>
            <section>
                <h1 className="font-bold text-xl mb-2"> Últimos tickets </h1>
                <TicketsTable tickets={tickets} users={users} properties={properties}/>
            </section>
            <section className="mt-4">
                <h1 className="font-bold text-xl mb-2"> Gráficos </h1>
            </section>
        </div>
    )
}
