import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  driver: "pglite",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});