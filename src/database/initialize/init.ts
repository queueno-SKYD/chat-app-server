import { constants } from "../../helper/constant";
import { Pool } from "pg";
import { createUserTable } from "./init.query";

const pool = new Pool({
  connectionString: constants.POSTGRESS_SQL_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function getDatabase() {
  await pool.query(createUserTable);
}

export default pool;