import { pgTable, text, timestamp, serial, integer} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	phone: text("phone"),
	password: text("password").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().notNull(),
	roleId: integer("roleId").notNull().references(() => roles.id),
});

export const tickets = pgTable("tickets", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().notNull(),
	userId: text("userId").notNull().references(() => users.id),
	categoryId: integer("categoryId").notNull().references(() => categories.id),
	stateId: integer("stateId").notNull().references(() => states.id),
	slaId: integer("slaId").notNull().references(() => sla.id),
});

export const roles = pgTable("roles", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export const sla = pgTable("sla", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});

export const states = pgTable("states", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
});