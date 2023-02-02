const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv') // to read env content
dotenv.config()
//now const a =  process.env.VarName


const depositeRoute = require('./routes/depositeRoute');
const expenseRoute = require('./routes/expenseRoute');
const mealRoute = require('./routes/mealRoute');




const url = "mongodb://localhost:27017/MessManagement"
const app = express()
const connect = async()=>{
    try{
        await mongoose.connect(url);
        console.log("Connected to Mongodb")
    }
    catch(err){
        console.log("there was a  problem")
    }
}
mongoose.connection.on('disconnected',()=>{
    console.log("Mongo Disconnected")
})
mongoose.connection.on('connected',()=>{
    console.log("Mongo Connected")
})

app.use(cors())
app.use(express.json())
app.use('/deposite',depositeRoute);
app.use('/expense',expenseRoute);
app.use('/meal',mealRoute);



app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMsg = err.message || "Something went wrong"
    return res.status(errStatus).json(errMsg)
})



app.listen(8800,()=>{
    connect()
    console.log("conntected to Backend")
})