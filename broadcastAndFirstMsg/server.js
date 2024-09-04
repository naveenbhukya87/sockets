const express = require('express');
const bp = require('body-parser')
const app = express();
const server = require('http').createServer(app);
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"))
app.use(express.static("ui"))
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})

app.get("/", async (_, res) => {
    const homePath = path.join(__dirname, "ui/index.html")
    res.sendFile(homePath)
})

let users = 0;

io.on("connection", (socket) => {
    console.log("Socket is connected")
    users++;
    socket.emit("firstMsg", { message: `Hello User-${users}` })
    socket.broadcast.emit("firstMsg", { message: `${users} are connected` })

    socket.on("disconnect", () => {
        console.log("Socket is disconnected")
        users--;
        socket.broadcast.emit("firstMsg", { message: `${users} are connected` })
    })
})


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})