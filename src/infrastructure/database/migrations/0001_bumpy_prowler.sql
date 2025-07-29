ALTER TABLE "budget"."budgets" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ALTER COLUMN "budget_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ALTER COLUMN "price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ADD COLUMN "time" integer;--> statement-breakpoint
ALTER TABLE "budget"."budget_items" ADD COLUMN "subtotal" integer DEFAULT 0 NOT NULL;