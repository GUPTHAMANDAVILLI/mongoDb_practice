const bcrypt = require('bcrypt')
const User = require('../models/users')

const signup = async (req,res)=>{

    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = await User.create({
        "username":req.body.username,
        "password":hashedPassword
    })

    res.send(user)
}

const login = async(req,res)=>{
    const {username,password}=req.body

    const user=await User.findOne({username})

    if(!user)
    {
        return res.send("User not found")
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        return res.send("Password Incorrect")
    }
    // if(user.password!==password)
    // {
    //     return res.send("password incorrect")
    // }

    res.send("login successfull")
} 

module.exports = {signup,login}