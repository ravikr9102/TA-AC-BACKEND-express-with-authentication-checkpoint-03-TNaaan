const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let expenseSchema = new Schema({
    category: { type: String},
    amount: { type: Number},
    date: { type: Date},
    user: { type: Schema.Types.ObjectId, ref: 'User'}
},{timestamps: true});

module.exports = mongoose.model('Expense',expenseSchema);