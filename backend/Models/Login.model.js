const mongoose = require("mongoose");

const LoginModel = mongoose.model("Auth",mongoose.Schema({
    name: { type: String },
    email: { type: String},
    password: { type: String},
    age: { type: Number},
    gender: { type: String},
    role: { type: String},
    subscription: { type: String},
    // firstTime:{type:Boolean,default:true},
    count:{type:Number},
    plan:{type:String,default:"not selected"}
  })
);

module.exports = LoginModel
