import { pgTable, foreignKey, text, timestamp, serial, bigint, unique, boolean, varchar } from "drizzle-orm/pg-core"




export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull(),
},
(table) => {
	return {
		sessionUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}),
	}
});

export const tickets = pgTable("tickets", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	userId: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	categoryId: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	stateId: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	slaId: bigint({ mode: "number" }),
},
(table) => {
	return {
		ticketsCategoryIdFkey: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "tickets_categoryId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
		ticketsSlaIdFkey: foreignKey({
			columns: [table.slaId],
			foreignColumns: [sla.id],
			name: "tickets_slaId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
		ticketsStateIdFkey: foreignKey({
			columns: [table.stateId],
			foreignColumns: [states.id],
			name: "tickets_stateId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
		ticketsUserIdFkey: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "tickets_userId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
	}
});

export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean().notNull(),
	image: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	phone: bigint({ mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	roleId: bigint({ mode: "number" }),
},
(table) => {
	return {
		userRoleIdFkey: foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "user_roleId_fkey"
		}).onUpdate("cascade").onDelete("set null"),
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ mode: 'string' }).notNull(),
});

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	expiresAt: timestamp({ mode: 'string' }),
	password: text(),
},
(table) => {
	return {
		accountUserIdUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}),
	}
});

export const roles = pgTable("roles", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "roles_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
},
(table) => {
	return {
		rolesNameKey: unique("roles_name_key").on(table.name),
	}
});

export const categories = pgTable("categories", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "categories_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
},
(table) => {
	return {
		categoriesNameKey: unique("categories_name_key").on(table.name),
	}
});

export const states = pgTable("states", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "states_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
},
(table) => {
	return {
		statesNameKey: unique("states_name_key").on(table.name),
	}
});

export const sla = pgTable("sla", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "SLA_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: varchar().notNull(),
},
(table) => {
	return {
		slaNameKey: unique("SLA_name_key").on(table.name),
	}
});