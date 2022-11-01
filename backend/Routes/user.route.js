const e = require("express");
const { Router } = require("express");
const Authentification = require("../Middlewares/Authentification.js");
const LoginModel = require("../Models/Login.model.js");
const Media = require("../Models/Media.js");

const userController = Router();

userController.get("/subscribe",Authentification,async (req,res)=>{
    const {email}=req.body
    const CheckfirstTime=await LoginModel.findOne({email})
    console.log(CheckfirstTime)
  if(CheckfirstTime.count==1){
       await LoginModel.updateOne({email},{$inc:{count:1}})
       return res.send(true)
    }
    else{
        return res.send(false)
    }
})

userController.get("/media/videos",Authentification,async(req,res)=>{
    const {email}=req.body
    const FindUser=await LoginModel.findOne({email})
    let givenPlan=FindUser.plan
    const Videos=await Media.find({plan:givenPlan})
    res.json(Videos)
})

module.exports=userController