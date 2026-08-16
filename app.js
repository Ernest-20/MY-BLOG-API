const express = require("express");

// Import our config file FIRST — this runs dotenv.config() internally
// and gives us validateEnv() plus clean access to each env value.
const config = require("./config/config");

const connectdb = require("./database/connectdb");
const logRequest = require("./middlewares/logger");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

// Run this before anything else touches the database or starts the server.
// If a required env var is missing, this stops the app right here with
// a clear error message instead of failing mysteriously later.
config.validateEnv();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logRequest);
app.get("/upload", (req, res) => {
   console.log("body", req.body);

   console.log("file", req.file);
});

// Connect to MongoDB
connectdb();

// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred!" });
});

// Start Server — using config.PORT instead of reading process.env directly
app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});