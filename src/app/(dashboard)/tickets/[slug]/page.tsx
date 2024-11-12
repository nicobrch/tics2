import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Clock, FileText, MessageSquare, Paperclip, Send } from "lucide-react"

export default async function TicketPage({ params }: { params: { slug: number } }) {
    const { slug } = params;

    const ticketData = await fetch(`http://localhost:3000/api/tickets/${slug}`);
    const ticket = await ticketData.json();

    return (
        <div className="container mx-auto p-6">
            <div className="grid gap-6">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold">{ticket[0].title}</h1>
                        <div className="flex gap-2">
                            <Badge variant="outline">ID: {ticket[0].id}</Badge>
                            <Badge className="bg-success">{ticket[0].state}</Badge>
                            <Badge className="bg-red-500">{ticket[0].sla}</Badge>
                            <Badge variant="secondary">{ticket[0].category}</Badge>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Editar</Button>
                        <Button variant="destructive">Cerrar Ticket</Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Description Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Descripción</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {ticket[0].description}
                                </p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Paperclip className="h-4 w-4" />
                                        <span>screenshot-error.png</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Paperclip className="h-4 w-4" />
                                        <span>log-file.txt</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Comentarios</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Comment */}
                                    <div className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg" />
                                            <AvatarFallback>TS</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">Soporte Técnico</span>
                                                <span className="text-sm text-muted-foreground">hace 2 horas</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                He revisado los logs y parece ser un problema de memoria. ¿Podrías confirmar cuánta RAM tiene
                                                disponible el equipo?
                                            </p>
                                        </div>
                                    </div>

                                    {/* New Comment Input */}
                                    <div className="flex gap-4">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg" />
                                            <AvatarFallback>AD</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <Textarea placeholder="Escribe un comentario..." className="mb-2" />
                                            <Button>
                                                <Send className="mr-2 h-4 w-4" />
                                                Enviar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Asignado a</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{ticket[0].assignee}</span>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Creado</span>
                                        <span className="text-sm">{ticket[0].created}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Última actualización</span>
                                        <span className="text-sm">hace 2 horas</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Tiempo de respuesta</span>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Clock className="h-4 w-4" />
                                            <span>3.5 horas</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activity Log Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actividad</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <div className="space-y-1">
                                            <p className="text-sm">Ticket creado</p>
                                            <span className="text-xs text-muted-foreground">2024-11-10 09:00</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <div className="space-y-1">
                                            <p className="text-sm">Nuevo comentario</p>
                                            <span className="text-xs text-muted-foreground">2024-11-10 10:30</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}