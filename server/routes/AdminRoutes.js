const express=require("express")
const router=express.Router()
const multer=require("multer")

const UserController=require("../apis/User/UserController")
const SeasonController=require("../apis/Season/SeasonController")
const LandController=require("../apis/Land/LandController")
const BookingController=require("../apis/Booking/BookingController")
const ContactController=require("../apis/Contact/ContactController")



let SeasonStorage= multer.memoryStorage()
const SeasonUpload = multer({ storage: SeasonStorage })



router.use(require("../middleware/AdminTokenChecker"))

//user
router.post("/user/softDelete",UserController.softDelete)
router.post("/user/delete",UserController.Delete)


router.post("/contact/all",ContactController.all)
router.post("/contact/changeStatus",ContactController.changeStatus)



//land
router.post("/land/softDelete",LandController.softDelete)


//season
router.post("/season/add",SeasonUpload.single("image"),SeasonController.add)

router.post("/season/update",SeasonUpload.single("image"),SeasonController.update)
router.post("/season/softDelete",SeasonController.softDelete)
router.post("/season/delete",SeasonController.Delete)


//booking

// router.post("/booking/softDelete",BookingController.softDelete)
// router.post("/booking/delete",BookingController.Delete)





module.exports=router