import { relations } from "drizzle-orm/relations";
import { user, session, categories, tickets, sla, states, roles, account } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({one, many}) => ({
	sessions: many(session),
	tickets: many(tickets),
	role: one(roles, {
		fields: [user.roleId],
		references: [roles.id]
	}),
	accounts: many(account),
}));

export const ticketsRelations = relations(tickets, ({one}) => ({
	category: one(categories, {
		fields: [tickets.categoryId],
		references: [categories.id]
	}),
	sla: one(sla, {
		fields: [tickets.slaId],
		references: [sla.id]
	}),
	state: one(states, {
		fields: [tickets.stateId],
		references: [states.id]
	}),
	user: one(user, {
		fields: [tickets.userId],
		references: [user.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	tickets: many(tickets),
}));

export const slaRelations = relations(sla, ({many}) => ({
	tickets: many(tickets),
}));

export const statesRelations = relations(states, ({many}) => ({
	tickets: many(tickets),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users: many(user),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));