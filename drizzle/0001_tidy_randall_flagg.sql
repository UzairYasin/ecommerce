CREATE TABLE IF NOT EXISTS "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"customer_phone" varchar(20) NOT NULL,
	"customer_address" text NOT NULL,
	"shipping_status" varchar(50) DEFAULT 'unshipped',
	"payment_status" varchar(50) NOT NULL,
	"tax" numeric(10, 2) DEFAULT '0',
	"shipping" numeric(10, 2) DEFAULT '0',
	"total_amount" numeric(10, 2) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"card_last_4" varchar(4) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
