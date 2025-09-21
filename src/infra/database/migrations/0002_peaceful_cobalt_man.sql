ALTER TABLE "budget"."budgets" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "budget"."budgets" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'approve', 'reject', 'in_progress');--> statement-breakpoint
ALTER TABLE "budget"."budgets" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "budget"."budgets" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";