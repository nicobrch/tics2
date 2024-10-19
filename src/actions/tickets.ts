"use server"
import { db } from "@/db"
import { tickets } from "@/db/schema"

export async function createTicket(formData: FormData) {
  const title = formData.get('name');
  const status = formData.get('status');
  const priority = formData.get('priority');
  const userId = formData.get('assignee');

  if (!title || !status || !priority || !userId) {
    throw new Error("Missing required fields");
  }

  await db.insert(tickets).values({
    title: title.toString(),
    status: status.toString(),
    priority: priority.toString(),
    userId: userId.toString(),
  });
}