const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    amount: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Expense', expenseSchema);