import { db } from "@/db";
import { states, categories, sla } from "@/db/schema";

export type PropertiesResponse = {
  states: {
    name: string
  }[],
  categories: {
    name: string
  }[],
  sla: {
    name: string
  }[]
}

export async function GET() {
  const statesResult = await db
    .select({
      name: states.name
    })
    .from(states);

  const categoriesResult = await db
    .select({
      name: categories.name
    })
    .from(categories);

  const slaResult = await db
    .select({
      name: sla.name
    })
    .from(sla);

  return Response.json({
    states: statesResult,
    categories: categoriesResult,
    sla: slaResult
  });
}