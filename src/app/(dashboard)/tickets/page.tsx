import TicketsTable from '@/components/tickets/tickets-table';

export default async function Page() {
    const ticketsData = await fetch("http://localhost:3000/api/tickets",
      { cache: 'no-store' }
    );
    const tickets = await ticketsData.json();

    const usersData = await fetch("http://localhost:3000/api/users");
    const users = await usersData.json();

    const ticketProperties = await fetch("http://localhost:3000/api/tickets/properties");
    const properties = await ticketProperties.json();

    return (
        <section className="flex-1 p-4 md:p-6">
            <h1 className="font-bold text-3xl mb-4"> Tickets </h1>
            <TicketsTable tickets={tickets} users={users} properties={properties}/>
        </section>
    );
}
