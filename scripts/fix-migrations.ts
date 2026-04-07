import { getPayload } from 'payload'
import config from '../src/payload.config'
import { sql } from '@payloadcms/db-postgres'

async function fixMigrations() {
  const payload = await getPayload({ config })

  try {
    // Check current migrations in database
    const result = await payload.db.drizzle.execute(sql`
      SELECT * FROM payload_migrations ORDER BY created_at
    `)
    console.log('Current migrations in database:', result.rows)

    // Check if the initial migration needs to be marked as run
    const initialMigrationName = '20260307_013423'
    const exists = result.rows.some((row: any) => row.name === initialMigrationName)

    if (!exists) {
      console.log(`Marking ${initialMigrationName} as run...`)
      await payload.db.drizzle.execute(sql`
        INSERT INTO payload_migrations (name, batch, created_at, updated_at)
        VALUES (${initialMigrationName}, 1, NOW(), NOW())
      `)
      console.log('Done!')
    } else {
      console.log('Initial migration already marked as run.')
    }

    // Check again
    const result2 = await payload.db.drizzle.execute(sql`
      SELECT * FROM payload_migrations ORDER BY created_at
    `)
    console.log('Updated migrations:', result2.rows)

  } catch (error) {
    console.error('Error:', error)
  }

  process.exit(0)
}

fixMigrations()
