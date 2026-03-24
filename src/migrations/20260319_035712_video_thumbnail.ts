import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    DO $$ BEGIN
      ALTER TABLE "videos" ADD CONSTRAINT "videos_thumbnail_id_media_id_fk"
        FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
    CREATE INDEX IF NOT EXISTS "videos_thumbnail_idx" ON "videos" USING btree ("thumbnail_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "videos" DROP CONSTRAINT IF EXISTS "videos_thumbnail_id_media_id_fk";
    DROP INDEX IF EXISTS "videos_thumbnail_idx";
    ALTER TABLE "videos" DROP COLUMN IF EXISTS "thumbnail_id";
  `)
}
