const BookingModel=require("./BookingModel")

add=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData.price){
        validation+="price is required"
    }
    if(!formData.leaseStartDate){
        validation+="leaseStartDate is required"
    }
    if(!formData.leaseEndDate){
        validation+="leaseEndDate is required"
    }
     if(!formData.landId){
        validation+="landId is required"
    }
    
    if(!formData.cropId){
        validation+="cropId is required"
    }
    if(!formData.seasonId){
        validation+="seasonId is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
   else{
        //duplicacy     
        BookingModel.findOne({
  landId: formData.landId,
  leaseStartDate: { $lte: formData.leaseEndDate },
  leaseEndDate: { $gt: formData.leaseStartDate }
})

        .then(async (bookingData)=>{
            if(!bookingData){
                let bookingObj= new BookingModel()
                bookingObj.userId=req.decoded.userId
                bookingObj.price=formData.price
                bookingObj.landId=formData.landId
                bookingObj.cropId=formData.cropId
                bookingObj.seasonId=formData.seasonId
                bookingObj.leaseStartDate=formData.leaseStartDate
                bookingObj.leaseEndDate=formData.leaseEndDate



                bookingObj.save()
                .then((bookingData)=>{
                    
                    res.json({
                        status:200,
                        success:true,
                        message:"booking Added!!",
                        data:bookingData
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Booking already exist"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
       
    }
}


all=(req,res)=>{
    let formData=req.body
    BookingModel.find(req.body)
        .populate({
            path: "userId",
            select: "name keyword"
        })
        .populate({
            path: "cropId",
            select: "cropName keyword"
        })
        .populate({
            path: "seasonId",
            select: "seasonName keyword"
        })
        
        .populate({
            path: "landId",
            populate: {
                path: "farmerId",
                select: "name"   // only farmer name
            }
        })
    .then((bookingData)=>{
        if(bookingData.length>0){
           res.json({
                status:200,
                success:true,
                message:"Bookings Data is as:",
                data:bookingData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"there are no Bookings"
            })
            
        }
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"internal server error",
            error:err.message
        })
    })
}


single=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        BookingModel.findOne({_id:req.body._id})
        .populate({
            path:"userId",
            select:"name keyword"
        })
        .then((bookingData)=>{
            if(!bookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no Booking "
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Booking Data is as",
                    data:bookingData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"internal server error"
            })
        })
    }
}
update=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        BookingModel.findOne({_id:req.body._id})
        .then((bookingData)=>{
            if(!bookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                
                
                if(!!formData.price){
                    bookingData.price=formData.price
                }
                
                bookingData.save()
                .then((bookingData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Booking Updated",
                        data: bookingData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error"
                       
                    })
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "internal server error"
                
            })
        })

    }
}

softDelete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            sucess:false,
            message:validation
        })
    }
    else{
        BookingModel.findOne({_id:req.body._id})
        .then((bookingData)=>{
           if(!bookingData){
            res.json({
                status:404,
                sucess:false,
                message:"there is no Booking found on this id"
            })
           }
           else{
            bookingData.status=!bookingData.status
            bookingData.save()
            .then((bookingData)=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Booking updated",
                    data:bookingData
                })
            })
            .catch((err)=>{
                console.log(1);
                
                res.json({
                    status:500,
                    success:false,
                    message:"internal server error"
                })
            })
           }

        })
        .catch((err)=>{
            console.log(err);
            
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }

}
Delete=(req,res)=>{
    let formData=req.body
    let validation=""
    if(!formData._id){
        validation+="_ID IS REQUIRED"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        BookingModel.findOne({_id:req.body._id})
        .then((bookingData)=>{
            if(!bookingData){
                res.json({
                    status:404,
                    success:false,
                    message:"there is no data"
                })
            }
            else{
                BookingModel.deleteOne({_id:req.body._id})
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            message: "Booking deleted!!"
                        })
                    })
                    .catch((err) => {
                        res.json({
                            status: 500,
                            success: false,
                            message: "Internal server error"
                        })
                    })
            }

        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error"
            })
        })    

    }


}

module.exports={add,all,single,update,softDelete,Delete}