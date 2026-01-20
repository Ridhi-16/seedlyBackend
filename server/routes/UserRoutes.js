const express=require("express")
const router=express.Router()
const UserController=require("../apis/User/UserController")
const SeasonController=require("../apis/Season/SeasonController")
const LandController=require("../apis/Land/LandController")
const CropController=require("../apis/Crop/CropController")
const ProgressController=require("../apis/Progress/ProgressController")
const BookingController=require("../apis/Booking/BookingController")


router.post("/user/login",UserController.login)


router.use(require("../middleware/UserTokenChecker"))


router.post("/user/booking/add",BookingController.add)
router.post("/user/booking/update",BookingController.update)




module.exports=router

