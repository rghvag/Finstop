const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
},{
    timestamps:true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;


