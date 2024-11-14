import type { Ticket } from '@/types/ticket';
import DonutChart, { DonutChartData, DonutChartProps } from '@/components/charts/donut-chart';
import { getTicketsByState } from '@/utils/string';

type TicketStateDonutProps = {
    tickets: Ticket[]
}

export default function TicketStateDonut({ tickets }: TicketStateDonutProps) {
    const chartData: DonutChartData[] = [
        { label: "Abierto", value: getTicketsByState(tickets, "Abierto"), fill: "hsl(var(--success))" },
        { label: "En Progreso", value: getTicketsByState(tickets, "En Progreso"), fill: "hsl(var(--warning))"},
        { label: "Cerrado", value: getTicketsByState(tickets, "Cerrado"), fill: "hsl(var(--destructive))"},
    ]

    const chartProps: DonutChartProps = {
        data: chartData,
        title: "Estado de Tickets",
        subtitle: "Estado de los tickets para el mes de Noviembre.",
        label: "Tickets",
        footer: "Ha habido un aumento de 5% respecto al mes anterior.",
    }

    return (
        <DonutChart props={chartProps} />
    )
}