import postgres from "postgres";

export const sql = postgres(process.env.DATABASE_URL);

export const testConnection = async () => {
  await sql`SELECT 1`;
};
