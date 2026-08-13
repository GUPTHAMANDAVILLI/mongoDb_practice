const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')


const app = express()

app.use(express.json())
app.use(cors())

async function connectDb(){
    try{
       await mongoose.connect('mongodb://localhost:27017/collegecoders')
       console.log("Database Connected")
    }
    catch(error)
    {
        console.log("Database not Connected")
    }
}
connectDb()


app.use(authRoutes)

app.listen(5000,()=>{
    console.log("Server Connected Successfully")
})