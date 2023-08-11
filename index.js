require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const connectToDatabase = require('./Utils/connectToDatabase')
const pageRoutes = require('./Routes/Page/Page')
const port = process.env.PORT || 5000

// Configure Common Middlewares here

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectToDatabase()

// All Routes

app.use('/api',pageRoutes)


app.listen(port,(err) => {
    if(err) throw new Error(`Some unknown error occurred ${err}`)
    console.log(`Server started listening on Port`,port)
})
    





