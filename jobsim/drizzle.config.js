import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:'postgresql://Jobsim-ai_owner:4lheqTzD0FfN@ep-restless-field-a81svp0f.eastus2.azure.neon.tech/Jobsim-ai?sslmode=require'
  }
});