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

io.on("connection", function (socket) {
    console.log("Socket is connected")
    setTimeout(() => {
        socket.send("Message sent from the server side socket...!")
    }, 3000)
    socket.on("disconnect", function () {
        console.log("Socket is disconnected")
    })
})

http.listen(PORT, () => {
    console.log("Server is up and running on " + PORT)
})
