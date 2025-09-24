import { Kysely, sql } from "kysely";
import { Database } from "../schema";

export async function up(db: Kysely<Database>): Promise<void> {
  await sql`
    ALTER TABLE documents
    ADD COLUMN IF NOT EXISTS ipfs_url VARCHAR(512) NULL,
    ADD CONSTRAINT chk_ipfs_url
    CHECK (ipfs_url IS NULL OR ipfs_url LIKE 'https://gateway.pinata.cloud/ipfs/%' OR ipfs_url LIKE 'https://ipfs.io/ipfs/%')
  `.execute(db);

  // Add comment for the column
  await sql`
    COMMENT ON COLUMN documents.ipfs_url IS 'Direct IPFS URL for file access via IPFS gateway'
  `.execute(db);
}

export async function down(db: Kysely<Database>): Promise<void> {
  await sql`
    ALTER TABLE documents
    DROP CONSTRAINT IF EXISTS chk_ipfs_url,
    DROP COLUMN IF EXISTS ipfs_url
  `.execute(db);
}