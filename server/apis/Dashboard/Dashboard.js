const express=require("express")
const mongoose=require("mongoose")

const router=express.Router()
const UserModel=require("../User/UserModel")
const LandModel=require("../Land/LandModel")
const BookingModel=require("../Booking/BookingModel")
const ProgressModel=require("../Progress/ProgressModel")
const SeasonModel=require("../Season/SeasonModel")
const CropModel=require("../Crop/CropModel")

const Dashboard=async(req,res)=>{
    var totalCrop = 0
    var totalFarmers = 0
    var totalUsers = 0
    var totalProgress = 0
    var totalSeason = 0
    var totalCrop = 0
    var totalfarmLand = 0
    var totalBooking = 0
    var totaluserBooking = 0
    var totalfarmCrop=0
    var totalLand=0
    

    await UserModel.countDocuments()
   .then((tusers)=>{
            totalUsers = tusers
   })
  
   await UserModel.countDocuments({userType:2})
   .then((tfarmer)=>{
            totalFarmers = tfarmer
   })
    
   await SeasonModel.countDocuments()
   .then((tseason)=>{
            totalSeason = tseason
   })
   await LandModel.countDocuments()
   .then((tland)=>{
            totalLand = tland
   })
   await ProgressModel.countDocuments()
   .then((tprog)=>{
            totalProgress = tprog
   })
   await CropModel.countDocuments()
   .then((tCrop)=>{
            totalCrop = tCrop
   })
   await LandModel.countDocuments({farmerId:req.body.farmerId})
   .then((tfarmLand)=>{
            totalfarmLand = tfarmLand
   })
    await CropModel.countDocuments({farmerId:req.body.farmerId})
   .then((tfarmCrop)=>{
            totalfarmCrop = tfarmCrop
   })
   await BookingModel.countDocuments()
   .then((tbooking)=>{
            totalBooking = tbooking
   })
    const farmerId = req.body.userId;;

    // 1️⃣ farmer's lands
    const lands = await LandModel.find(
        { farmerId },
        { _id: 1 }
    );

    // if no lands
    // if (lands.length === 0) {
      
    // }

    const landIds = lands.map(l => l._id);

    // 2️⃣ count bookings
    const totalFarmerBookings = await BookingModel.countDocuments({
        landId: { $in: landIds }
    });

    



   res.send({
        status:200,
        success:true,
        message:"dashboard loaded!!",
        totalusers:totalUsers,
        // totaltrainers:totalTrainer,
        totalFarmers:totalFarmers,
        totalLand:totalLand,
        totalSeason:totalSeason,
        totalCrop:totalCrop,
        totalprogress:totalProgress,
        totalBooking:totalBooking,
        totalfarmLand:totalfarmLand,
        totalFarmerBookings:totalFarmerBookings,
        totalfarmCrop:totalfarmCrop
   })



}


module.exports= {Dashboard}