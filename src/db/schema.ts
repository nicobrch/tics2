import { pgTable, text, timestamp, serial, integer, boolean} from "drizzle-orm/pg-core"

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId').notNull().references(()=> user.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	expiresAt: timestamp('expiresAt'),
	password: text('password')
});

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').notNull(),
	image: text('image'),
	phone: text("phone"),
	createdAt: timestamp('createdAt').notNull(),
	updatedAt: timestamp('updatedAt').notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('banReason'),
	banExpires: integer('banExpires')
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId').notNull().references(()=> user.id),
	impersonatedBy: text('impersonatedBy').references(()=> user.id)
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull()
});

export const tickets = pgTable("tickets", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().notNull(),
	userId: text("userId").notNull(),
	categoryId: integer("categoryId").notNull().references(() => categories.id),
	stateId: integer("stateId").notNull().references(() => states.id),
	slaId: integer("slaId").notNull().references(() => sla.id),
});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	name: text("name").notNull(),
});

export const sla = pgTable("sla", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	name: text("name").notNull(),
});

export const states = pgTable("states", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	name: text("name").notNull(),
});