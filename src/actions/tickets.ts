"use server"

export async function createTicket(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    status: formData.get('status'),
    priority: formData.get('priority'),
    assignee: formData.get('assignee'),
  }

  console.log("Creating ticket", { rawFormData});
}