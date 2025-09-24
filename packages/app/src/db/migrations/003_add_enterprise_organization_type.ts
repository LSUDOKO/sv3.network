import { Kysely, sql } from "kysely";
import { Database } from "../schema";

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`ALTER TYPE organization_type ADD VALUE IF NOT EXISTS 'enterprise'`.execute(db);
}

export async function down(db: Kysely<Database>): Promise<void> {
  await sql`ALTER TYPE organization_type DROP VALUE IF EXISTS 'enterprise'`.execute(db);
}
