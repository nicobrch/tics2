"use client"
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";
import {useState} from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FileText, Pencil, Plus, Trash2} from "lucide-react";
import NewTicketDialog from "@/components/tickets/new-ticket-dialog";
import Link from "next/link";
import type { Ticket } from "@/types/ticket";
import type { UserSchema } from "@/types/user";
import type { PropertiesResponse } from "@/app/api/tickets/properties/route";

type TicketsTableProps = {
    tickets: Ticket[],
    users: UserSchema[],
    properties: PropertiesResponse
}

export default function TicketsTable({ tickets, users, properties}: TicketsTableProps) {

    const [searchTerm, setSearchTerm] = useState("")
    const [stateFilter, setstateFilter] = useState("Estado")
    const [slaFilter, setSlaFilter] = useState("SLA")

    const TicketState = ["Estado", ...properties.states.map((state) => state.name)];
    const TicketSLA = ["SLA", ...properties.sla.map((sla) => sla.name)];

    const badgeVariant = (input: string) => {
        if(input === "SLA Bajo" || input === "Abierto") {
            return "success"
        } else if (input === "SLA Medio" || input === "En Progreso") {
            return "warning"
        } else if (input === "SLA Alto" || input === "Cerrado") {
            return "destructive"
        }
        return "default";
    }

    const filteredTickets = tickets.filter((ticket) => {
        return (
            ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (stateFilter === "Estado" || ticket.state === stateFilter) &&
            (slaFilter === "SLA" || ticket.sla === slaFilter) ||
            ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (stateFilter === "Estado" || ticket.state === stateFilter) &&
            (slaFilter === "SLA" || ticket.sla === slaFilter)
        )
    })

    return (
        <Card className="flex-1 space-y-4 p-4">
            <div className="flex flex-wrap gap-4 xs:flex-row">
                <div className="flex-grow max-w-md">
                    <Input
                        placeholder="Buscar tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={stateFilter} onValueChange={setstateFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado"/>
                    </SelectTrigger>
                    <SelectContent>
                        {TicketState.map((state) => (
                            <SelectItem key={state} value={state} defaultValue={"Estado"}>{state}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={slaFilter} onValueChange={setSlaFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por SLA"/>
                    </SelectTrigger>
                    <SelectContent>
                        {TicketSLA.map((sla) => (
                            <SelectItem key={sla} value={sla} defaultValue={"SLA"}>{sla}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <NewTicketDialog users={users} properties={properties}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4"/> Nuevo Ticket
                    </Button>
                </NewTicketDialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Asignación</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id} >
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>
                                <Badge variant={badgeVariant(ticket.state)}>{ticket.state}</Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={badgeVariant(ticket.sla)}>{ticket.sla}</Badge>
                            </TableCell>
                            <TableCell>{ticket.category}</TableCell>
                            <TableCell>{ticket.assignee}</TableCell>
                            <TableCell>{ticket.created.split(' ')[0]}</TableCell>
                            <TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild className="mr-2">
                                            <Button size="icon" className="h-6 w-6" asChild>
                                                <Link href={`/tickets/${ticket.id}`}>
                                                    <FileText className="h-4 w-4"/>
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Ver Ticket</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild className="mr-2">
                                            <Button size="icon" className="h-6 w-6" variant="luxury">
                                                <Pencil className="h-4 w-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-luxury text-luxury-foreground">Editar Ticket</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="icon" className="h-6 w-6" variant="destructive">
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-destructive text-destructive-foreground">Cerrar Ticket</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}