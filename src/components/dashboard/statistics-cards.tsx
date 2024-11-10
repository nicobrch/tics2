import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, TicketIcon, UsersIcon } from "lucide-react";
import type { Ticket } from '@/types/ticket';

type StatisticsCardsProps = {
  tickets: Ticket[]
}

export default async function StatisticsCards({ tickets }: StatisticsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Total de Tickets</CardTitle>
          <TicketIcon className="w-6 h-6"/>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{tickets.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Tickets Abiertos</CardTitle>
          <UsersIcon className="w-6 h-6"/>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {tickets.filter((ticket: { state: string; }) => ticket.state === "Abierto").length}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-lg font-medium">Tiempo de Respuesta Promedio</CardTitle>
          <ClockIcon className="w-6 h-6"/>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">3.5 horas</div>
        </CardContent>
      </Card>
    </div>
  );
}