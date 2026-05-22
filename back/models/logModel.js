import { sql } from "../dbConnection.js";

export const createCityLog = async ({ city, selectedAt }) => {
  const rows = await sql`
    INSERT INTO city_logs (city, selected_at)
    VALUES (${city}, ${selectedAt})
    RETURNING *
  `;

  return rows[0];
};

export const getCityLogs = async () => {
  return await sql`
    SELECT *
    FROM city_logs
    ORDER BY selected_at DESC
  `;
};
