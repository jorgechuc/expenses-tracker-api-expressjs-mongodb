const express = require('express');
const router = express.Router();
const Expense = require('../models/expense-model');

module.exports = router;

router.post('/expenses', async (req, res) => {
    const expense = new Expense({
        description: req.body.description,
        date: req.body.date,
        amount: req.body.amount
    });

    try {
        const expanseToSave = await expense.save();
        res.status(200).json(expanseToSave);
    }
    catch(error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/expenses/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        res.json(expense);
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const updatedExpense = req.body;
        const options = { new: true };

        const expense = await Expense.findByIdAndUpdate(
            id, updatedExpense, options);
        res.send(expense);
    }
    catch(error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const expense = 
            await Expense.findByIdAndDelete(id);
        res.send(`El documento con descripción ${expense.description} ha sido eliminado.`);
    }
    catch(error) {
        res.status(400).json({ message: error.message });
    }
});
