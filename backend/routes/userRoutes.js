import express from "express";
const userRoute=express.Router()

userRoute.post('/sigin',(req,res)=>{
    res.send("signin")
})
userRoute.post('/signup',(req,res)=>{
    res.send("signup")
})

export default userRoute