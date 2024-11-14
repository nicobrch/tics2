import { Ticket } from '@/types/ticket';

export const extractLabelFromHSL = (hslString: string): string => {
    const match = hslString.match(/--(\w+)\)/);
    return match ? match[1] : "";
}

export const getTicketsByState = (tickets: Ticket[], state: string): number => {
    return tickets.filter(ticket => ticket.state === state).length;
}