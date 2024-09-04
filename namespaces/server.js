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

const nameSpace_1 = io.of("/namespace1")
const nameSpace_2 = io.of("/namespace2")
nameSpace_1.on("connection", (socket) => {
    console.log("nameSpace_1 is connected")
    socket.emit("nsp1", { message: `Connected to namespace-1` })

    socket.on("disconnect", () => {
        console.log("nameSpace_1 is disconnected")
    })
})

nameSpace_2.on("connection", (socket) => {
    console.log("nameSpace_2 is connected")
    socket.emit("nsp2", { message: `Connected to namespace-2` })

    socket.on("disconnect", () => {
        console.log("nameSpace_2 is disconnected")
    })
})


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})