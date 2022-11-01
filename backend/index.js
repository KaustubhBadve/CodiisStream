const express=require("express")
const app=express()
app.use(express.json())
const path = require("path");
require('dotenv').config()

const Connection = require("./Config/db")
var cors = require('cors')
const mediaRoutes = require("./Routes/media");
app.use("/public", express.static(path.join(__dirname, "public")));

var logRouter=require("./Routes/Login.route");
const userController = require("./Routes/user.route");

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})

app.use("/auth",logRouter)
app.use("/user",userController)
app.use("/api/v1/media", mediaRoutes);

app.listen(process.env.PORT,async()=>{
    try{
        await Connection
        console.log("PORT started at",process.env.PORT)
    }
    catch(err){
        console.log(err);
    }
})