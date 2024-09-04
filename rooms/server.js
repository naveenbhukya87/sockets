const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const morgan = require('morgan')
const app = express();
app.use(morgan("dev"))
app.use(bp.urlencoded({ extended: true }));
app.use(cors())
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
})
app.use(express.static("ui"))
const path = require('path')
app.get("/", async (_, res) => {
    const homePath = path.join(__dirname, "ui/index.html")
    res.sendFile(homePath)
})
const PORT = process.env.PORT || 5000;
let room_no = 1;
let room_count = 0; //max = 2
io.on("connection", function (socket) {
    console.log("Socket is connected")
    socket.join(`room-${room_no}`);
    io.sockets.in(`room-${room_no}`).emit("chat-messages", `Connected to room no - ${room_no}`)
    room_count++;
    if (room_count == 2) {
        room_count = 0;
        room_no++;
    }

    socket.on("disconnect", function () {
        console.log("Socket is disconnected")
        room_count--;
        io.sockets.in(`room-${room_no}`).emit("chat-messages", `Connected to room no - ${room_no}`)
    })
})

http.listen(PORT, () => {
    console.log("Server is up and running on " + PORT)
})
