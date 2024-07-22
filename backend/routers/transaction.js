const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const User=require('../models/user')
const auth=require('../middleware/auth')

// POST endpoint to add a new transaction
router.post('/transaction/add-transaction',auth, async (req, res) => {
    // console.log(req.body)
  try {
    const user = req.user; 
    const userId=user._id
    const amount = req.body.amount;
    console.log(user)
    // Create a new transaction
    const newTransaction = new Transaction({
        owner: userId,
      amount: amount
    });

    // Save the transaction
    await newTransaction.save();

    res.status(200).json({ message: 'Transaction added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
