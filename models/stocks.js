const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const SetSymbols=[
    {1:0},
    {2:0},
    {3:0},
    {4:0}
]

const StockScheme = mongoose.Schema({
    stock_name: {type: String, required: true},
    symbol: {type: Array , default: SetSymbols},
    user_owner:{type: String, default: null} 
})

const UserSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  
})

module.exports = mongoose.model('Stocks', StockScheme)