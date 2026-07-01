import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_roadmap_items_status" AS ENUM('shipped', 'in-progress', 'planned');
  CREATE TYPE "public"."enum_roadmap_items_category" AS ENUM('Dispatch', 'Invoicing', 'Mobile', 'Integrations', 'Inventory', 'Customer Portal', 'Reporting', 'Staff', 'AI', 'Safety', 'Platform');
  CREATE TYPE "public"."enum_roadmap_items_product" AS ENUM('CloudRent Pro', 'CloudRent Crew', 'CloudRent Command', 'CloudRent Connect', 'All Products');

  CREATE TABLE "roadmap_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"status" "enum_roadmap_items_status" NOT NULL,
  	"category" "enum_roadmap_items_category" NOT NULL,
  	"product" "enum_roadmap_items_product" NOT NULL,
  	"quarter" varchar,
  	"learn_more_url" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "roadmap_items_id" integer;
  CREATE INDEX IF NOT EXISTS "roadmap_items_updated_at_idx" ON "roadmap_items" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "roadmap_items_created_at_idx" ON "roadmap_items" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roadmap_items_fk" FOREIGN KEY ("roadmap_items_id") REFERENCES "public"."roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_roadmap_items_id_idx" ON "payload_locked_documents_rels" USING btree ("roadmap_items_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "roadmap_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "roadmap_items" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_roadmap_items_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_roadmap_items_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "roadmap_items_id";
  DROP TYPE IF EXISTS "public"."enum_roadmap_items_status";
  DROP TYPE IF EXISTS "public"."enum_roadmap_items_category";
  DROP TYPE IF EXISTS "public"."enum_roadmap_items_product";`)
}
