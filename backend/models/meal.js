const mongoose  = require('mongoose')
const Meal = mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    sourav:{
        type:String,
        required: true
    },
    mannan:{
        type:String,
        required: false
    },
    arif:{
        type:String,
        required: false
    }
})
module.exports = Meal;