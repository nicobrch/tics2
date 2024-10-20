"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {user} from "@/db/schema";
import { createTicket } from "@/actions/tickets"

type NewTicketDialogProps = {
  children: Readonly<React.ReactNode>,
  users: typeof user.$inferSelect[]
}

const TicketStatus = [ "Open", "In Progress", "Closed"];
const TicketPriority = [ "Low", "Medium", "High"];

export default function NewTicketDialog({ children, users }: NewTicketDialogProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Ticket</DialogTitle>
          <DialogDescription>Create a new ticket manually.</DialogDescription>
        </DialogHeader>
        <form action={createTicket}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus} name="status">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status"/>
                </SelectTrigger>
                <SelectContent>
                  {TicketStatus.map((status, index) => (
                    <SelectItem key={index} value={status}> {status} </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Priority
              </Label>
              <Select value={priority} onValueChange={setPriority} name="priority">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority"/>
                </SelectTrigger>
                <SelectContent>
                  {TicketPriority.map((priority, index) => (
                    <SelectItem key={index} value={priority}> {priority} </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Assignee
              </Label>
              <Select value={assignee} onValueChange={setAssignee} name="assignee">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select assignee"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.map((user, index) => (
                      <SelectItem key={index} value={user.id}> {user.name} </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}