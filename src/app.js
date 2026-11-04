const express = require("express");
const budgetRoutes = require("./routes/budget");

const app = express();
app.use(express.json());
app.use("/api/budgets", budgetRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;