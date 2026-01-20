require("dotenv").config();

const express = require('express');
const app = express();

const db=require("./server/config/db")
const seed=require("./server/config/seed")

const cors=require("cors")

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))
const api=require("./server/routes/ApiRoutes")
app.use("/api",api)

const gemini=require("./server/routes/GeminiRoutes")
app.use("/gemini", gemini);

const admin=require("./server/routes/AdminRoutes")
app.use("/admin",admin)

const farmer=require("./server/routes/FarmerRoutes")
app.use("/farmer",farmer)

const user=require("./server/routes/UserRoutes")
app.use("/user",user)



const PORT = 5000;
app.listen(PORT,()=>{
    console.log("port is working at ",PORT)
})
app.get("/",(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"Api is working"
    })
})
app.post("/first",(req,res)=>{
    res.json({
        status:200,
        success:true,
        message:"First post api is working"
    })
})
// app.all("/**",(req,res)=>{
//     res.status(404).json({
//         status:404,
//         success:false,
//         message:"Not found!!"
//     })
// })