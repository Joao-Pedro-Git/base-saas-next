import "dotenv/config";
import { config } from "dotenv";

config({ path: ".env" });

export default {
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
