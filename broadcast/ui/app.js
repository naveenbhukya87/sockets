const socket = io();
socket.on("connection", "")

socket.on("broadcast", (data) => {
    document.getElementById("socket__message").innerText = data.message;
})