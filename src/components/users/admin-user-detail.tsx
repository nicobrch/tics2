import * as React from "react"
import { Mail, Phone, MapPin, Briefcase, TicketIcon, Star, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AdminUserDetail() {
    // Mock user data
    const user = {
        name: "Nico",
        email: "nico@dev.com",
        image: "/placeholder.svg?height=128&width=128",
        role: "Agente Senior",
        phone: "+56 9 1234 5678",
        location: "Santiago, Chile",
        department: "Soporte Técnico",
        assignedTickets: 12,
        totalTickets: 245,
        averageResponseTime: "1.8 horas",
        satisfactionRate: 4.7,
        performanceScore: 92,
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Perfil de {user.name}</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.image} alt={user.name}/>
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <p className="text-muted-foreground">{user.role}</p>
                                <Badge variant="secondary" className="mt-2">{user.department}</Badge>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 opacity-70"/>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 opacity-70"/>
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 opacity-70"/>
                                <span>{user.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Briefcase className="h-4 w-4 opacity-70"/>
                                <span>{user.department}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estadísticas de Rendimiento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Tickets Asignados</span>
                                    <Badge variant="secondary">{user.assignedTickets} activos</Badge>
                                </div>
                                <Progress value={(user.assignedTickets / 20) * 100} className="h-2"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <TicketIcon className="h-4 w-4 opacity-70"/>
                                    <span>Total de Tickets Resueltos</span>
                                </div>
                                <span className="font-semibold">{user.totalTickets}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 opacity-70"/>
                                    <span>Tiempo de Respuesta Promedio</span>
                                </div>
                                <span className="font-semibold">{user.averageResponseTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Star className="h-4 w-4 opacity-70"/>
                                    <span>Tasa de Satisfacción</span>
                                </div>
                                <span className="font-semibold">{user.satisfactionRate} / 5</span>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Puntuación de Rendimiento</span>
                                    <span className="font-semibold">{user.performanceScore}%</span>
                                </div>
                                <Progress value={user.performanceScore} className="h-2"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                        <CardDescription>Los últimos 5 tickets gestionados por {user.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                                            {i % 2 === 0 ? "Resuelto" : "En Progreso"}
                                        </Badge>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium">Ticket #{1000 + i}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {i % 2 === 0 ? "Problema de conexión resuelto" : "Configuración de software en curso"}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-sm text-muted-foreground">
                                        {`Hace ${i + 1} ${i === 0 ? 'hora' : 'horas'}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}