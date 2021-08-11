const Stocks = require('../models/stocks.js')
const express = require('express')
const stock = express.Router()
// http://127.0.0.1:8000/api/stocks/

stock.get("/", (req, res)=>{
    Stocks.find({}, (err, foundStock)=>{
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).send(foundStock)
    })
})

stock.post("/", async (req, res)=>{
    Stocks.create(req.body, (err, createStock)=>{
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).send(createStock)
    })
})

stock.delete("/:id", (req, res)=>{
    Stocks.findByIdAndRemove(req.params.id, (err, deleteStock)=>{
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).send(deleteStock)
    })
})


stock.put("/:id", async (req, res)=>{
    Stocks.findByIdAndUpdate(req.params.id,
        {$set: {symbol:req.body}},
        { new: true }, 
        (err, updatedStock)=>{
        if(err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).send(updatedStock)
    })
})

module.exports = stock
