require("dotenv").config();

const REQUIRED_ENV_VARS = ["PORT", "MONGO_URI", "JWT_SECRET"];

function validateEnv() {
  // .filter() keeps only the variable names that are MISSING from process.env
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((key) => console.error(`   - ${key}`));
    console.error("\nCheck your .env file against .env.example and try again.");
    // Stop the app completely rather than letting it run in a broken state.
    process.exit(1);
  }

  console.log("✅ All required environment variables are set.");
}

module.exports = {
  validateEnv,
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};