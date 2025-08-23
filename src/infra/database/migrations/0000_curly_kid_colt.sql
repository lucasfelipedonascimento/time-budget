CREATE TYPE "public"."status" AS ENUM
('pending', 'approved', 'rejected', 'in_progress');--> statement-breakpoint
CREATE TYPE "public"."item_type" AS ENUM
('service', 'piece');--> statement-breakpoint
CREATE TABLE "budget"."clients"
(
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"cpf" varchar NOT NULL,
	"email" varchar NOT NULL,
	"address" varchar NOT NULL,
	"address_number" varchar NOT NULL,
	"cep" varchar NOT NULL,
	CONSTRAINT "clients_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "budget"."budgets"
(
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"vehicle_id" integer NOT NULL,
	"status" "status" NOT NULL,
	"total_value" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "budget"."vehicles"
(
	"id" serial PRIMARY KEY NOT NULL,
	"plate" varchar(10) NOT NULL,
	"brand" varchar(50) NOT NULL,
	"model" varchar(256) NOT NULL,
	"year" varchar(4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budget"."budget_items"
(
	"id" serial PRIMARY KEY NOT NULL,
	"budget_id" integer,
	"name" varchar(256) NOT NULL,
	"item_type" "item_type" NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budget"."budgets" ADD CONSTRAINT "budgets_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "budget"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budgets" ADD CONSTRAINT "budgets_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "budget"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ADD CONSTRAINT "budget_items_budget_id_budgets_id_fk" FOREIGN KEY ("budget_id") REFERENCES "budget"."budgets"("id") ON DELETE no action ON UPDATE no action;