const express = require('express')
const { default: mongoose } = require('mongoose')
const Meal = require('../models/meal')
const mealRoute = express.Router()


const MealModel = new mongoose.model('meal',Meal)

mealRoute.post('/',async(req,res,next)=>{
    const NewMeal = new MealModel(req.body)
    try{
        const data = await NewMeal.save()
        res.status(200).json(data);
    }
    catch(err){
        next(err)
    }
})

mealRoute.put('/:id',async(req,res,next)=>{
    try{
        const data = await MealModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(data);
    }
    catch(er){
        next(er)
    }
})

mealRoute.delete('/:id', async(req,res,next)=>{
    try{
        await MealModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Success!!!")
    }
    catch(err){
        next(err)
    }
})

mealRoute.get('/',async(req,res,next)=>{
    try{
        const data = await MealModel.find();
        res.status(200).json(data)
    }
    catch(err){
        next(err);
    }
})

module.exports = mealRoute