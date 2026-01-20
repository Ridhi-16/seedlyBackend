const express=require("express")
const router=express.Router()
const UserController=require("../apis/User/UserController")
const LandController=require("../apis/Land/LandController")
const BookingController=require("../apis/Booking/BookingController")
const ProgressController=require("../apis/Progress/ProgressController")
const SeasonController=require("../apis/Season/SeasonController")
const CropController=require("../apis/Crop/CropController")
const DasboardController=require("../apis/Dashboard/Dashboard")




router.post("/user/login",UserController.login)
router.post("/user/register",UserController.register)
router.post("/user/farmerregister",UserController.farmerregister)




//user
router.post("/user/all",UserController.all)
router.post("/user/single",UserController.single)
router.post("/user/update",UserController.update)





//crop
router.post("/crop/all",CropController.all)
router.post("/crop/single",CropController.single)

//Farming progress
router.post("/progress/all",ProgressController.all)
router.post("/progress/single",ProgressController.single)

//season

router.post("/season/all",SeasonController.all)
router.post("/season/single",SeasonController.single)

//land

router.post("/land/all",LandController.all)
router.post("/land/single",LandController.single)

//booking

router.post("/booking/all",BookingController.all)
router.post("/booking/single",BookingController.single)

router.post("/dashboard",DasboardController.Dashboard)




module.exports=router