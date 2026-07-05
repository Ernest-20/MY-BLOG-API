const express = require("express");
require("dotenv").config();

const connectDB = require("./database/DB");
const logger = require("./middleware/logger");
const articleRoutes = require("./routes/articleRoutes");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/articles", articleRoutes);
app.use(logger);

const PORT = process.env.PORT;

app.use(express.json());

connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An unexpected error occurred!" });
});





app.listen(PORT, () => {
 console.log(`Server is listening on port ${PORT}`);
});
