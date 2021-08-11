
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const cors = require('cors')

const whitelist = ['http://localhost:3000',]

const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

const mongodbURI = process.env.MONGODBURI

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page

mongoose.connect(mongodbURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    console.log('the connection with mongod is established');
  });

mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})


app.use(express.json());
app.use(cors({origin:'*'}))
// Controllers/Routes
const stocksController = require('./controllers/stocks.js')
app.use('/api/stocks', stocksController)







app.listen(PORT, () => {
  console.log('Connected to ', PORT)
})