interface Ticket {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  created: string;
}

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: Request): Promise<Response> {
  const initialTickets: Ticket[] = [
    { id: 1, title: "Login issue", status: "Open", priority: "High", assignee: "John Doe", created: "2023-05-01" },
    { id: 2, title: "Feature request", status: "In Progress", priority: "Medium", assignee: "Jane Smith", created: "2023-05-02" },
    { id: 3, title: "Bug report", status: "Closed", priority: "Low", assignee: "Bob Johnson", created: "2023-05-03" },
    { id: 4, title: "Performance problem", status: "Open", priority: "High", assignee: "Alice Brown", created: "2023-05-04" },
    { id: 5, title: "UI enhancement", status: "In Progress", priority: "Medium", assignee: "Charlie Davis", created: "2023-05-05" },
  ];
  return new Response(JSON.stringify(initialTickets), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}