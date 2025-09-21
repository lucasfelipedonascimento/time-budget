CREATE SCHEMA "budget";
--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approve', 'reject', 'in_progress');--> statement-breakpoint
CREATE TYPE "public"."item_type" AS ENUM('service', 'piece');--> statement-breakpoint
CREATE TABLE "budget"."budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer NOT NULL,
	"vehicle_id" integer NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"total_value" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "budget"."budget_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"budget_id" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"item_type" "item_type" NOT NULL,
	"item_id" integer,
	"time" integer,
	"quantity" integer NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"subtotal" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "clients" (
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
CREATE TABLE "pieces" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit_price" numeric DEFAULT '0.00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit_price" numeric DEFAULT '0.00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"unit_price" numeric DEFAULT '0.00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" serial PRIMARY KEY NOT NULL,
	"plate" varchar(10) NOT NULL,
	"brand" varchar(50) NOT NULL,
	"model" varchar(256) NOT NULL,
	"year" varchar(4) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "budget"."budgets" ADD CONSTRAINT "budgets_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budgets" ADD CONSTRAINT "budgets_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ADD CONSTRAINT "budget_items_budget_id_budgets_id_fk" FOREIGN KEY ("budget_id") REFERENCES "budget"."budgets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ADD CONSTRAINT "budget_items_item_id_pieces_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."pieces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_items" ADD CONSTRAINT "service_items_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;