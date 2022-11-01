const { Router } = require("express");
const LoginModel = require("../Models/Login.model.js");

const userauthentification = Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const Authentification = require("../Middlewares/Authentification.js");
require("dotenv").config();

userauthentification.post("/signup", async (req, res) => {
  const { email, password, age, name, gender, role } = req.body;

  const Alreadyuser = await LoginModel.find({ email });
  if (Alreadyuser.length > 0) {
    return res.send("ALready User Exists");
  }

  bcrypt.hash(password, 8, function (err, hash) {
    if (err) {
      return res.status(401).send("Please try again later");
    } else {
      const NewUser = new LoginModel({
        email,
        password:hash,
        age,
        name,
        gender,
        role,
        count:1
      });
      NewUser.save();
      res.status(200).send({ messege: "Signup Succesfull", NewUser });
    }
  });
});

userauthentification.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const Finduser = await LoginModel.findOne({ email });
  if (Finduser) {
    let hash = Finduser.password;
    let userid = Finduser._id;
    let name=Finduser.name
    let role=Finduser.role

    bcrypt.compare(password, hash,async function (err, result) {
      if(err){
        return res.status(404).send("Invalid Credentials");
      } else {
        var token = jwt.sign({ email, userid }, process.env.SECRET);
        await LoginModel.updateOne({ email },{$set:{firstTime:false}});
        return res.status(200).send({ messege: "Login Succesfull", Finduser, token, name,role });
      }
    });
  } else {
    return res.status(404).send("Invalid Credentials");
  }
});

userauthentification.patch("/updatePlan",Authentification,async (req,res)=>{
  const {plan,email}=req.body

  const Finduser = await LoginModel.findOneAndUpdate({ email },{$set:{plan:plan}});
  res.send({messege:"Update Successfully",Finduser})

})

module.exports = userauthentification;
