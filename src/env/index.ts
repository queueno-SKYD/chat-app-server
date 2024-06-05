import dotenv from "dotenv";
dotenv.config();

interface envType {
  GMAIL : string;
  GMAIL_PASSWORD : string;
  POSTGRESS_SQL_URL : string;
}

const env: envType = { 
  GMAIL : process.env.GMAIL || "",
  GMAIL_PASSWORD : process.env.GMAIL_PASSWORD || "",
  POSTGRESS_SQL_URL : process.env.POSTGRESS_SQL_URL || ""
};

export default env;
