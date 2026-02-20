const express = require("express");
const router = express.Router();
const Message = require("../apis/Chat/ChatModel");
const BookingModel = require("../apis/Booking/BookingModel");
const UserModel = require("../apis/User/UserModel");



router.post("/get-chat-farmers", (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.json({ success: false, message: "UserId is required" });
  }

  BookingModel.find({ userId, status: true }) // only confirmed bookings
    .populate({
      path: "landId",
      populate: { path: "farmerId", model: "UserModel", select: "name email contact" }
    })
    .then(bookings => {
      if (!bookings.length) return res.json({ success: true, data: [] });

      // Remove duplicate farmers
      const farmersMap = {};
      bookings.forEach(b => {
        if (b.landId && b.landId.farmerId) {
          farmersMap[b.landId.farmerId._id] = b.landId.farmerId;
        }
      });

      res.json({ success: true, data: Object.values(farmersMap) });
    })
    .catch(err => res.json({ success: false, message: err.message }));
});




// Get all users who booked this farmer's lands
router.post("/get-chat-users", async (req, res) => {
  const { farmerId } = req.body;

  if (!farmerId) {
    return res.json({ success: false, message: "FarmerId is required" });
  }

  try {
    // Get all bookings where this farmer's land was booked and status is confirmed
    const bookings = await BookingModel.find({ status: true })
      .populate({
        path: "userId", // user who booked
        select: "name email contact "
      })
      .populate({
        path: "landId",
        match: { farmerId } // only lands owned by this farmer
      });

    // Filter bookings where landId exists (some bookings may be unrelated)
    const filteredBookings = bookings.filter(b => b.landId);

    // Remove duplicate users
    const usersMap = {};
    filteredBookings.forEach(b => {
      if (b.userId) {
        usersMap[b.userId._id] = b.userId;
      }
    });

    res.json({ success: true, data: Object.values(usersMap) });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});
// Get admin for farmer chat
router.post("/get-admin", async (req, res) => {
  try {
    // You may have a single admin or multiple admins
    const admin = await UserModel.findOne({ userType: "1" }).select("name email _id");
    if (!admin) return res.json({ success: false, message: "No admin found" });

    res.json({ success: true, data: [admin] }); // return as array for sidebar
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// Get all farmers for admin chat
router.post("/get-chat-adminfarmers", async (req, res) => {
  try {
    // Optional: you could filter only farmers who have at least one confirmed booking
    const farmers = await UserModel.find({ userType: "2" }).select("_id name email contact");

    res.json({
      success: true,
      data: farmers
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});





// ✅ Load old messages
router.post("/get-messages", async (req, res) => {
  try {
    const { userId, receiverId } = req.body;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: receiverId },
        { senderId: receiverId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      data: messages
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});


// ✅ Get conversations for Farmer
router.post("/conversations", async (req, res) => {
  try {
    const { farmerId } = req.body;

    const messages = await Message.find({
      $or: [
        { senderId: farmerId },
        { receiverId: farmerId }
      ]
    });

    // Extract unique users except self
    const users = new Set();

    messages.forEach(msg => {
      if (msg.senderId.toString() !== farmerId) {
        users.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== farmerId) {
        users.add(msg.receiverId.toString());
      }
    });

    res.json({
      success: true,
      data: Array.from(users)
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});


// ✅ Get conversations for Admin
router.post("/admin-conversations", async (req, res) => {
  try {
    const { adminId } = req.body;

    const messages = await Message.find({
      $or: [
        { senderId: adminId },
        { receiverId: adminId }
      ]
    });

    const users = new Set();

    messages.forEach(msg => {
      if (msg.senderId.toString() !== adminId) {
        users.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== adminId) {
        users.add(msg.receiverId.toString());
      }
    });

    res.json({
      success: true,
      data: Array.from(users)
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});








module.exports = router; // 🔥 THIS LINE IS IMPORTANT
