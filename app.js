const express = require("express");
require("dotenv").config();

const connectdb = require("./database/connectdb.js");
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

connectdb();

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An unexpected error occurred!" });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Server is listening on port ${PORT}`);
});
