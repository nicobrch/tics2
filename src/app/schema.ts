import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable("User", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }),
    password: varchar("password", { length: 64 }),
    name: varchar("name", { length: 64 }),
    phone: varchar("phone", { length: 12 }),
    createdAt: timestamp("createdAt", { mode : "string" }).defaultNow().notNull(),
    roleId: integer("roleId").notNull().references(() => roles.id),
});

export const tickets = pgTable("Tickets", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 64 }).notNull(),
    description: varchar("description", { length: 255 }),
    createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().notNull(),
    userId: integer("userId").notNull().references(() => users.id),
    categoryId: integer("categoryId").notNull().references(() => categories.id),
    stateId: integer("stateId").notNull().references(() => states.id),
    slaId: integer("slaId").notNull().references(() => sla.id),
});

export const roles = pgTable("Roles", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 12 }).notNull(),
    createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export const categories = pgTable("Categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export const sla = pgTable("Sla", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export const states = pgTable("States", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 16 }).notNull(),
    createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertTicket = typeof tickets.$inferInsert;
export type SelectTicket = typeof tickets.$inferSelect;

export type InsertRole = typeof roles.$inferInsert;
export type SelectRole = typeof roles.$inferSelect;

export type InsertCategory = typeof categories.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;

export type InsertSla = typeof sla.$inferInsert;
export type SelectSla = typeof sla.$inferSelect;

export type InsertState = typeof states.$inferInsert;
export type SelectState = typeof states.$inferSelect;