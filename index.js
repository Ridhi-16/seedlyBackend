require("dotenv").config();

const express = require('express');
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const db = require("./server/config/db");
const seed = require("./server/config/seed");

const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "40mb" }));

const api = require("./server/routes/ApiRoutes");
app.use("/api", api);

const gemini = require("./server/routes/GeminiRoutes");
app.use("/gemini", gemini);

const admin = require("./server/routes/AdminRoutes");
app.use("/admin", admin);

const farmer = require("./server/routes/FarmerRoutes");
app.use("/farmer", farmer);

const user = require("./server/routes/UserRoutes");
app.use("/user", user);

// ✅ Attach Chat Routes
const chatRoutes = require("./server/routes/ChatRoutes");
app.use("/chat", chatRoutes);


// Create HTTP server
const server = http.createServer(app);

// ✅ Create Socket.io instance
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ✅ Store online users
const onlineUsers = {};

// ✅ Import Message Model
const Message = require("./server/apis/Chat/ChatModel");

// Socket connection
io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("register_user", (userId) => {
    onlineUsers[userId] = socket.id;
  });

 socket.on("private_message", async ({ to, from, message }) => {
  try {
    const newMessage = await Message.create({
      senderId: from,
      receiverId: to,
      message
    });

    // Send to receiver
    const receiverSocketId = onlineUsers[to];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_private", newMessage);
    }

    // 🔥 ALSO send back to sender
    const senderSocketId = onlineUsers[from];
    if (senderSocketId) {
      io.to(senderSocketId).emit("receive_private", newMessage);
    }

  } catch (error) {
    console.error("Message Save Error:", error.message);
  }
});


  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});