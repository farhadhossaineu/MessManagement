const express = require('express');
const { default: mongoose } = require('mongoose');
const Expense = require('../models/expense');
const expenseRoute = express.Router()


const ExpenseModel = new mongoose.model('expense',Expense)


expenseRoute.post('/',async(req,res,next)=>{
    const newExpense = new ExpenseModel(req.body)
    try{
        const newData = await newExpense.save();
        res.status(200).json(newData);
        // res.status(200).json(savedDeposite);
    }catch(err){
        next(err)
    }
})

expenseRoute.put('/:id',async(req,res,next)=>{
    try{
        const Edit = await ExpenseModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(Edit)
    }
    catch(err){
        next(err)
    }
})

expenseRoute.delete('/:id',async(req,res,next)=>{
    try{
        await ExpenseModel.findByIdAndDelete(req.params.id)
        res.status(200).json("SUccess!!")
    }
    catch(err){
        next(err)
    }
})

expenseRoute.get('/',async(req,res,next)=>{
    try{
        const getData = await ExpenseModel.find();
        res.status(200).json(getData)
    }
    catch(er){
        next(er)
    }
})

module.exports = expenseRoute;