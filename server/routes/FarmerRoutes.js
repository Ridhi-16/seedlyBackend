const express=require("express")
const router=express.Router()
const multer=require("multer")
const UserController=require("../apis/User/UserController")
const SeasonController=require("../apis/Season/SeasonController")
const LandController=require("../apis/Land/LandController")
const CropController=require("../apis/Crop/CropController")
const ProgressController=require("../apis/Progress/ProgressController")
const BookingController=require("../apis/Booking/BookingController")


router.post("/user/login",UserController.login)


let LandStorage= multer.memoryStorage()
const LandUpload = multer({ storage: LandStorage })

let CropStorage= multer.memoryStorage()
const CropUpload = multer({ storage: CropStorage })

router.use(require("../middleware/FarmerTokenChecker"))


//crop
router.post("/crop/add",CropUpload.single("image"),CropController.add)
router.post("/crop/update",CropUpload.single("image"),CropController.update)
router.post("/crop/softDelete",CropController.softDelete)
router.post("/crop/delete",CropController.Delete)

// progress
router.post("/progress/add",ProgressController.add)

router.post("/progress/update",ProgressController.update)
router.post("/progress/softDelete",ProgressController.softDelete)
router.post("/progress/delete",ProgressController.Delete)

//land
router.post("/land/add",LandUpload.array("images", 5),LandController.add)
router.post("/land/update",LandUpload.array("images", 5),LandController.update)

router.post("/land/delete",LandController.Delete)

//booking
// router.post("/booking/update",BookingController.update)

router.post("/booking/softDelete",BookingController.softDelete)
router.post("/booking/delete",BookingController.Delete)








module.exports=router
