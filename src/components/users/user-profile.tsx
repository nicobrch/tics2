import * as React from "react"
import { Mail, Phone, MapPin, Briefcase, Shield, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function UserProfile() {
    // Mock user data
    const user = {
        name: "Nico",
        email: "nico@dev.com",
        image: "/placeholder.svg?height=128&width=128",
        role: "Agente de Soporte",
        phone: "+56 9 1234 5678",
        location: "Santiago, Chile",
        department: "Soporte Técnico",
        joinDate: "15 de marzo, 2022",
        languages: ["Español", "Inglés"],
        skills: ["Soporte técnico", "Resolución de problemas", "Atención al cliente"],
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={user.image} alt={user.name} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <p className="text-muted-foreground">{user.role}</p>
                                <Badge variant="secondary" className="mt-2">{user.department}</Badge>
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 opacity-70" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 opacity-70" />
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 opacity-70" />
                                <span>{user.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Briefcase className="h-4 w-4 opacity-70" />
                                <span>{user.department}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 opacity-70" />
                                <span>Miembro desde: {user.joinDate}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Habilidades y Experiencia</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">Idiomas</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.languages.map((language, index) => (
                                        <Badge key={index} variant="secondary">{language}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Habilidades</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill, index) => (
                                        <Badge key={index} variant="outline">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Acciones de Cuenta</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline">
                                <Shield className="mr-2 h-4 w-4" />
                                Cambiar Contraseña
                            </Button>
                            <Button variant="outline">
                                <Mail className="mr-2 h-4 w-4" />
                                Actualizar Correo Electrónico
                            </Button>
                            <Button variant="outline">
                                <Phone className="mr-2 h-4 w-4" />
                                Actualizar Número de Teléfono
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}