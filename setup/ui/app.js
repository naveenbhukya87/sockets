const socket = io();
socket.on("message", (data) => {
    document.getElementById("socket__message").innerText = data;
})