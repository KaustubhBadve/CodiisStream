const mongoose = require("mongoose");

require("dotenv").config();

const Connection = mongoose.connect(process.env.MONGOOSEURL);

module.exports=Connection;
