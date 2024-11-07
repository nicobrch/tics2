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
          <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
          <TicketIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets.length}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+2.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {tickets.filter((ticket: { state: string; }) => ticket.state === "Abierto").length}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+12% from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.5 hours</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">-0.5 hours from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}