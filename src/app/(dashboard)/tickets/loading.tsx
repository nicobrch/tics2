import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="flex-1 p-4 md:p-6">
      <section>
        <h1 className="font-bold text-3xl mb-4"> Tickets </h1>
      </section>
      <Card className="space-y-4 p-4">
        <div className="flex flex-wrap gap-4 xs:flex-row">
          <div className="flex-grow max-w-md">
            <Skeleton className="h-8"/>
          </div>
          <Skeleton className="h-8 w-[200px]"/>
          <Skeleton className="h-8 w-[200px]"/>
          <Skeleton className="h-8 w-[150px]"/>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-6"/></TableCell>
                <TableCell><Skeleton className="h-6"/></TableCell>
                <TableCell><Skeleton className="h-6"/></TableCell>
                <TableCell><Skeleton className="h-6"/></TableCell>
                <TableCell><Skeleton className="h-6"/></TableCell>
                <TableCell><Skeleton className="h-6"/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
