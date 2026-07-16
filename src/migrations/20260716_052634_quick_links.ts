import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "quick_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"subline" varchar,
  	"url" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0 NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"visible_from" timestamp(3) with time zone,
  	"visible_until" timestamp(3) with time zone,
  	"clicks" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "quick_links_id" integer;
  CREATE UNIQUE INDEX "quick_links_slug_idx" ON "quick_links" USING btree ("slug");
  CREATE INDEX "quick_links_updated_at_idx" ON "quick_links" USING btree ("updated_at");
  CREATE INDEX "quick_links_created_at_idx" ON "quick_links" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quick_links_fk" FOREIGN KEY ("quick_links_id") REFERENCES "public"."quick_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_quick_links_id_idx" ON "payload_locked_documents_rels" USING btree ("quick_links_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "quick_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "quick_links" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quick_links_fk";
  
  DROP INDEX "payload_locked_documents_rels_quick_links_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "quick_links_id";`)
}
