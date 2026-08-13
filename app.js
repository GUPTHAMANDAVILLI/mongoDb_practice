const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

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

const signpSchema =new mongoose.Schema({
    username :{
        type : String,
        required : true,
    },
    password :{
        type :String,
        required :true,
    }
})

const User = mongoose.model('User',signpSchema)

app.get('/users', async(req,res)=>{
    const users= await User.find()
    res.send(users)
})

app.post('/login',async(req,res)=>{
    const {username,password}=req.body

    const user=await User.findOne({username})

    if(!user)
    {
        return res.send("User not found")
    }
    if(user.password!==password)
    {
        return res.send("password incorrect")
    }

    res.send("login successfull")
})


app.listen(5000,()=>{
    console.log("Server Connected Successfully")
})