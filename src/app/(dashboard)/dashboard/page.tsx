import * as React from "react";
import { auth } from '@/app/auth';
import StatisticsCards from '@/components/dashboard/statistics-cards';
import TicketsTable from '@/components/tickets/tickets-table';
import TicketStateDonut from '@/components/charts/ticket-state-donut';

export default async function Page() {
    const session = await auth();
    if (!session) return null;

    const ticketsData = await fetch("http://localhost:3000/api/tickets");
    const tickets = await ticketsData.json();

    const usersData = await fetch("http://localhost:3000/api/users");
    const users = await usersData.json();

    const ticketProperties = await fetch("http://localhost:3000/api/tickets/properties");
    const properties = await ticketProperties.json();

    return (
        <div className="flex-1 p-4 gap-4 md:p-6">
            <h1 className="text-3xl font-bold mb-6">Mesa de Ayuda - {session?.user?.name}</h1>
            <section>
                <StatisticsCards tickets={tickets}/>
            </section>
            <section className="flex flex-wrap gap-2">
                <TicketsTable tickets={tickets} users={users} properties={properties}/>
                <TicketStateDonut tickets={tickets}/>
            </section>
        </div>
    )
}