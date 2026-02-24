const ProgressModel = require("./ProgressModel")

add = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData.bookingId) {
        validation += "BookingId is required"
    }
    if (!formData.progressStage) {
        validation += "ProgressStage is required"
    }
    if (!formData.description) {
        validation += "Description is required"
    }


    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        //duplicacy     
        ProgressModel.findOne({ bookingId: formData.bookingId })
            .then(async (progressData) => {
                if (!progressData) {
                    let progressObj = new ProgressModel()
                    progressObj.farmerId = req.decoded.userId
                    progressObj.bookingId = formData.bookingId
                    progressObj.progressStage = formData.progressStage
                    progressObj.description = formData.description

                    progressObj.save()
                        .then((progressData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Progress Added!!",
                                data: progressData
                            })
                        })
                        .catch((err) => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "internal server error"
                            })
                        })
                } else {
                    res.json({
                        status: 200,
                        success: false,
                        message: "Data already exist on given name"
                    })
                }
            })
            .catch((err) => {
                console.log(err);

                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!"
                })
            })

    }
}


all = (req, res) => {
    let formData = req.body
    ProgressModel.find(req.body)
        .populate({
            path: "bookingId",
            populate: {
                path: "userId",
                select: "name"   // only  name
            }
        })

        .populate({
            path: "farmerId",
            select: "name keyword"
        })
        .populate({
            path: "bookingId",
            populate: {
                path: "landId",
                select: {
                    ULPIN: 1,
                    location: 1
                }
            }
        })

        .then((progressData) => {
            if (progressData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Progresss Data is as:",
                    data: progressData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "There are no Progresss"
                })

            }
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
}


single = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        ProgressModel.findOne({ _id: req.body._id })
            // .populate({
            //     path:"bookingId",
            //     select:"name keyword"
            // })
            .then((progressData) => {
                if (!progressData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no Progress "
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Progress Data is as",
                        data: progressData
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })
    }
}
update = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        ProgressModel.findOne({ _id: req.body._id })
            .then((progressData) => {
                if (!progressData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {

                    if (!!formData.progressStage) {
                        progressData.progressStage = formData.progressStage
                    }
                    if (!!formData.description) {
                        progressData.description = formData.description
                    }

                    progressData.save()
                        .then((progressData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Progress Updated",
                                data: progressData
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
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"

                })
            })

    }
}

softDelete = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            sucess: false,
            message: validation
        })
    }
    else {
        ProgressModel.findOne({ _id: req.body._id })
            .then((progressData) => {
                if (!progressData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no Progress found on this id"
                    })
                }
                else {
                    progressData.status = !progressData.status
                    progressData.save()
                        .then((progressData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status updated",
                                data: progressData
                            })
                        })
                        .catch((err) => {
                            console.log(1);

                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error"
                            })
                        })
                }

            })
            .catch((err) => {
                console.log(err);

                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error!!"
                })
            })
    }

}
Delete = (req, res) => {
    let formData = req.body
    let validation = ""
    if (!formData._id) {
        validation += "_ID IS REQUIRED"
    }
    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        ProgressModel.findOne({ _id: req.body._id })
            .then((progressData) => {
                if (!progressData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "There is no data"
                    })
                }
                else {
                    ProgressModel.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Progress deleted!!"
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
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error"
                })
            })

    }


}

module.exports = { add, all, single, update, softDelete, Delete }