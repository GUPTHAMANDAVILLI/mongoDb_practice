const express = require('express')
const mongoose =require('mongoose')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/collegecoders')
.then(()=>{
    console.log("mongoDB Connected")
}).catch((err)=>{
    console.log("mongoDB not Connected")
})

//Schema Design

const signupSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
})

const User = mongoose.model('User',signupSchema)

app.post('/signup',async (req,res)=>{

    const user = await User.create(req.body)

    res.send(user)
})

app.get('/users', async (req,res)=>{
    const Users = await User.find()
    res.send(Users)
})

app.get('/users/:username', async (req,res)=>{
    const Users = await User.findOne(
        {"username": req.params.username}
    )
    res.send(Users)
})

app.put('/users/:username',async(req,res)=>{
   await User.updateOne({
    "username":req.params.username},
    req.body
)
    res.send("password updated")
    
    
})

app.delete('/users/:username',async (req,res)=>{
    await User.deleteOne({"username":req.params.username})

    res.send("Deleted")
})

app.get('/',(req,res)=>{
    res.send("Home Route")
})

app.listen(5000,()=>{

console.log(`🚀SERVER RUNNING SUCCESSFULLY🚀`);
})