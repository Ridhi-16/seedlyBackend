const ContactModel = require("./ContactModel")
add = (req, res) => {
    let formData = req.body
    let validation = ""

    if (!formData.name) {
        validation += "Name is required "
    }
    if (!formData.email) {
        validation += "Email is required "
    }
    if (!formData.message) {
        validation += "Message is required "
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        let contactObj = new ContactModel()

        contactObj.name = formData.name
        contactObj.email = formData.email
        contactObj.subject = formData.subject
        contactObj.message = formData.message

        contactObj.save()
            .then((contactData) => {
                res.json({
                    status: 200,
                    success: true,
                    message: "Contact Added Successfully",
                    data: contactData
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
}
all = (req, res) => {

    ContactModel.find()
        .then((contactData) => {
            if (contactData.length > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Contact Data Found",
                    data: contactData
                })
            }
            else {
                res.json({
                    status: 404,
                    success: false,
                    message: "No Contact Data Found"
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
changeStatus = (req, res) => {

    let formData = req.body
    let validation = ""

    if (!formData._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.json({
            status: 422,
            success: false,
            message: validation
        })
    }
    else {
        ContactModel.findOne({ _id: formData._id })
            .then((contactData) => {

                if (!contactData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "No Contact Found"
                    })
                }
                else {

                    contactData.status = !contactData.status

                    contactData.save()
                        .then((updatedData) => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Status Updated",
                                data: updatedData
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


module.exports = { add, all, changeStatus }