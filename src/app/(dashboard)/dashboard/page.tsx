import StatisticsCards from '@/components/dashboard/statistics-cards';
import TicketsTable from '@/components/tickets/tickets-table';
import * as React from "react";

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
        <div className="flex-1 p-4 gap-4 md:p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <section>
                <StatisticsCards tickets={tickets}/>
            </section>
            <section>
                <TicketsTable tickets={tickets} users={users} properties={properties}/>
            </section>
        </div>
    )
}
