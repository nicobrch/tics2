"use client"
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import { useQueryState } from "nuqs";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {User, Pencil, Trash2} from "lucide-react";
import Link from "next/link";
import { UserSchema } from '@/types/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UsersTable({users}: { users: any }) {

    const [searchTerm, setSearchTerm] = useQueryState("name", {defaultValue: ""})

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredUsers = users.filter((user: UserSchema) => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    return (
        <Card className="space-y-4 p-4">
            <div className="flex flex-wrap gap-4 xs:flex-row">
                <div className="flex-grow max-w-md">
                    <Input
                        placeholder="Buscar usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user : UserSchema) => (
                            <TableRow key={user.id} >
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.rol}</TableCell>
                                <TableCell>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild className="mr-2">
                                                <Button size="icon" className="h-6 w-6" asChild>
                                                    <Link href={`/users/${user.id}`}>
                                                        <User className="h-4 w-4"/>
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Ver Usuario</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild className="mr-2">
                                                <Button size="icon" className="h-6 w-6" variant="luxury">
                                                    <Pencil className="h-4 w-4"/>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-luxury text-luxury-foreground">Editar Usuario</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button size="icon" className="h-6 w-6" variant="destructive">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-destructive text-destructive-foreground">Borrar Usuario</TooltipContent>
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