require('dotenv').config();
const mongoose=require("mongoose")
const mongoURL = process.env.MONGO_URI;
mongoose.connect(mongoURL)
.then(()=>{
    console.log("Database is connected"); 
})
.catch((error)=>{
    console.log("Error while connecting database", error); 
})

