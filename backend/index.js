const express=require('express')
const cors = require('cors')

const mongoose = require('mongoose');
MONGODB_URL="mongodb+srv://Parush:Parush%40123@cluster0.omand.mongodb.net/black"
mongoose.connect(MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})

const userRouter=require('./routers/user')
const transactionRouter=require('./routers/transaction')

const app=express()
const port=3000

app.use(express.json());
app.use(userRouter)
app.use(transactionRouter)
app.use(cors())

app.listen(port,()=>{
    console.log('server is up on port ' + port);
})