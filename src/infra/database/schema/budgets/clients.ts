import { serial, varchar } from "drizzle-orm/pg-core";
import { budgetSchema } from "./budgetSchema.ts";

export const clients = budgetSchema.table('clients', {
  id: serial('id').primaryKey(), // OBS: Lembrar de fazer a relação com a tabela 'clients' do schema de suporte
  name: varchar('name', { length: 50 }).notNull(),
  cpf: varchar('cpf').notNull().unique(),
  email: varchar('email').notNull().unique(),
  address: varchar('address').notNull(),
  address_number: varchar('address_number').notNull(),
  cep: varchar('cep').notNull(),
})