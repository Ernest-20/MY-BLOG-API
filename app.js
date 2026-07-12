const express = require("express");
require("dotenv").config();

const connectdb = require("./database/connectdb");
const logger = require("./middleware/logger");
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

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

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});