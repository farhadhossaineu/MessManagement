const express = require("express");
const Deposit = require("../models/deposit");
const depositeRoute = express.Router();
const mongoose = require('mongoose')

const DepositModel = mongoose.model('deposit',Deposit)


//Create 
depositeRoute.post('/',async(req,res,next)=>{
    const newDeposit = new DepositModel(req.body)
    try{
        const savedDeposite = await newDeposit.save()
        res.status(200).json(savedDeposite);
    }
    catch(err){
        next(err)
    }
})

//Update
depositeRoute.put('/:id',async(req,res,next)=>{
    try{
         const updateDeposite = await DepositModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
         //new true because of it will give us the current
         //updated value. cz findbyidandupdate gives us
         //prev value.
         res.status(200).json(updateDeposite);
    }
    catch(err){
        next(err)
    }

})

//Delete
depositeRoute.delete('/:id',async(req,res,next)=>{
    try{
        await DepositModel.findByIdAndDelete(req.params.id)
        res.send("Success")
    }
    catch(err){
        next(err)
    }
})

//Get
depositeRoute.get('/',async(req,res,next)=>{
    try{
        const getDeposit = await DepositModel.find();
        res.status(200).json(getDeposit)
    }
    catch(err){
        next(err)
    }
})

module.exports = depositeRoute;