const mongoose = require('mongoose')
const Deposit = mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    }
})

module.exports = Deposit