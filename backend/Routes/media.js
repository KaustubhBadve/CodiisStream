// const { Router, application } = require("express");
// const fs=require("fs")
// videoController=Router()
// const multer=require("multer")
// const path=require("path");
// const VideoModel = require("../Model/Video.model");


// const storage=multer.diskStorage({
//     destination:function(req,file,cb)
//     {
//         if(!fs.existsSync("public")){
//             fs.mkdirSync("public")
//         }

//         if(!fs.existsSync("public/videos")){
//             fs.mkdirSync("public/videos")
//         }
//         cb(null,"public/videos")
//     },
//     filename: function(req,file,cb){
//         cb(null,Date.now()+file.originalname)
//     } 
// })

// const upload=multer({
//     storage:storage,
//     fileFilter:function(req,file,cb){
//         var ext=path.extname(file.originalname)
//         if(ext!==".mkv" && ext!==".mp4")
//         {
//             return cb(new Error("Only Videos allowed"))
//         }

//         cb(null,true)
//     }
// })


// application.post(("/postvideo",upload.fields([{name:"videos",maxCount:5}]),async(req,res)=>{
//     const {name}=req.body 
//     let videoPaths=[]
//     console.log("req.body",req.body)
//     if(Array.isArray(req.files.videos) && req.files.videos.length>0){
//         for(let video of req.files.videos){
//             videoPaths.push("/"+video.path)
//         }
//     }
//     const createMedia=await VideoModel.create({
//            name,
//            videos:videoPaths
//     })
//     res.send({messege:"Post Succesfull",createMedia})
// }))

// module.exports=videoController

const express = require("express");
const mediaController = require("../controllers/mediaControllers");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }

    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed!"));
    }

    cb(null, true);
  },
});

const router = express.Router();

router.get("/all", mediaController.getAll);

router.post(
  "/create",
  upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
  mediaController.create
);

module.exports = router;