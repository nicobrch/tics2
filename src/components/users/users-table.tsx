"use client"
import { z } from "zod"
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import { useQueryState } from "nuqs";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FileText, Pencil, Trash2} from "lucide-react";
import { getUsersSchema } from '@/app/api/users/route';

type UsersTableProps = {
  users: z.infer<typeof getUsersSchema>[]
}

export default function UsersTable({ users }: UsersTableProps) {

  const [searchTerm, setSearchTerm] = useQueryState("name", { defaultValue: "" })

  const filteredUsers = users.filter((user) => {
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
          {filteredUsers.map((user) => (
            <TableRow key={user.id} >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.rol}</TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="mr-2">
                      <Button size="icon" className="h-6 w-6">
                        <FileText className="h-4 w-4"/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ver Usuario</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild className="mr-2">
                      <Button size="icon" className="h-6 w-6" variant="calm">
                        <Pencil className="h-4 w-4"/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Editar Usuario</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" className="h-6 w-6" variant="destructive">
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Borrar Usuario</TooltipContent>
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