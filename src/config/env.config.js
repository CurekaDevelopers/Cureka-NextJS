import { z } from "zod";
import env from "dotenv";
env.config();

// Define the schema for environment variables
const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((port) => (port ? parseInt(port, 10) : 3000)),

  REACT_ENV: z
    .enum(["development", "production", "test"])
    .default(process.env.NODE_ENV || "development"),

  REACT_SERVER_BASE_URL: z
    .string()
    .min(1)
    .default("https://backend.cureka.com"),
  // .default("http://localhost:8000"),
});

console.log("Before Validation:", {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  REACT_SERVER_BASE_URL: process.env.REACT_SERVER_BASE_URL,
});

// Validate and parse environment variables
let parsedEnv;
try {
  parsedEnv = envSchema.parse({
    PORT: process.env.PORT,
    REACT_ENV: process.env.NODE_ENV,
    REACT_SERVER_BASE_URL: process.env.REACT_SERVER_BASE_URL,
  });
  console.log("Validated Environment:", parsedEnv);
} catch (err) {
  console.error("Zod Validation Error:", err.errors);
  process.exit(1);
}

// Function to get client ID from cookies (browser only)
const getClientIdFromCookie = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const gaCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_ga="));

    return gaCookie ? gaCookie.split("=")[1] : null;
  }
  return null; // Return null if running on the server
};

// Log to verify (only on server)
if (typeof window === "undefined") {
  console.log("Environment:", parsedEnv.REACT_ENV);
  console.log("Server Base URL:", parsedEnv.REACT_SERVER_BASE_URL);
}

export { parsedEnv as env };
