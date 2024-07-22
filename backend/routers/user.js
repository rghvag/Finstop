const express=require('express')
 const User=require('../models/user')
 const Transaction = require('../models/transaction');
const router= new express.Router()
const auth=require('../middleware/auth')
const { women_schemes, men_schemes,trans_schemes}=require('./scheme');


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        const token=await user.generateAuthToken();
        res.status(201).send({ user ,token});
    } catch (e) {
        res.status(400).send(e.message);
    }
});


router.post('/users/login',async (req,res)=>{
    console.log(req.body)
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken();
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})



router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.send(500).send()
    }
})

router.post('/users/logoutAll',auth, async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

 
router.get('/users/me',auth ,async(req,res)=>{
    res.send(req.user)
})



router.delete('/users/me',auth,async(req,res)=>{
    try{
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.send(500).send()
    }
})

router.patch('/users/updateScore', auth, async (req, res) => {
    try {
        const user = req.user; 
        const newScore = req.body.score;

        user.score = user.score+newScore;

        await user.save();

        res.status(200).send({ user});
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal server error.' });
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function pickTwoRandomDifferentNumbers(min, max) {
    const firstNumber = getRandomInt(min, max);
    let secondNumber;
  
    do {
      secondNumber = getRandomInt(min, max);
    } while (secondNumber === firstNumber);
  
    return [firstNumber, secondNumber];
  }

  function calculateCybilScore(transactions, amount, latestTransactionDate) {
    if(amount>100000)return 849;
    // Define min and max values for normalization
    const minTransactions = 0; // Replace with your actual minimum value
    const maxTransactions = 1000; // Replace with your actual maximum value
    const minAmount = 0; // Replace with your actual minimum value
    const maxAmount = 100000; // Replace with your actual maximum value
    
    // Normalize attributes
    const normalizedTransactions = (transactions - minTransactions) / (maxTransactions - minTransactions);
    const normalizedAmount = (amount - minAmount) / (maxAmount - minAmount);
  
    // Define weights
    const weightTransactions = 0.4;
    const weightAmount = 0.6;
  
    // Calculate raw score
    const rawScore = weightTransactions * normalizedTransactions + weightAmount * normalizedAmount;
  
    // Define scaling factor to limit maximum score to 900
    const scalingFactor = 900 / (weightTransactions + weightAmount);
  
    // Calculate time decay factor for the latest transaction
    const currentTime = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const daysPassed = Math.max((currentTime - latestTransactionDate) / (1000 * 60 * 60 * 24), 0);
    const decayFactor = daysPassed <= 90 ? 1 : Math.pow(0.995, daysPassed - 90);
  
    // Calculate scaled score with time decay factor
    const cybilScore = Math.round(rawScore * scalingFactor * decayFactor);
  
    return cybilScore;
  }
  
  router.post('/users/user-transactions', auth, async (req, res) => {
    try {
      const user = req.user;
      const userId = user.id;

      // Fetch all transactions for the given user
      const transactions = await Transaction.find({ owner: userId });
    //res.status(200).json({ transactions: transactions });
      let totalAmount = 0;
      transactions.forEach((transaction) => {
        totalAmount += transaction.amount;
      });
      const no_of_transaction = transactions.length;
      //res.status(200).json({ totalAmount: totalAmount });

      //console.log(totalAmount);

      // Find the latest transaction based on createdAt
      const latestTransaction = transactions.reduce((latest, transaction) => {
        if (!latest || transaction.createdAt > latest.createdAt) {
          return transaction;
        }
        return latest;
      }, null);

      const latestTransactionCreatedAt = latestTransaction
        ? latestTransaction.createdAt
        : null;
      const value = calculateCybilScore(
        no_of_transaction,
        totalAmount,
        latestTransactionCreatedAt
      );
      //res.status(200).json({ transactions: transactions, totalAmount: totalAmount, latestTransaction: latestTransaction ,no_of_transaction:no_of_transaction,latestTransactionCreatedAt:latestTransactionCreatedAt,val:val});
      res.status(200).json({ user: user, val: value });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

 
  

router.post('/users/scheme', auth, async (req, res) => {
    try {
        const user = req.user; 
        const gender = req.body.gender;
        
        my_array=[]
        if(gender=="female")
        {
            my_array=women_schemes
        }
        else if(gender=="male")
        {
            my_array=men_schemes
        }
        else{
            my_array=trans_schemes
        }

        const [randomNumber1, randomNumber2] = pickTwoRandomDifferentNumbers(0, 5);
        // console.log(randomNumber1, randomNumber2);
       const data=[{name:my_array[randomNumber1].name,summary:my_array[randomNumber1].summary},{name:my_array[randomNumber2].name,summary:my_array[randomNumber2].summary}]

        res.status(200).send({ data,user});
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Internal server error.' });
    }
});


router.get("/myget",(req,res)=>{
    res.json({ab:"op"})
})


module.exports=router

