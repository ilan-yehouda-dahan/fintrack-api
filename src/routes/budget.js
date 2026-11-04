const express = require("express");
const { isValidName, isValidAmount } = require("../validation");
const router = express.Router();

const budgets = new Map();
let nextId = 1;

router.get("/", (req, res) => {
  res.json(Array.from(budgets.values()));
});

router.post("/", (req, res) => {
  const { name, amount } = req.body;
  if (!isValidName(name)) {
    return res.status(400).json({ error: "name est requis" });
  }
  if (!isValidAmount(amount)) {
    return res.status(400).json({ error: "amount doit être un nombre positif" });
  }
  const budget = {
    id: nextId++,
    name,
    amount,
    createdAt: new Date().toISOString(),
  };
  budgets.set(budget.id, budget);
  res.status(201).json(budget);
});

router.get("/:id", (req, res) => {
  const budget = budgets.get(Number(req.params.id));
  if (!budget) return res.status(404).json({ error: "Budget non trouvé" });
  res.json(budget);
});

router.delete("/:id", (req, res) => {
  if (!budgets.delete(Number(req.params.id))) {
    return res.status(404).json({ error: "Budget non trouvé" });
  }
  res.status(204).send();
});

module.exports = router;