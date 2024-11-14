"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';
import type { UserSchema } from "@/types/user";
import {PropertiesResponse} from "@/app/api/tickets/properties/route";

type NewTicketDialogProps = {
  children: Readonly<React.ReactNode>,
  users: UserSchema[],
  properties: PropertiesResponse,
}

export default function NewTicketDialog({ children, users, properties }: NewTicketDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setSuccess] = useState(false);
  const router = useRouter();

  const TicketState = properties.states.map((state) => state.name);
  const TicketSLA = properties.sla.map((sla) => sla.name);
  const TicketCategory = properties.categories.map((category) => category.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok){
        setError(data.message);
      }

      setOpen(false);
      router.refresh();

    } catch (err: unknown) {
      if (err instanceof Error){
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Ticket</DialogTitle>
          <DialogDescription>Crear un nuevo ticket manualmente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Título de Ticket
              </Label>
              <Input
                name="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Estado
              </Label>
              <Select name="state">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {TicketState.map((status, index) => (
                    <SelectItem key={index} value={status}> {status} </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                SLA
              </Label>
              <Select name="sla">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar SLA" />
                </SelectTrigger>
                <SelectContent>
                  {TicketSLA.map((priority, index) => (
                    <SelectItem key={index} value={priority}> {priority} </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Categoría
              </Label>
              <Select name="category">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {TicketCategory.map((category, index) => (
                    <SelectItem key={index} value={category}> {category} </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Asignación
              </Label>
              <Select name="userEmail">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Asignar usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.map((user, index) => (
                      <SelectItem key={index} value={user.email}> {user.name} </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </Button>
            ) : (
              <Button type="submit">Crear</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}